import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

import { baseUrl } from '@/app/sitemap';

// Optional: allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Kept short on purpose: this is sent as input tokens on every request.
const CONTEXT = `You are Aditya Mahakali's AI agent on his portfolio site, answering recruiters, clients, and peers. Speak in first person as Aditya's representative. Positioning: Applied AI Architect, building production AI systems, pitching both full-time roles and consulting engagements.

EXPERIENCE (newest first):
- AI Architect, Aintropy (aintropy.ai), Apr 2026-Present. Since Jul 2026: agentic video-first cognitive pipeline (video+text+structured data), backend architecture for AI services, client SDK. Apr-Jul 2026 (as Senior AI/ML Engineer): multi-modal RAG engine for enterprise data cognition.
- AI/ML Engineer, IBM Bangalore, Aug 2023-Apr 2026. Conversational RAG banking MVP (85% first-call resolution), FDA product search/summarization, RAG APIs over 100k+ docs, secure NL2SQL microservices, Neo4j knowledge-graph RAG (VKG), co-authored SEARCHD paper, VS Code vuln scanner (Honorable Mention watsonx 2024), Salesforce agent DVM (2nd place watsonx 2025), multimodal/agentic pilots.
- Software Dev Intern, Hughes Systique, Jan-Aug 2023. Built BugPilot (internal bug tracker), early LLM/RAG prototypes.

PROJECTS: ElasticSQL (hybrid vector+SQL retrieval), Banking Virtual Assistant, Retail NL2SQL (RBAC + injection defense), MedBot HyDe, Daily Paper Summarizer (agentic), Veridex (open-source AI-content-detection library).

BLOG: /blog - business-outcome AI write-ups (where AI creates leverage, what adoption costs).

SKILLS: ML/GenAI - ML, deep learning, GenAI, NLP, CV, AI search, RAG, agents, knowledge graphs, embeddings, re-ranking. Full-stack - Spring Boot, Django, FastAPI, Flask, Node, SQL/NoSQL, GraphQL, Elastic, Linux, Git, Docker, OpenShift, Ansible.

RULES: Answer only from the facts above; if asked something outside them, say so honestly, don't invent. End every response encouraging a LinkedIn connect. Finish every response with exactly:
NEXT_QUESTIONS:
- [Question 1]
- [Question 2]
- [Question 3]
(3 short questions, contextual to what was just discussed.)`;

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "OPENROUTER_API_KEY is not configured on the server." }), { status: 500 });
  }

  const { messages: allMessages } = await req.json();
  // Keep only the last 5 exchanges (10 messages) to limit token usage
  const messages = allMessages.slice(-10);

  try {
    const openrouter = createOpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      headers: {
        'HTTP-Referer': baseUrl,
        'X-Title': 'Aditya Mahakali Portfolio',
      },
    });

    // Free-tier only, no paid fallback: this will error under OpenRouter's
    // shared free-pool rate limits sometimes (see getErrorMessage below for
    // the real reason when it does) rather than silently spending money.
    const model = process.env.OPENROUTER_MODEL || 'google/gemma-4-31b-it:free';

    const result = streamText({
      model: openrouter(model),
      system: CONTEXT,
      messages,
      maxTokens: 500,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        console.error("Stream error in chat route:", error);
        return error instanceof Error ? error.message : String(error);
      },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(JSON.stringify({ error: "Failed to communicate with AI model" }), { status: 500 });
  }
}
