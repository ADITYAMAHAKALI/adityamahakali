import {
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaChess,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Image from "next/image";
import pp from "./images/pp.jpeg";

export default function Page() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white w-full">
      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-r from-indigo-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <Image
                src={pp}
                alt="Aditya Mahakali"
                width={220}
                height={220}
                className="rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Aditya Mahakali</h1>
              <h2 className="text-2xl text-blue-200 font-semibold mb-3">
                AI/ML Engineer @ IBM
              </h2>
              <p className="text-lg text-blue-50 mb-4 max-w-2xl">
                Solving Problems with AI | Full-stack AI Engineer | Building
                impactful solutions by harnessing the power of Machine Learning
                and Generative AI
              </p>
              <div className="flex space-x-6 justify-center md:justify-start mb-4">
                <a
                  href="https://github.com/ADITYAMAHAKALI/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200"
                >
                  <FaGithub size={28} />
                </a>
                <a
                  href="https://www.linkedin.com/in/aditya-mahakali-b81758168/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200"
                >
                  <FaLinkedin size={28} />
                </a>
                <a
                  href="https://medium.com/@adityamahakali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200"
                >
                  <FaMedium size={28} />
                </a>
                <a
                  href="https://leetcode.com/adityamahakali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200"
                >
                  <SiLeetcode size={28} />
                </a>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <a
                  href="mailto:adityamahakali@gmail.com"
                  className="bg-white text-blue-800 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium"
                >
                  Contact Me
                </a>
                <a
                  href="https://rxresu.me/adityamahakali/aditya-mahakali"
                  className="bg-transparent hover:bg-blue-700 border border-white text-white py-2 px-4 rounded-lg font-medium"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">
            About Me
          </h2>
          <div className="text-lg text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              I'm a full-stack AI Engineer, building impactful solutions by
              harnessing the power of Machine Learning and Generative AI to
              deliver real value to users and clients.
            </p>
            <p>
              As an innovative and analytical problem-solver with a keen
              interest in artificial intelligence and machine learning, I'm
              well-versed in Python programming and machine learning. I'm
              committed to leveraging AI technologies to drive impactful
              solutions and optimize processes.
            </p>
            <p>
              My expertise spans the full AI engineering stack—from architecting
              robust backend systems and developing secure APIs to building
              intuitive and user-friendly frontends.
            </p>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">
            Experience
          </h2>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h3 className="text-xl font-semibold">AI Engineer</h3>
              <p className="text-gray-600 dark:text-gray-400">
                August 2023 - Present
              </p>
            </div>
            <p className="text-lg text-blue-500 dark:text-blue-400 mb-2">
              IBM, Bangalore
            </p>
            <div className="text-gray-700 dark:text-gray-300 space-y-2">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Piloted full-stack AI solutions using Watsonx for 12+ clients
                  across healthcare, banking, and telecommunications, resulting
                  in 95% client satisfaction based on post-MVP feedback surveys.
                </li>
                <li>
                  Implemented expertise spanning the full AI engineering
                  stack—from architecting robust backend systems and developing
                  secure APIs to building intuitive and user-friendly frontends.
                </li>
                <li>
                  Worked on many internal productivity tools for developer as
                  well as managerial roles like OnePagerPro, Vulnerability
                  Scanner, etc.
                </li>
                <li>
                  Participated in research work over RAG Techniques, Knowledge
                  Graphs, Multi Agentic Collaboration.
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h3 className="text-xl font-semibold">
                Software Development Intern
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Jan 2023 - August 2023
              </p>
            </div>
            <p className="text-lg text-blue-500 dark:text-blue-400 mb-2">
              Hughes Systique Corporation, Gurugram
            </p>
            <div className="text-gray-700 dark:text-gray-300 space-y-2">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Built PoCs using LLMs on private business data by integrating
                  Hugging Face transformers with vector stores (Milvus, Chroma,
                  Weaviate) and LangChain-inspired tools like AI chat interfaces
                  and web retrievers.
                </li>
                <li>
                  Completed full-stack training and developed a Spring Boot +
                  React + Docker project, published on GitHub.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">
                IBM - ElasticSQL (Networking Client)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Implemented a Custom RAG solution that can answer questions via
                semantic similarity(vectors) as well as SQL-like query. Using
                advanced full-text search and filtering capabilities of
                Elastic-SQL to deliver great customer value.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">
                <li>Fine-tuning embedding models</li>
                <li>Developed high-accuracy query classifier</li>
                <li>Assisted in fine-tuning reranker</li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  ElasticSQL
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  watsonx
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  LLM
                </span>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">
                IBM - Virtual Assistant Banking MVP
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Fully conversational RAG chatbot with custom UI
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">
                <li>
                  Architected and developed a custom end-to-end RAG-based
                  chatbot using <strong>Watsonx.ai</strong> LLMs and Watson
                  Assistant, embedded in a React UI with features like deep
                  links, card carousels, and map-based location queries.
                </li>
                <li>
                  Deployed frontend and backend services as Docker containers on
                  IBM Cloud.
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  LLM
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  RAG
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  React
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  Flask
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  Docker
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  Cloud
                </span>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">
                IBM - Product Search and Virtual Assistant MVP
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                LLM based Summarisation and RAG chatbot
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">
                <li>
                  Leveraged generative AI to create summarised product
                  descriptions from FDA documents, significantly improving
                  search relevance for a medicinal drug store.
                </li>
                <li>
                  Developed and deployed a RAG-based Virtual Assistant on IBM
                  Cloud, enabling customers to query product information and
                  place orders, enhancing customer support and streamlining the
                  purchasing process.
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  RAG
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  Summarisation
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  watsonx.ai
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  LLM
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  watson-assistant
                </span>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">
                IBM - Retail NL2SQL
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Created a Natural Language to SQL pipeline using{" "}
                <strong>watsonx.ai</strong> LLMs to answer natural language
                queries of workers managing orders and sales.
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">
                <li>Automated Metadata Dictionary Creator</li>
                <li>Created Custom Disambiguation</li>
                <li>
                  Integrated with watsonx assistant via Backend APIs in
                  python(FastAPI)
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  NL2SQL
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  LLM
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  FastAPI
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Other IBM Pilots & Projects
            </h3>
            <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Marketing Campaign / Image Generation:</strong> Using
                Flux, created an automatic image-prompt improving agent using
                state space search.
                <a
                  href="https://www.linkedin.com/posts/activity-7267428313755770880-7BGG?utm_source=share&utm_medium=member_desktop&rcm=ACoAACf6ZZEBLzz5aFjl6Hh5-z4GJl8cFk5lmxE"
                  className="text-blue-500 hover:underline ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check Demo
                </a>
              </li>
              <li>
                <strong>Document Generation:</strong> Created similar document
                based on a given template and a new Idea.
              </li>
              <li>
                <strong>Watsonx Challenge Project:</strong> VSCode Extension for
                Code Vulnerability Detection
              </li>
              <li>
                <strong>Knowledge Graph RAG:</strong> Using LLMs over neo4j, we
                automated ontology creation, triplet extraction and natural
                language to cypher query.
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">
                Personal - MedBot - HyDe
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Leveraged hypothetical document embeddings to create good
                quality RAG answers on medical Question Answers.
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  Gemini
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  Pinecone
                </span>
              </div>
              <a
                href="https://github.com/ADITYAMAHAKALI/medical_bot_agent/tree/main"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">
                Personal - Daily Research Paper Summarizer
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Leveraging Gemini to create summarizer agents which generate
                summaries of popular research papers published each day.
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  Gemini
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  Agents
                </span>
              </div>
              <a
                href="https://github.com/ADITYAMAHAKALI/DailyPaperSummarizer"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://github.com/ADITYAMAHAKALI"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              View More Projects on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Skills Banner - Full Width */}
      <div className="w-full bg-gradient-to-r  from-indigo-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            My Skills & Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-200">
                AI Engineering
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Machine Learning
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Deep Learning
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Generative AI
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  NLP
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Computer Vision
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  AI Search
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Multimodal Models
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Agents
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  MCP
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-200">
                Backend Development
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Spring Boot
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Django
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Flask
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  NodeJS
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Fast API
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-200">
                Database Systems
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  SQL
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  NoSQL
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  GraphQL
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Elastic
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Milvus
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Weaviate
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Chroma
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Neo4j
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-200">
                DevOps
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Linux
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Git
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Docker
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  OpenShift
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Ansible
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Publications Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">
            Publications
          </h2>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              SEARCHD - Advanced Retrieval with Text Generation using Large
              Language Models and Cross Encoding Re-ranking
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              IEEE - October 23, 2024
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Study on how different RAG techniques can deliver greater
              faithfulness, context relevance, and answer relevancy.
            </p>
            <a
              href="https://ieeexplore.ieee.org/document/10711642"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Publication
            </a>
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">
              Education
            </h2>

            <div className="mb-6">
              <div className="flex flex-col md:flex-row justify-between mb-1">
                <h3 className="text-xl font-semibold">
                  MCA, Computer Science and Applications
                </h3>
                <p className="text-gray-600 dark:text-gray-400">2021-2023</p>
              </div>
              <p className="text-blue-500 dark:text-blue-400 mb-1">
                Jawaharlal Nehru University
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                7.65/9 CGPA
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Studied Advanced computer science concepts with ML and NLP
              </p>
            </div>

            <div className="mb-6">
              <div className="flex flex-col md:flex-row justify-between mb-1">
                <h3 className="text-xl font-semibold">BSc, Computer Science</h3>
                <p className="text-gray-600 dark:text-gray-400">2018-2021</p>
              </div>
              <p className="text-blue-500 dark:text-blue-400 mb-1">
                Central University of Rajasthan
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                7.74/10 CGPA
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Studied computer science fundamentals, statistics, and
                graduate-level mathematics
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">
              Examinations & Certifications
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">
                Examinations Cleared
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <span className="font-semibold">GATE CS</span> - IIT (2023)
                </li>
                <li>
                  <span className="font-semibold">UGC Net CS</span> - UGC (2023)
                </li>
                <li>
                  <span className="font-semibold">IIT JAM Mathematics</span> -
                  IIT (2021)
                </li>
                <li>
                  <span className="font-semibold">JNUEE</span> - JNU (2021)
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Certifications</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <span className="font-semibold">Coursera:</span> Intro To
                  Python, Algorithmic ToolBox
                </li>
                <li>
                  <span className="font-semibold">Kaggle:</span> Intro To ML,
                  Intro to Deep Learning, Intro to Computer Vision
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">
            Interests
          </h2>

          <div className="flex flex-wrap gap-8 justify-center">
            <div className="flex flex-col items-center">
              <FaChess
                size={48}
                className="text-gray-700 dark:text-gray-300 mb-3"
              />
              <span className="text-lg font-medium">Chess</span>
            </div>
            <div className="flex flex-col items-center">
              <FaChalkboardTeacher
                size={48}
                className="text-gray-700 dark:text-gray-300 mb-3"
              />
              <span className="text-lg font-medium">Teaching</span>
            </div>
            <div className="flex flex-col items-center">
              <FaLaptopCode
                size={48}
                className="text-gray-700 dark:text-gray-300 mb-3"
              />
              <span className="text-lg font-medium">Coding</span>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">
            Contact Me
          </h2>

          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  I'm always open to discussing new projects, opportunities, or
                  collaborations. Feel free to reach out!
                </p>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Email: </span>
                    <a
                      href="mailto:adityamahakali@gmail.com"
                      className="text-blue-500 hover:underline ml-1"
                    >
                      adityamahakali@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Phone: +91 8949185134</span>
                  </p>
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Location: Bangalore, India</span>
                  </p>
                </div>
              </div>
              <div className="flex-1 w-full max-w-md">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    Get In Touch
                  </h3>
                  <a
                    href="mailto:adityamahakali@gmail.com"
                    className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white text-center py-3 px-4 rounded-lg font-medium transition duration-300"
                  >
                    Send Message
                  </a>
                  <div className="flex justify-center space-x-4 mt-6">
                    <a
                      href="https://github.com/ADITYAMAHAKALI/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-300"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/aditya-mahakali-b81758168/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-300"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="https://medium.com/@adityamahakali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-300"
                    >
                      <FaMedium size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="w-full bg-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Collaborate?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            I'm always looking for exciting projects and opportunities to apply
            my expertise in AI and machine learning.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:adityamahakali@gmail.com"
              className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-8 rounded-lg font-semibold text-lg transition duration-300"
            >
              Contact Me
            </a>
            <a
              href="https://www.linkedin.com/in/aditya-mahakali-b81758168/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent hover:bg-blue-700 border-2 border-white text-white py-3 px-8 rounded-lg font-semibold text-lg transition duration-300"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Aditya Mahakali</h2>
              <p className="text-gray-600 dark:text-gray-400">AI/ML Engineer</p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/ADITYAMAHAKALI/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-mahakali-b81758168/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://medium.com/@adityamahakali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <FaMedium size={24} />
              </a>
              <a
                href="https://leetcode.com/adityamahakali/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <SiLeetcode size={24} />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Aditya Mahakali. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}