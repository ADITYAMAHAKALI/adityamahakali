"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook,
  FaBrain,
  FaBriefcase,
  FaChalkboardTeacher,
  FaChess,
  FaCloud,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaExternalLinkAlt,
  FaEye,
  FaGithub,
  FaGitAlt,
  FaHome,
  FaLanguage,
  FaLaptopCode,
  FaLayerGroup,
  FaLinkedin,
  FaLinux,
  FaMedium,
  FaNetworkWired,
  FaNodeJs,
  FaProjectDiagram,
  FaRobot,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import {
  SiAnsible,
  SiDjango,
  SiElasticsearch,
  SiFastapi,
  SiFlask,
  SiGraphql,
  SiSpringboot,
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import pp from "./images/dp.jpeg";
import { Skill } from "./components/SkillCard";
import SkillsStrips from "./components/SkillsStrips";
import LinkedInFeed from "./components/LinkedInFeed";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./components/useTheme";
import KnowledgeGraph, {
  GraphLink,
  GraphNode,
} from "./components/KnowledgeGraph";

const mlStrip: Skill[] = [
  { name: "Machine Learning", icon: FaBrain },
  { name: "Deep Learning", icon: GiArtificialIntelligence },
  { name: "Generative AI", icon: FaRobot },
  { name: "NLP", icon: FaLanguage },
  { name: "Computer Vision", icon: FaEye },
  { name: "AI Search", icon: FaSearch },
  { name: "Retrieval (RAG)", icon: FaProjectDiagram },
  { name: "Agents", icon: FaProjectDiagram },
  { name: "Knowledge Graphs", icon: FaNetworkWired },
  { name: "Embeddings", icon: FaLayerGroup },
  { name: "Re-ranking", icon: FaSearch },
];

const certifications: Record<string, string[]> = {
  Coursera: ["Intro To Python", "Algorithmic ToolBox"],
  Kaggle: ["Intro To ML", "Intro to Deep Learning", "Intro to Computer Vision"],
};

const fullStackStrip: Skill[] = [
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "Django", icon: SiDjango },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Flask", icon: SiFlask },
  { name: "NodeJS", icon: FaNodeJs },
  { name: "SQL", icon: FaDatabase },
  { name: "NoSQL", icon: FaDatabase },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Elastic", icon: SiElasticsearch },
  { name: "Linux", icon: FaLinux },
  { name: "Git", icon: FaGitAlt },
  { name: "Docker", icon: FaDocker },
  { name: "OpenShift", icon: FaCloud },
  { name: "Ansible", icon: SiAnsible },
];

function buildGraphData(input: {
  projects: Array<{
    title: string;
    tag: string;
    summary: string;
    stack: string[];
  }>;
  ml: Array<{ name: string }>;
  fullstack: Array<{ name: string }>;
}) {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  const addNode = (node: GraphNode) => {
    if (!nodes.some((n) => n.id === node.id)) nodes.push(node);
  };

  const getNodeKind = (id: string): GraphNode["kind"] => {
    const node = nodes.find((n) => n.id === id);
    return node?.kind || "skill";
  };

  const getLinkCategory = (sourceId: string, targetId: string) => {
    const sourceKind = getNodeKind(sourceId);
    const targetKind = getNodeKind(targetId);

    if (sourceKind === "skill" && targetKind === "cluster")
      return "skill-cluster";
    if (sourceKind === "cluster" && targetKind === "project")
      return "cluster-project";
    if (sourceKind === "project" && targetKind === "skill")
      return "project-skill";
    if (sourceKind === "project" && targetKind === "cluster")
      return "project-cluster";

    return undefined;
  };

  addNode({
    id: "cluster:projects",
    label: "Projects",
    kind: "cluster",
    group: "Cluster",
  });
  addNode({
    id: "cluster:ml",
    label: "ML / GenAI",
    kind: "cluster",
    group: "Cluster",
  });
  addNode({
    id: "cluster:fullstack",
    label: "Full-stack",
    kind: "cluster",
    group: "Cluster",
  });

  const mlSkills = new Set(input.ml.map((s) => s.name));
  const fsSkills = new Set(input.fullstack.map((s) => s.name));

  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

  const skillId = (label: string) => `skill:${normalize(label)}`;
  const projectId = (label: string) => `project:${normalize(label)}`;

  const addSkill = (label: string) => {
    const id = skillId(label);
    const group = mlSkills.has(label)
      ? "ML"
      : fsSkills.has(label)
        ? "FullStack"
        : "Other";
    addNode({ id, label, kind: "skill", group });
    const linkObj = {
      source: id,
      target:
        group === "ML"
          ? "cluster:ml"
          : group === "FullStack"
            ? "cluster:fullstack"
            : "cluster:projects",
      strength: 0.35,
      category: getLinkCategory(
        id,
        group === "ML"
          ? "cluster:ml"
          : group === "FullStack"
            ? "cluster:fullstack"
            : "cluster:projects",
      ) as any,
    };
    links.push(linkObj);
    return id;
  };

  input.ml.forEach((s) =>
    addNode({ id: skillId(s.name), label: s.name, kind: "skill", group: "ML" }),
  );
  input.fullstack.forEach((s) =>
    addNode({
      id: skillId(s.name),
      label: s.name,
      kind: "skill",
      group: "FullStack",
    }),
  );

  nodes.forEach((n) => {
    if (n.kind !== "skill") return;
    const targetId = n.group === "ML" ? "cluster:ml" : "cluster:fullstack";
    const linkObj = {
      source: n.id,
      target: targetId,
      strength: 0.28,
      category: getLinkCategory(n.id, targetId) as any,
    };
    links.push(linkObj);
  });

  input.projects.forEach((p) => {
    const id = projectId(p.title);
    addNode({
      id,
      label: p.title,
      kind: "project",
      group: p.tag,
      meta: p.summary,
    });
    links.push({
      source: id,
      target: "cluster:projects",
      strength: 0.55,
      category: getLinkCategory(id, "cluster:projects") as any,
    });

    const stackSkills = new Set<string>(p.stack);
    let hasMLSkills = false;
    let hasFullStackSkills = false;

    Array.from(stackSkills).forEach((item) => {
      const existing = nodes.find(
        (n) => n.kind === "skill" && n.label === item,
      );
      const sid = existing ? existing.id : addSkill(item);
      links.push({
        source: id,
        target: sid,
        strength: 0.95,
        category: getLinkCategory(id, sid) as any,
      });

      // Track if this project has ML or FullStack skills
      if (mlSkills.has(item)) hasMLSkills = true;
      if (fsSkills.has(item)) hasFullStackSkills = true;
    });

    // Add direct links from clusters to projects that use their skills
    if (hasMLSkills) {
      links.push({
        source: "cluster:ml",
        target: id,
        strength: 0.75,
        category: getLinkCategory("cluster:ml", id) as any,
      });
    }
    if (hasFullStackSkills) {
      links.push({
        source: "cluster:fullstack",
        target: id,
        strength: 0.75,
        category: getLinkCategory("cluster:fullstack", id) as any,
      });
    }
  });

  return { nodes, links };
}

const experienceJourney = [
  {
    role: "AI Architect",
    company: "Aintropy (aintropy.ai)",
    companyUrl: "https://aintropy.ai",
    period: "Apr 2026 - Present",
    stages: [
      {
        phase: "Architecture",
        date: "Jul 2026 - Present",
        title: "Agentic, video-first cognitive pipeline",
        detail:
          "Architecting and implementing an agentic, video-first cognitive pipeline spanning video, text, and structured data. Designed scalable backend architecture for AI services, a client-side SDK, and developer experience.",
        stack:
          "Knowledge Engineering, Video RAG, Agentic pipelines, SDK design",
      },
      {
        phase: "Foundations",
        date: "Apr 2026 - Jul 2026",
        title: "Multi-modal RAG engine for enterprise data cognition",
        detail:
          "Worked on foundational problems in enterprise data cognition across unstructured data (video, images, text) and structured data (tables); built a multi-modal RAG engine.",
        stack: "Multi-modal RAG, Video/Image/Text, Structured data",
      },
    ],
  },
  {
    role: "AI/ML Engineer",
    company: "IBM, Bangalore",
    companyUrl: "https://www.ibm.com",
    period: "Aug 2023 - Apr 2026",
    stages: [
      {
        phase: "Hackathon",
        title: "Hackathon: DVM",
        detail:
          "Created Deal Velocity Manager, a multi-agent Salesforce workflow assistant; won 2nd place in watsonx Challenge 2025.",
        stack: "Salesforce, agentic automation",
        metric: "2nd Place Winner",
      },
      {
        phase: "Multimodal",
        title: "Multi-modal and agentic systems",
        detail:
          "Built multimodal generation workflows and agentic orchestration for internal acceleration and production pilots.",
        stack: "Multimodal LLMs, agents",
      },
      {
        phase: "Enterprise",
        title: "Large-scale RAG for networking workflows",
        detail:
          "Delivered conversational RAG APIs and multi-stage retrieval for a networking domain client.",
        stack: "RAG APIs, hybrid retrieval",
        metric: "100k+ documents",
      },
      {
        phase: "Production",
        title: "Secure NL2SQL for enterprise analytics",
        detail:
          "Built NL2SQL microservices with automated metadata dictionary + disambiguation; shipped RBAC and prompt-injection defenses for business users to talk to data.",
        stack: "FastAPI, watsonx.ai, RBAC, guardrails",
        metric: "65% -> 88% query success",
      },
      {
        phase: "Hackathon",
        title: "Shinigami Eyes (VS Code extension)",
        detail:
          "Built a VS Code extension to detect module-level and file-level vulnerabilities; received honorable mention in watsonx Challenge 2024.",
        stack: "LLMs, VS Code extension",
        metric: "Honorable Mention",
      },
      {
        phase: "Research",
        title: "Co-authored SEARCHD",
        detail:
          "Contributed to retrieval strategy research and practical search system design for enterprise AI delivery.",
        stack: "Retrieval engineering, RAG",
      },
      {
        phase: "Graphs",
        title: "Knowledge-graph RAG (VKG)",
        detail:
          "Automated ontology creation and built NL2Cypher retrieval pipelines for Neo4j-backed RAG.",
        stack: "Neo4j, NL2Cypher, knowledge graphs",
      },
      {
        phase: "Scale",
        title: "Technical QA assistant over 100k+ documents",
        detail:
          "Built RAG APIs over a 100k+ corpus with hybrid dense/sparse/BM25 retrieval, domain query modification, and tuned embeddings.",
        stack: "Elasticsearch, dense/sparse search, custom embeddings",
        metric: "56% -> 77% answer accuracy",
      },
      {
        phase: "Search",
        title: "FDA product search + assistant (Life Sciences)",
        detail:
          "Summarized FDA documents to create high-signal metadata and improved retrieval quality for a large US retailer.",
        stack: "Solr, RAG, summarization",
        metric: "Relevance +25%",
      },
      {
        phase: "Start",
        title: "Conversational RAG (Banking MVP)",
        detail:
          "Built a conversational RAG assistant with query modification + hybrid retrieval and integrated it into a React UI with deep linking.",
        stack: "watsonx.ai, Watson Assistant, React, Flask, Docker, Milvus",
        metric: "85% first-call resolution",
      },
    ],
  },
  {
    role: "Software Development Intern",
    company: "Hughes Systique Corporation, Gurugram",
    companyUrl: "https://www.hsc.com/",
    period: "Jan 2023 - Aug 2023",
    stages: [
      {
        phase: "RAG Build",
        title: "Built a RAG system prototype",
        detail:
          "Implemented retrieval + generation pipelines and evaluation loops for internal pilots.",
        stack: "OpenAI API, LangChain, Weaviate",
      },
      {
        phase: "Switch",
        title: "Moved to NLP and LLMs",
        detail:
          "Started building LLM workflows on private enterprise data and vector databases.",
        stack: "Transformers, Milvus, Chroma, Weaviate",
      },
      {
        phase: "Pilot Project",
        title: "Built BugPilot",
        detail:
          "Built a company-internal bug tracker to report, triage, and track issues across projects; adopted by multiple internal teams.",
        stack: "Spring Boot, React, Docker",
        metric: "Adopted by 3 internal teams",
      },
      {
        phase: "Learning Phase",
        title: "Full-stack software development",
        detail:
          "Hands-on progression through backend, frontend, delivery, and app security.",
        stack: "Spring Boot -> Angular -> Docker -> Security",
      },
    ],
  },
];

type ProjectCaseStudy = {
  title: string;
  tag: string;
  summary: string;
  highlights: string[];
  architecture: string[];
  modelWork: string[];
  evaluation: string[];
  deployment: string[];
  stack: string[];
};

const projects: ProjectCaseStudy[] = [
  {
    title: "IBM - ElasticSQL",
    tag: "Enterprise RAG",
    summary:
      "Hybrid retrieval that combines vectors with SQL-like querying to support networking workflows.",
    highlights: [
      "Unified dense + structured retrieval for operational queries.",
      "Designed for reliability under enterprise constraints.",
    ],
    architecture: [
      "Ingestion: document normalization, chunking, and metadata enrichment.",
      "Indexing: hybrid dense/sparse signals + structured fields for filtering.",
      "Retrieval: query parsing -> hybrid retrieval -> ranking -> context assembly.",
      "Generation: answer synthesis with citations and guardrails.",
    ],
    modelWork: [
      "Retrieval tuning: hybrid weighting, filters, and ranking features based on evaluation outcomes.",
      "Prompting: citation-first answering and refusal patterns for low-confidence contexts.",
      "Embeddings: model selection + chunk sizing tuned to networking-style documents.",
    ],
    evaluation: [
      "Offline: retrieval recall/precision on curated query sets.",
      "Online: user feedback loops and failure-mode review (hallucination, mismatch).",
    ],
    deployment: [
      "API-first backend with observability hooks (latency, retrieval hit-rate).",
      "Security: RBAC-ready integration and input sanitization patterns.",
    ],
    stack: ["Elasticsearch", "Hybrid retrieval", "RAG APIs", "Guardrails"],
  },
  {
    title: "IBM - Banking Virtual Assistant",
    tag: "Conversational AI",
    summary:
      "Conversational RAG assistant with query modification, hybrid search, and UI integration.",
    highlights: [
      "Intent-based flows with grounded answers for self-service.",
      "Deep linking from answers into product/knowledge pages.",
    ],
    architecture: [
      "Channel/UI -> assistant orchestration -> retrieval service -> LLM answer synthesis.",
      "Chunking: parent-child strategy for better grounding on long docs.",
      "Retrieval: hybrid semantic + lexical with query rewriting and filters.",
    ],
    modelWork: [
      "Conversation quality: prompt patterns for tool use, grounded answers, and consistent tone.",
      "Retrieval quality: parent-child chunking + query rewriting heuristics for intent-specific recall.",
      "Safety: prompt-injection aware prompting + constrained tool behavior.",
    ],
    evaluation: [
      "Conversation-level QA: groundedness checks and citation coverage.",
      "Task success tracking via intent completion and fallback rates.",
    ],
    deployment: [
      "Containerized services for backend + UI; environment-specific configs.",
      "Safety: prompt-injection aware prompting + restricted tools/actions.",
    ],
    stack: ["watsonx.ai", "Watson Assistant", "React", "Flask", "Docker"],
  },
  {
    title: "IBM - Product Search + Assistant (FDA Docs)",
    tag: "Search & Summarization",
    summary:
      "Search + assistant over FDA documents using LLM summarization to enrich metadata and improve retrieval.",
    highlights: [
      "Metadata summarization to improve searchability and ranking signals.",
      "Assistant layer on top of search for guided drug/product queries.",
    ],
    architecture: [
      "Ingestion: parse FDA documents -> sectioning -> metadata extraction.",
      "Summarization: generate structured product summaries as searchable metadata.",
      "Search: rank using lexical + metadata fields; assistant uses search as tool.",
    ],
    modelWork: [
      "Summarization: structured prompting + schema validation to keep metadata consistent.",
      "Search tuning: field boosts and ranking rules leveraging summary metadata.",
      "Risk control: safer phrasing + guardrails for regulated/medical content.",
    ],
    evaluation: [
      "Search relevance evaluation on representative queries (A/B on metadata).",
      "Assistant evaluation: answer grounding and incorrect-drug risk checks.",
    ],
    deployment: [
      "Search service + assistant APIs; guarded outputs for regulated content.",
      "Monitoring: drift checks on summarization schema adherence.",
    ],
    stack: ["Solr", "RAG", "Summarization", "Metadata indexing"],
  },
  {
    title: "IBM - Retail NL2SQL",
    tag: "NL2SQL",
    summary:
      "Natural language to SQL system with metadata automation, disambiguation, RBAC, and injection defenses.",
    highlights: [
      "Business users query data safely without writing SQL.",
      "Guardrails for RBAC + prompt-injection resistance.",
    ],
    architecture: [
      "Metadata dictionary: automated schema understanding + synonyms.",
      "Pipeline: NL -> intent/slots -> SQL draft -> validation -> execution -> explanation.",
      "Safety: RBAC enforcement + allowlisted tables/columns + query constraints.",
    ],
    modelWork: [
      "Schema linking: metadata dictionary + synonyms to reduce ambiguity and improve grounding.",
      "Accuracy tuning: curated few-shot examples + error-driven prompt iteration.",
      "Safety: allowlists, query validation, and injection defenses before execution.",
    ],
    evaluation: [
      "SQL accuracy: execution match + result correctness on benchmark queries.",
      "Security tests: injection attempts, privilege escalation, schema leakage.",
    ],
    deployment: [
      "Microservice API with audit logs for generated SQL and user identity.",
      "Latency tuning: caching metadata and reusing compiled prompts/templates.",
    ],
    stack: ["FastAPI", "watsonx.ai", "RBAC", "SQL validation", "Guardrails"],
  },
  {
    title: "Personal - MedBot HyDe",
    tag: "Medical RAG",
    summary:
      "HyDE-style retrieval to improve medical QA by generating hypothetical documents for better recall.",
    highlights: [
      "Improves retrieval coverage for sparse or ambiguous queries.",
      "Designed to be testable with offline evaluation sets.",
    ],
    architecture: [
      "Query -> hypothetical doc generation -> embedding -> retrieval -> rerank -> answer.",
      "Strict separation between retrieval augmentation and final answer generation.",
    ],
    modelWork: [
      "HyDE prompting: controlled hypothetical generation to boost retrieval recall without hallucinated final answers.",
      "Embedding + rerank: model selection and reranking strategy tuned for medical relevance.",
      "Safety: refusal patterns and disclaimers to avoid medical advice overreach.",
    ],
    evaluation: [
      "Compare baseline RAG vs HyDE on retrieval metrics and answer quality.",
      "Failure analysis: misleading hypotheticals and unsafe medical outputs.",
    ],
    deployment: [
      "Batch evaluation harness + lightweight API wrapper for demos.",
      "Safety: disclaimers and refusal behavior for medical advice.",
    ],
    stack: ["RAG", "HyDE", "Embeddings", "Reranking"],
  },
  {
    title: "Personal - Daily Paper Summarizer",
    tag: "Agents",
    summary:
      "Agentic pipeline to ingest new papers and produce daily structured summaries and takeaways.",
    highlights: [
      "End-to-end automation: fetch -> filter -> summarize -> publish.",
      "Separation of agents: retrieval, summarization, quality checks.",
    ],
    architecture: [
      "Source ingestion -> relevance filter -> multi-agent summarization -> final editor pass.",
      "Tooling: per-agent prompts and deterministic output schemas.",
    ],
    modelWork: [
      "Quality: agent role prompts + schema enforcement to reduce drift and improve consistency.",
      "Cost/latency: step budgeting and retry strategy for flaky sources/tools.",
      "Faithfulness: citation-first summaries and checks for unsupported claims.",
    ],
    evaluation: [
      "Quality rubric: coverage, faithfulness, and novelty of takeaways.",
      "Latency/cost tracking per agent step to optimize throughput.",
    ],
    deployment: [
      "Scheduled runs + artifact storage for summaries and references.",
      "Retry strategy for flaky sources and tool failures.",
    ],
    stack: ["Agents", "LLMs", "Pipelines", "Scheduling"],
  },
];

const graphData = buildGraphData({
  projects,
  ml: mlStrip,
  fullstack: fullStackStrip,
});

const certs = [
  [
    "watsonx.governance Sales Foundation",
    "https://www.credly.com/badges/0227055b-7eb1-494c-9ab1-104adeca49c0",
  ],
  [
    "2025 IBMer watsonx Challenge",
    "https://www.credly.com/badges/039f0f8f-006a-4f8a-aeab-f303626bbcad",
  ],
  [
    "watsonx Orchestrate Technical Sales Intermediate",
    "https://www.credly.com/badges/d7f58977-4eec-4405-a5e9-87876d4e5738",
  ],
  [
    "Terraform Sales Foundation",
    "https://www.credly.com/badges/eae0a128-942f-4409-bf94-41f3ef379a6e",
  ],
  [
    "watsonx Orchestrate Practitioner Advanced",
    "https://www.credly.com/badges/c7a35feb-ae1c-4fca-b491-4cd6da0dec98",
  ],
  [
    "Enterprise Design Thinking - Team Essentials for AI",
    "https://www.credly.com/badges/ef3cf5c7-7cf8-4148-b5ca-b0314c46c69c",
  ],
  [
    "Enterprise Design Thinking Practitioner",
    "https://www.credly.com/badges/4e209908-e6bd-4043-ad0a-3e667a2989d6",
  ],
  [
    "Vault Sales Foundation",
    "https://www.credly.com/badges/689d904f-3b3f-47ca-9d01-eca0115b6444",
  ],
  [
    "InstructLab: Democratizing AI Models at Scale",
    "https://www.credly.com/badges/41d2bf4d-f5dc-47d9-8795-e920563b9093",
  ],
  [
    "watsonx Orchestrate Sales Foundation",
    "https://www.credly.com/badges/ad6bf3e0-aa37-43bb-97f4-a97e986e6c2f",
  ],
  [
    "Generative AI for Code with watsonx Code Assistant Sales Foundation",
    "https://www.credly.com/badges/a13da432-1dd2-4278-aff8-c561dd74bc74",
  ],
  [
    "Application Modernization with watsonx Code Assistant for Z Sales Foundation",
    "https://www.credly.com/badges/16973a39-1948-475e-aede-cf29fb7a75f0",
  ],
  [
    "watsonx.ai Practitioner Advanced",
    "https://www.credly.com/badges/aeb3657a-eaec-49c0-af3c-8f13995b0712",
  ],
  [
    "watsonx.ai Technical Sales Intermediate (Expired 27 Jun 2025)",
    "https://www.credly.com/badges/ff3e20b3-0263-4eb5-adbb-32274ceff28e",
  ],
  [
    "IBM watsonx Essentials",
    "https://www.credly.com/badges/0be51f4b-85e0-4ab1-96a2-0b0f0df3c715",
  ],
  [
    "Generative AI for Code with watsonx Code Assistant Technical Sales Intermediate",
    "https://www.credly.com/badges/b7a56594-910e-4225-8b56-8717f67dd05a",
  ],
] as const;

export default function Page() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [expandedCompanies, setExpandedCompanies] = useState<
    Record<string, boolean>
  >({});
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);
  const { mode, setMode } = useTheme();

  const allExpanded =
    experienceJourney.length > 0 &&
    experienceJourney.every((journey) => expandedCompanies[journey.company]);

  const toggleAll = () => {
    setExpandedCompanies((prev) => {
      const nextValue = !allExpanded;
      const next: Record<string, boolean> = { ...prev };
      experienceJourney.forEach((journey) => {
        next[journey.company] = nextValue;
      });
      return next;
    });
  };

  return (
    <div className="portfolio-shell">
      <header className="hero-wrap">
        <div className="hero-panel">
          <div className="hero-top-actions" aria-label="Header actions">
            <div className="hero-theme-toggle">
              <ThemeToggle value={mode} onChange={setMode} />
            </div>
          </div>
          <div className="hero-grid">
            <div className="hero-identity">
              <div className="hero-avatar-wrapper">
                <button
                  type="button"
                  className="hero-avatar-button"
                  onClick={() => setShowKnowledgeGraph(!showKnowledgeGraph)}
                  aria-label="Toggle knowledge graph view"
                  title="Explore my knowledge graph"
                >
                  <Image
                    src={pp}
                    alt="Aditya Mahakali"
                    width={132}
                    height={132}
                    className="hero-avatar"
                    priority
                  />
                </button>
              </div>
              <h1 className="hero-title">Aditya Mahakali</h1>
            </div>
            <div className="hero-statement">
              <p className="hero-tagline">
                <strong>Applied AI Architect</strong> building secure,
                retrieval-first AI systems for the enterprise.
              </p>
              <p className="hero-focus-terms">
                Generative AI <span aria-hidden="true">·</span> Machine Learning{" "}
                <span aria-hidden="true">·</span> AI Systems{" "}
                <span aria-hidden="true">·</span> Enterprise Delivery
              </p>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence mode="wait" initial={false}>
        {!showKnowledgeGraph ? (
          <motion.div
            key="normal-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <section className="skills-wrap" aria-labelledby="skills-heading">
              <h2 id="skills-heading" className="section-title">
                My Skills & Expertise
              </h2>
              <p className="section-subtitle">
                Machine learning and full-stack software development.
              </p>
              <SkillsStrips ml={mlStrip} fullstack={fullStackStrip} />
            </section>

            <main className="content-wrap">
              <section className="section-stack" aria-label="Profile sections">
                <section
                  className="experience-section"
                  aria-labelledby="experience-heading"
                >
                  <div className="section-header-row">
                    <h2 id="experience-heading" className="section-heading">
                      Experience
                    </h2>
                    <div className="timeline-header-actions">
                      <button
                        type="button"
                        className="timeline-toggle"
                        onClick={toggleAll}
                        aria-expanded={allExpanded}
                      >
                        {allExpanded ? "Collapse all" : "Expand all"}
                      </button>
                    </div>
                  </div>
                  <div className="experience-timeline">
                    {experienceJourney.map((journey) => {
                      const expanded = Boolean(
                        expandedCompanies[journey.company],
                      );
                      const previewCount = journey.company.includes("IBM")
                        ? 4
                        : 2;
                      const visibleStages = expanded
                        ? journey.stages
                        : journey.stages.slice(0, previewCount);
                      const hiddenCount = Math.max(
                        0,
                        journey.stages.length - visibleStages.length,
                      );

                      return (
                        <article
                          key={journey.company}
                          className="timeline-entry"
                        >
                          <div className="timeline-rail">
                            <span className="timeline-icon">
                              <FaBriefcase aria-hidden="true" />
                            </span>
                            <div>
                              <h3 className="timeline-role">{journey.role}</h3>
                              <p className="timeline-company">
                                {"companyUrl" in journey && journey.companyUrl ? (
                                  <a
                                    href={journey.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {journey.company}
                                  </a>
                                ) : (
                                  journey.company
                                )}
                              </p>
                              <p className="timeline-period">
                                {journey.period}
                              </p>
                            </div>
                          </div>
                          <div className="timeline-body">
                            <ol
                              className="timeline-steps"
                              id={`timeline-${journey.company}`}
                            >
                              {visibleStages.map((stage) => (
                                <li key={stage.title} className="timeline-step">
                                  <div className="timeline-step-head">
                                    <span className="timeline-pill timeline-pill--phase">
                                      {stage.phase}
                                    </span>
                                    {"date" in stage && stage.date ? (
                                      <span className="timeline-step-date">
                                        {stage.date}
                                      </span>
                                    ) : null}
                                  </div>
                                  <h4 className="timeline-title">
                                    {stage.title}
                                  </h4>
                                  <p className="timeline-detail">
                                    {stage.detail}
                                  </p>
                                  <div className="timeline-meta">
                                    <span className="timeline-pill">
                                      {stage.stack}
                                    </span>
                                    {"metric" in stage && stage.metric ? (
                                      <span className="timeline-pill metric">
                                        {stage.metric}
                                      </span>
                                    ) : null}
                                  </div>
                                </li>
                              ))}
                            </ol>
                            <div className="timeline-body-actions">
                              {hiddenCount > 0 && !expanded ? (
                                <button
                                  type="button"
                                  className="timeline-more"
                                  onClick={() =>
                                    setExpandedCompanies((prev) => ({
                                      ...prev,
                                      [journey.company]: true,
                                    }))
                                  }
                                  aria-controls={`timeline-${journey.company}`}
                                  aria-expanded={expanded}
                                >
                                  +{hiddenCount} more milestones
                                </button>
                              ) : null}
                              <button
                                type="button"
                                className="timeline-toggle"
                                onClick={() =>
                                  setExpandedCompanies((prev) => ({
                                    ...prev,
                                    [journey.company]: !expanded,
                                  }))
                                }
                                aria-expanded={expanded}
                                aria-controls={`timeline-${journey.company}`}
                              >
                                {expanded ? "Show less" : "Show full timeline"}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>

                <section
                  className="opensource-band"
                  aria-labelledby="opensource-heading"
                >
                  <div className="opensource-grid">
                    <div className="opensource-left">
                      <h2
                        id="opensource-heading"
                        className="opensource-title font-veridex-script"
                      >
                        Veridex
                      </h2>
                      <p className="opensource-tagline">
                        Modular, probabilistic, and research-grounded AI content
                        detection.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Python",
                          "AI Detection",
                          "Probabilistic",
                          "Multi-modal",
                        ].map((tag) => (
                          <span
                            key={`opensource-${tag}`}
                            className="chip-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="opensource-actions">
                        <a
                          href="https://github.com/ADITYAMAHAKALI/veridex"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                        >
                          <FaGithub aria-hidden="true" /> GitHub
                        </a>
                        <a
                          href="https://adityamahakali.github.io/veridex/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                        >
                          <FaBook aria-hidden="true" /> Docs
                        </a>
                      </div>
                    </div>
                    <div className="opensource-right">
                      <ul
                        className="opensource-features"
                        aria-label="Key features"
                      >
                        <li>Detects AI-generated text, image, and audio.</li>
                        <li>
                          Uses confidence scores instead of binary output.
                        </li>
                        <li>Designed for research and production workflows.</li>
                      </ul>
                      <p className="opensource-desc">
                        A production-ready library for detecting AI-generated
                        content across text, image, and audio with confidence
                        estimates and interpretable signals.
                      </p>
                    </div>
                  </div>
                </section>

                <section
                  className="project-showcase"
                  aria-labelledby="projects-heading"
                >
                  <h2 id="projects-heading" className="section-heading">
                    Featured Projects
                  </h2>
                  <div className="project-list">
                    {projects.map((project) => (
                      <details key={project.title} className="case-row">
                        <summary className="case-summary">
                          <div>
                            <div className="case-heading-row">
                              <h3 className="case-title">{project.title}</h3>
                              <span className="case-tag">{project.tag}</span>
                            </div>
                            <p className="case-lede">{project.summary}</p>
                            <div
                              className="case-pill-row"
                              aria-label="Tech stack"
                            >
                              {project.stack.slice(0, 4).map((item) => (
                                <span
                                  key={`${project.title}-${item}`}
                                  className="case-pill"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="case-cta">View details</span>
                        </summary>
                        <div className="case-body">
                          <div className="case-section">
                            <h4>Highlights</h4>
                            <ul>
                              {project.highlights.map((item) => (
                                <li key={`${project.title}-h-${item}`}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="case-section">
                            <h4>Architecture</h4>
                            <ul>
                              {project.architecture.map((item) => (
                                <li key={`${project.title}-a-${item}`}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="case-section">
                            <h4>Model + quality work</h4>
                            <ul>
                              {project.modelWork.map((item) => (
                                <li key={`${project.title}-t-${item}`}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="case-section">
                            <h4>Evaluation</h4>
                            <ul>
                              {project.evaluation.map((item) => (
                                <li key={`${project.title}-e-${item}`}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="case-section">
                            <h4>Deployment</h4>
                            <ul>
                              {project.deployment.map((item) => (
                                <li key={`${project.title}-d-${item}`}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="case-section">
                            <h4>Full stack</h4>
                            <div className="case-pill-row">
                              {project.stack.map((item) => (
                                <span
                                  key={`${project.title}-s-${item}`}
                                  className="case-pill"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>

                <section
                  className="cert-section"
                  aria-labelledby="certs-heading"
                >
                  <h2 id="certs-heading" className="section-heading">
                    Certifications &amp; Badges
                  </h2>

                  <details className="cert-accordion">
                    <summary className="cert-accordion-summary">
                      <span>Show Certifications & Badges</span>
                      <FaChevronDown
                        className="cert-accordion-icon"
                        aria-hidden="true"
                      />
                    </summary>

                    <div className="cert-accordion-body">
                      <div className="cert-list">
                        <h3 className="cert-list-title">Certifications</h3>
                        {Object.entries(certifications).map(
                          ([provider, items]) => (
                            <div key={provider} className="cert-provider">
                              <h4 className="cert-provider-name">{provider}</h4>
                              <ul>
                                {items.map((it) => (
                                  <li key={it}>{it}</li>
                                ))}
                              </ul>
                            </div>
                          ),
                        )}
                      </div>

                      <div>
                        <h3 className="cert-grid-title">Badges</h3>
                        <div className="cert-ledger">
                          {certs.map(([name, url], index) => (
                            <a
                              key={name}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cert-row"
                            >
                              <span className="cert-index">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="cert-name">{name}</span>
                              <span className="cert-link">
                                View Badge{" "}
                                <FaExternalLinkAlt aria-hidden="true" />
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>
                </section>

                <section
                  className="profile-grid"
                  aria-label="Education and interests"
                >
                  <section
                    className="profile-block"
                    aria-labelledby="education-heading"
                  >
                    <div className="profile-head">
                      <h2 id="education-heading" className="profile-title">
                        Education
                      </h2>
                      <p className="profile-subtitle">
                        Academic grounding in computer science, mathematics, and
                        applied ML.
                      </p>
                    </div>
                    <div className="profile-tags">
                      {["JNU", "MCA", "GATE CS", "UGC NET"].map((tag) => (
                        <span key={`edu-${tag}`} className="chip-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="profile-body">
                      <div className="edu-row">
                        <p className="edu-degree">
                          MCA, Computer Science and Applications
                        </p>
                        <p className="edu-meta">
                          Jawaharlal Nehru University (2021–2023) · 7.65/9 CGPA
                        </p>
                      </div>
                      <div className="edu-row">
                        <p className="edu-degree">BSc, Computer Science</p>
                        <p className="edu-meta">
                          Central University of Rajasthan (2018–2021) · 7.74/10
                          CGPA
                        </p>
                      </div>
                      <p className="edu-meta">
                        Qualified: GATE CS, UGC NET (CS)
                      </p>
                    </div>
                  </section>

                  <section
                    className="profile-block"
                    aria-labelledby="interests-heading"
                  >
                    <div className="profile-head">
                      <h2 id="interests-heading" className="profile-title">
                        Interests
                      </h2>
                      <p className="profile-subtitle">
                        Outside work: strategy, teaching, and building systems
                        end-to-end.
                      </p>
                    </div>
                    <div className="interest-list" aria-label="Interests">
                      <a
                        className="interest-row"
                        href="https://www.chess.com/member/adityamahakali"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaChess aria-hidden="true" className="interest-icon" />
                        <div>
                          <p className="interest-label">Chess</p>
                          <p className="interest-desc">
                            Strategy, calculation, and calm decision-making.
                          </p>
                        </div>
                      </a>
                      <div className="interest-row">
                        <FaChalkboardTeacher
                          aria-hidden="true"
                          className="interest-icon"
                        />
                        <div>
                          <p className="interest-label">Teaching</p>
                          <p className="interest-desc">
                            Explaining complex systems with clarity and
                            structure.
                          </p>
                        </div>
                      </div>
                      <div className="interest-row">
                        <FaLaptopCode
                          aria-hidden="true"
                          className="interest-icon"
                        />
                        <div>
                          <p className="interest-label">Coding</p>
                          <p className="interest-desc">
                            Shipping end-to-end builds: API, retrieval, and UI.
                          </p>
                        </div>
                      </div>
                    </div>
            
                  </section>
                </section>

                <section
                  className="linkedin-section"
                  aria-labelledby="linkedin-heading"
                >
                  <h2 id="linkedin-heading" className="section-heading">
                    Recent on LinkedIn
                  </h2>
                  <div className="linkedin-embed">
                    <LinkedInFeed />
                  </div>
                </section>

                <section
                  className="contact-section"
                  aria-labelledby="contact-heading"
                >
                  <h2 id="contact-heading" className="section-heading">
                    Contact
                  </h2>
                  <p className="contact-intro">
                    Open to collaborations and AI engineering roles.
                  </p>
                  <div className="contact-rows">
                    <a
                      className="contact-row"
                      href="https://www.linkedin.com/in/aditya-mahakali-b81758168/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin aria-hidden="true" />
                      <span className="contact-row-label">LinkedIn</span>
                      <span className="contact-row-value">
                        aditya-mahakali-b81758168
                      </span>
                    </a>
                    <a
                      className="contact-row"
                      href="https://github.com/ADITYAMAHAKALI/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub aria-hidden="true" />
                      <span className="contact-row-label">GitHub</span>
                      <span className="contact-row-value">@ADITYAMAHAKALI</span>
                    </a>
                    <div
                      className="contact-row"
                      role="note"
                      aria-label="Location"
                    >
                      <FaHome aria-hidden="true" />
                      <span className="contact-row-label">Location</span>
                      <span className="contact-row-value">
                        Bangalore, India
                      </span>
                    </div>
                  </div>
                  <a
                    className="contact-email"
                    href="mailto:adityamahakali@gmail.com"
                  >
                    <FaEnvelope aria-hidden="true" /> adityamahakali@gmail.com
                  </a>
                </section>
              </section>
            </main>

            <footer className="portfolio-footer">
              <p>
                © {new Date().getFullYear()} Aditya Mahakali. All rights
                reserved.
              </p>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="knowledge-graph-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full flex flex-col items-center justify-center"
          >
            <motion.div
              className="w-full h-screen flex items-center justify-center p-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-6xl">
                <div className="mb-4">
                  <button
                    onClick={() => setShowKnowledgeGraph(false)}
                    className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
                  >
                    ← Back to Profile
                  </button>
                </div>
                <KnowledgeGraph
                  nodes={graphData.nodes}
                  links={graphData.links}
                  height={600}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
