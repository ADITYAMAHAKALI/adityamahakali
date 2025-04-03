import { BlogPosts } from 'app/components/posts';
import { FaGithub, FaLinkedin,FaMedium } from 'react-icons/fa';
import Image from 'next/image';
import pp from './images/pp.jpeg';

export default function Page() {
  return (
    <section className="max-w-3xl mx-auto p-8">
      <div className="flex flex-col items-center mb-8">
        <Image
          src={pp}
          alt="Profile Picture"
          width={300} // Adjusted size
          height={300} // Adjusted size
          className="rounded-full mb-4" // Rounded profile picture
        />
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Aditya Mahakali
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          AI/ML Engineer @ IBM
        </p>
      </div>

      <div className="mb-8 text-lg leading-relaxed">
        <p className="mb-4">
          I am a full-stack AI/ML Engineer passionate about building solutions that drive positive change. I specialize in developing scalable generative AI applications, including RAG, classification, summarization, and coding assistants.
        </p>
        <p className="mb-4">
          My expertise spans traditional machine learning, secure and scalable backend development, and creating intuitive user interfaces.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Experience</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">AI Engineer | Data Scientist</h3>
          <p className="text-gray-700 dark:text-gray-300">IBM · Full-time</p>
          <p className="text-gray-700 dark:text-gray-300">Aug 2023 - Present · 1 yr 9 mos</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Bengaluru, Karnataka, India · Hybrid</p>
          <p className="text-gray-700 dark:text-gray-300">
            Developed AI solutions using IBM's generative AI technologies (watsonx.ai, watsonx.data, etc.) and open-source tools. Built backend APIs, databases, and user interfaces for AI applications.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Internship Trainee</h3>
          <p className="text-gray-700 dark:text-gray-300">Hughes Systique Corporation (HSC) · Internship</p>
          <p className="text-gray-700 dark:text-gray-300">Jan 2023 - Aug 2023 · 8 mos</p>
          <p className="text-gray-700 dark:text-gray-300">Gurugram, Haryana, India · Hybrid</p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Education</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Jawaharlal Nehru University</h3>
          <p className="text-gray-700 dark:text-gray-300">Masters in Computer Application, Computer Science</p>
          <p className="text-gray-700 dark:text-gray-300">Jan 2022 - Jun 2023</p>
          <p className="text-gray-700 dark:text-gray-300">
            Skills: Natural Language Processing (NLP) · Artificial Intelligence (AI) · Computer Science · SQL · Machine Learning · Core Java
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Central University of Rajasthan, Jaipur</h3>
          <p className="text-gray-700 dark:text-gray-300">Bachelor of Science, Cs</p>
          <p className="text-gray-700 dark:text-gray-300">2018 - 2021</p>
          <p className="text-gray-700 dark:text-gray-300">Skills: Computer Science</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Jawahar Navodaya Vidyalaya (JNV)</h3>
          <p className="text-gray-700 dark:text-gray-300">higher secondary, PCM</p>
          <p className="text-gray-700 dark:text-gray-300">2015 - 2017</p>
        </div>
      </div>
      
      <div className="flex space-x-6 justify-center mb-8">
        <a href="https://github.com/ADITYAMAHAKALI/" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-gray-400">
          <FaGithub size={32} />
        </a>
        <a href="https://www.linkedin.com/in/aditya-mahakali-b81758168/" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-gray-400">
          <FaLinkedin size={32} />
        </a>
        <a href="https://medium.com/@adityamahakali" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-gray-400">
          <FaMedium size={32} />
        </a>
      </div>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}