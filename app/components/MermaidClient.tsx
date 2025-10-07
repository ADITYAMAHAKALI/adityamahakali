// components/MermaidClient.tsx
'use client'; // This makes it a client component

import dynamic from 'next/dynamic';

// Dynamically import react-mermaid2 for client-side rendering only
const Mermaid = dynamic(() => import('react-mermaid2'), { ssr: false });

const MermaidClient = ({ chart }) => {
  return <Mermaid chart={chart} />;
};

export default MermaidClient;
