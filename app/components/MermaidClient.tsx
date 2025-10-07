// components/MermaidClient.tsx
'use client'; // This makes it a client component

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidClient = ({ chart }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'forest' });
    if (chart && containerRef.current) {
      mermaid.render('mermaid-graph', chart, containerRef.current);
    }
  }, [chart]);

  return <div id="mermaid-graph" ref={containerRef} />;
};

export default MermaidClient;