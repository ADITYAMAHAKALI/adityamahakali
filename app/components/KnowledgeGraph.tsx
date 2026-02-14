"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

export type GraphNodeKind = "project" | "skill" | "cluster";

export type GraphNode = {
  id: string;
  label: string;
  kind: GraphNodeKind;
  group?: string; // e.g. "ML", "FullStack"
  url?: string;
  meta?: string;
};

export type GraphLink = {
  source: string;
  target: string;
  strength?: number;
  category?:
    | "skill-cluster"
    | "project-cluster"
    | "project-skill"
    | "cluster-project";
};

export type KnowledgeGraphProps = {
  nodes: GraphNode[];
  links: GraphLink[];
  height?: number;
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export default function KnowledgeGraph({
  nodes,
  links,
  height = 520,
}: KnowledgeGraphProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);

  const [tooltip, setTooltip] = useState<{
    open: boolean;
    x: number;
    y: number;
    pinned?: boolean;
    node?: GraphNode;
  }>({ open: false, x: 0, y: 0 });

  const [searchQuery, setSearchQuery] = useState("");

  const focusedIdRef = useRef<string | null>(null);
  const [coarsePointer, setCoarsePointer] = useState(false);

  const graphData = useMemo(() => {
    const nodeById = new Map(nodes.map((n) => [n.id, { ...n }]));
    const dedupedLinks = links
      .filter((l) => nodeById.has(l.source) && nodeById.has(l.target))
      .map((l) => ({ ...l }));
    return { nodes: Array.from(nodeById.values()), links: dedupedLinks };
  }, [nodes, links]);

  // Filter based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return graphData;

    const query = searchQuery.toLowerCase();
    const matchedNodes = graphData.nodes.filter(
      (n) =>
        n.label.toLowerCase().includes(query) ||
        n.group?.toLowerCase().includes(query) ||
        n.id.toLowerCase().includes(query),
    );
    const matchedNodeIds = new Set(matchedNodes.map((n) => n.id));

    // Include connected nodes (one hop away)
    const expandedNodeIds = new Set(matchedNodeIds);
    graphData.links.forEach((l) => {
      const s = typeof l.source === "string" ? l.source : l.source?.id;
      const t = typeof l.target === "string" ? l.target : l.target?.id;
      if (matchedNodeIds.has(s)) expandedNodeIds.add(t);
      if (matchedNodeIds.has(t)) expandedNodeIds.add(s);
    });

    return {
      nodes: graphData.nodes.filter((n) => expandedNodeIds.has(n.id)),
      links: graphData.links.filter((l) => {
        const s = typeof l.source === "string" ? l.source : l.source?.id;
        const t = typeof l.target === "string" ? l.target : l.target?.id;
        return expandedNodeIds.has(s) && expandedNodeIds.has(t);
      }),
    };
  }, [graphData, searchQuery]);

  useEffect(() => {
    console.log("nodes", nodes);
    console.log("links", links);
    const mq =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(pointer: coarse)")
        : null;
    if (!mq) return;
    const apply = () => setCoarsePointer(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svgEl = svgRef.current;
    const gEl = gRef.current;
    if (!wrap || !svgEl || !gEl) return;

    const isCoarsePointer = coarsePointer;

    let width = wrap.getBoundingClientRect().width;
    // Fallback if width is 0 (not laid out yet)
    if (width === 0) {
      width =
        typeof window !== "undefined"
          ? Math.max(window.innerWidth * 0.9, 400)
          : 600;
    }

    const svg = d3.select(svgEl);
    const g = d3.select(gEl);

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const nodeCopy: Array<GraphNode & d3.SimulationNodeDatum> =
      filteredData.nodes.map((n) => ({
        ...n,
        x: width / 2 + (Math.random() - 0.5) * 40,
        y: height / 2 + (Math.random() - 0.5) * 40,
      }));
    const linkCopy: Array<
      GraphLink & d3.SimulationLinkDatum<GraphNode & d3.SimulationNodeDatum>
    > = filteredData.links.map((l) => ({ ...l }));

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.55, 2.4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });
    svg.call(zoom as any);

    svg.on("dblclick.zoom", null);

    const linkSel = g
      .selectAll<SVGLineElement, any>("line.kg-link")
      .data(linkCopy, (d: any) => `${d.source}->${d.target}`)
      .join("line")
      .attr("class", "kg-link")
      .attr("data-category", (d: any) => {
        const sourceNode = nodeCopy.find(
          (n) =>
            n.id === (typeof d.source === "string" ? d.source : d.source?.id),
        );
        const targetNode = nodeCopy.find(
          (n) =>
            n.id === (typeof d.target === "string" ? d.target : d.target?.id),
        );

        if (!sourceNode || !targetNode) return "unknown";

        const sourceKind = sourceNode.kind;
        const targetKind = targetNode.kind;

        if (sourceKind === "skill" && targetKind === "cluster")
          return "skill-cluster";
        if (sourceKind === "cluster" && targetKind === "project")
          return "cluster-project";
        if (sourceKind === "project" && targetKind === "skill")
          return "project-skill";
        if (sourceKind === "project" && targetKind === "cluster")
          return "project-cluster";

        return "other";
      })
      .attr("stroke-width", (d: any) => {
        const strength = d.strength ?? 0.9;
        return 0.8 + strength * 2;
      });

    const nodeSel = g
      .selectAll<SVGGElement, any>("g.kg-node")
      .data(nodeCopy, (d: any) => d.id)
      .join((enter) => {
        const n = enter.append("g").attr("class", "kg-node");
        n.append("circle").attr("class", "kg-node-dot");
        n.append("text")
          .attr("class", "kg-node-label")
          .attr("text-anchor", "middle");
        return n;
      });

    nodeSel
      .attr("data-kind", (d: any) => d.kind)
      .attr("data-group", (d: any) => d.group ?? "");

    nodeSel
      .select<SVGCircleElement>("circle.kg-node-dot")
      .attr("r", (d: any) => {
        const base = d.kind === "project" ? 18 : d.kind === "cluster" ? 24 : 12;
        return isCoarsePointer ? base + 4 : base;
      });

    nodeSel
      .select<SVGTextElement>("text.kg-node-label")
      .text((d: any) => d.label)
      .attr("dy", (d: any) =>
        d.kind === "project" ? 34 : d.kind === "cluster" ? 40 : 26,
      );

    const neighbor = new Map<string, Set<string>>();
    nodeCopy.forEach((n) => neighbor.set(n.id, new Set([n.id])));
    linkCopy.forEach((l: any) => {
      const s = typeof l.source === "string" ? l.source : l.source.id;
      const t = typeof l.target === "string" ? l.target : l.target.id;
      neighbor.get(s)?.add(t);
      neighbor.get(t)?.add(s);
    });

    const setFocus = (focusId: string | null) => {
      focusedIdRef.current = focusId;
      nodeSel.classed("dim", (d: any) =>
        focusId ? !neighbor.get(focusId)?.has(d.id) : false,
      );
      linkSel.classed("dim", (d: any) => {
        if (!focusId) return false;
        const s = typeof d.source === "string" ? d.source : d.source.id;
        const t = typeof d.target === "string" ? d.target : d.target.id;
        return s !== focusId && t !== focusId;
      });
    };

    const drag = d3
      .drag<SVGGElement, any>()
      .on("start", (event, d: any) => {
        if (!event.active) sim.alphaTarget(0.22).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d: any) => {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeSel.call(drag as any);

    if (!isCoarsePointer) {
      nodeSel
        .on("mouseenter", (event, d: any) => {
          setFocus(d.id);
          const rect = wrap.getBoundingClientRect();
          const x = clamp(event.clientX - rect.left + 12, 10, rect.width - 260);
          const y = clamp(event.clientY - rect.top + 12, 10, height - 120);
          setTooltip({ open: true, x, y, node: d, pinned: false });
        })
        .on("mousemove", (event) => {
          const rect = wrap.getBoundingClientRect();
          const x = clamp(event.clientX - rect.left + 12, 10, rect.width - 260);
          const y = clamp(event.clientY - rect.top + 12, 10, height - 120);
          setTooltip((prev) =>
            prev.open && !prev.pinned ? { ...prev, x, y } : prev,
          );
        })
        .on("mouseleave", () => {
          setFocus(null);
          setTooltip({ open: false, x: 0, y: 0 });
        });
    }

    nodeSel.on("click", (_event, d: any) => {
      if (!isCoarsePointer) {
        if (d.url) window.open(d.url, "_blank", "noopener,noreferrer");
        return;
      }

      // Touch UX: first tap focuses + shows a pinned card; second tap opens the link (if any).
      const isSame = focusedIdRef.current === d.id;
      if (isSame && d.url) {
        window.open(d.url, "_blank", "noopener,noreferrer");
        return;
      }

      setFocus(d.id);
      setTooltip({ open: true, x: 0, y: 0, node: d, pinned: true });
    });

    svg.on("click.kg-clear", (event: any) => {
      // Clear only when the background (not a node) is tapped/clicked.
      const target = event?.target as Element | null;
      if (
        target &&
        (target.closest?.("g.kg-node") ||
          target.classList?.contains("kg-node-dot"))
      )
        return;
      setFocus(null);
      setTooltip({ open: false, x: 0, y: 0 });
    });

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sim = d3
      .forceSimulation(nodeCopy)
      .force(
        "link",
        d3
          .forceLink(linkCopy as any)
          .id((d: any) => d.id)
          .distance((l: any) => (l.strength ? 90 / l.strength : 90))
          .strength((l: any) => clamp(l.strength ?? 0.9, 0.2, 1.2)),
      )
      .force("charge", d3.forceManyBody().strength(-380))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d: any) =>
            d.kind === "cluster" ? 38 : d.kind === "project" ? 28 : 20,
          ),
      )
      .force("x", d3.forceX(width / 2).strength(0.035))
      .force("y", d3.forceY(height / 2).strength(0.045));

    sim.on("tick", () => {
      linkSel
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeSel.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    if (prefersReducedMotion) {
      // Settle quickly and stop to avoid continuous motion.
      sim.alpha(1);
      sim.tick(140);
      sim.stop();
    }

    const ro = new ResizeObserver(() => {
      const nextWidth = wrap.getBoundingClientRect().width;
      svg.attr("viewBox", `0 0 ${nextWidth} ${height}`);
      sim.force("center", d3.forceCenter(nextWidth / 2, height / 2));
      sim.alpha(0.15).restart();
    });
    ro.observe(wrap);

    return () => {
      ro.disconnect();
      sim.stop();
      svg.on(".zoom", null);
      svg.on("click.kg-clear", null);
      nodeSel
        .on("mouseenter", null)
        .on("mousemove", null)
        .on("mouseleave", null)
        .on("click", null);
    };
  }, [filteredData, height]);

  return (
    <div ref={wrapRef} className="kg-wrap">
      {filteredData.nodes.length === 0 ? (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            minHeight: "560px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>No matches found for "{searchQuery}". Try a different search.</p>
        </div>
      ) : (
        <svg
          ref={svgRef}
          className="kg-svg"
          role="img"
          aria-label="Interactive knowledge graph"
          style={{ width: "100%", height: `${height}px` }}
        >
          <g ref={gRef} />
        </svg>
      )}
      {tooltip.open && tooltip.node ? (
        <div
          className={`kg-tooltip${tooltip.pinned ? " pinned" : ""}`}
          style={
            tooltip.pinned ? undefined : { left: tooltip.x, top: tooltip.y }
          }
        >
          <p className="kg-tip-title">{tooltip.node.label}</p>
          {tooltip.node.meta ? (
            <p className="kg-tip-meta">{tooltip.node.meta}</p>
          ) : null}
          <p className="kg-tip-kind">
            {tooltip.node.kind}
            {tooltip.node.group ? ` · ${tooltip.node.group}` : ""}
            {tooltip.node.url
              ? tooltip.pinned
                ? " · tap again to open"
                : " · click to open"
              : ""}
          </p>
        </div>
      ) : null}
      <div className="kg-legend" aria-label="Legend and controls">
        <input
          type="search"
          placeholder="Search nodes..."
          className="kg-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search knowledge graph"
        />
        <span className="kg-legend-item" data-kind="project">
          Projects
        </span>
        <span className="kg-legend-item" data-kind="skill">
          Skills
        </span>
        <span className="kg-legend-item" data-kind="cluster">
          Clusters
        </span>
        {coarsePointer ? (
          <button
            type="button"
            className="kg-legend-clear"
            onClick={() => {
              focusedIdRef.current = null;
              setTooltip({ open: false, x: 0, y: 0 });
            }}
          >
            Clear
          </button>
        ) : null}
        {searchQuery && (
          <button
            type="button"
            className="kg-legend-clear"
            onClick={() => setSearchQuery("")}
          >
            Clear search
          </button>
        )}
        <span className="kg-legend-hint">
          Drag · Zoom · Tap/hover to focus · Type to search
        </span>
      </div>
    </div>
  );
}
