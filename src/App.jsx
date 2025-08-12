import React from "react";
import { motion } from "framer-motion";

export default function App() {
  const sections = [
    {
      id: "hero",
      title: "Ambuj Shukla",
      subtitle: "Guardian of Finance • Data Alchemist • Eternal Explorer",
      content: (
        <div className="space-y-6 text-center">
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">In the swirling gradients of code and compliance, I craft worlds where numbers sing and risks dissolve. At GoCardless, I'm the silent sentinel against financial shadows, weaving data into symphonies of security. Join me in this digital odyssey—let's turn insights into art. 🌌🔮</p>
          <button className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition duration-300 shadow-md hover:scale-105">
            Dive Deeper
          </button>
        </div>
      )
    },
    {
      id: "about",
      title: "The Canvas of My Journey",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">Picture a nomad soul, from India's bustling bazaars to Latvia's serene shores. I'm Ambuj, architect of unseen defenses in the financial realm. As AML Analyst at GoCardless, I orchestrate verifications like a maestro—LexisNexis as my baton, SAS as my score, turning high-risk riddles into harmonious resolutions.</p>
          <ul className="list-disc pl-6 space-y-3 text-lg">
            <li>Daily dances with due diligence, where transactions whisper secrets and PEPs hide in plain sight.</li>
            <li>Hobbies? Chai-infused daydreams, cultural collages on Medium, and midnight hikes under Baltic stars—fuel for my creative fire.</li>
            <li>Life mantra: Blend precision with passion, turning compliance into captivating tales.</li>
          </ul>
          <p className="text-lg leading-relaxed">What hues paint your story? Let's collaborate and color outside the lines.</p>
        </div>
      )
    },
    {
      id: "work",
      title: "Epic Quests in Finance",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">My career's a tapestry of triumphs, with AML at GoCardless as the golden thread (2024-present). Here, I navigate the labyrinth of financial crime—enhanced due diligence as my map, transaction monitoring as my compass, unveiling sanctions and risks like an artist revealing hidden layers.</p>
          <ul className="list-none space-y-4">
            <li className="bg-white/5 p-6 rounded-lg shadow-md hover:scale-105 transition duration-300">
              <strong className="text-xl">KYC Specialist, GoCardless (2023):</strong> <span className="block mt-2 text-lg leading-relaxed">Bridged worlds between customers and compliance, resolving queries with empathy and edge—think diplomat in a data storm.</span>
            </li>
            <li className="bg-white/5 p-6 rounded-lg shadow-md hover:scale-105 transition duration-300">
              <strong className="text-xl">Equities Ops, SEB (2022):</strong> <span className="block mt-2 text-lg leading-relaxed">Raced Nordic markets, settling trades under pressure, where every second was a stroke of strategic genius.</span>
            </li>
            <li className="bg-white/5 p-6 rounded-lg shadow-md hover:scale-105 transition duration-300">
              <strong className="text-xl">Data Associate, Jindal (2020-21):</strong> <span className="block mt-2 text-lg leading-relaxed">Polished raw data into gems, sparking my love for analytics amid collaborative chaos.</span>
            </li>
          </ul>
          <p className="text-lg leading-relaxed">Interwoven with hobbies: Chai breaks for brainstorming, cultural dives for inspiration. Ready to co-author the next chapter?</p>
        </div>
      )
    },
    {
      id: "education",
      title: "Forge of Wisdom",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">In Riga Technical University's MSc program (2021-present), I sculpt knowledge from global economics—trade agreements as bridges, crises as canvases, painting futures with FDI and diplomacy.</p>
          <ul className="list-disc pl-6 space-y-3 text-lg">
            <li>Google Data Analytics Specialization (2022): Mastered R's rhythms, turning data dirt to dazzling visuals.</li>
            <li>IBM Applied Data Science with R (2023): Wielded SQL like a wand, conjuring predictions from chaos.</li>
          </ul>
          <p className="text-lg leading-relaxed">Hobbies blend in: Evening reads on globalization, chai-fueled debates. Education isn't a degree—it's the spark that ignites endless creation.</p>
        </div>
      )
    },
    {
      id: "skills-hobbies",
      title: "Arsenal & Inspirations",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">Skills are my palette: Data symphonies in Excel, Tableau, Power BI; code incantations with R (ggplot2's glow, tidyverse's grace), SQL's precision, ML's magic (CNN visions, regression revelations). Finance flows: AML artistry, equities equilibrium, SWIFT strokes.</p>
          <p className="text-lg leading-relaxed">Hobbies the muse: Chai rituals for reflection, cultural odysseys (Riga's whispers to India's roar), storytelling scrolls on Medium. Languages? Hindi's heartbeat, English's eloquence.</p>
          <p className="text-lg leading-relaxed">This blend? Turns professional prowess into personal poetry. What's in your arsenal?</p>
        </div>
      )
    },
    {
      id: "projects",
      title: "Dreams Made Digital",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">Projects are portals to possibility! Crafted a CNN in R (90% accuracy)—a machine's eye awakened through hyperparameter alchemy and global collab sparks.</p>
          <ul className="list-disc pl-6 space-y-3 text-lg">
            <li>Fused data science with economics: R forecasts dancing with trade policies, transforming stats into storytelling spectacles on Medium.</li>
            <li>Human touch: Each creation a bridge from code to connection, infused with chai-inspired creativity.</li>
          </ul>
          <p className="text-lg leading-relaxed">Explore on GitHub—let's collaborate and conjure something extraordinary! 🤖🎨</p>
        </div>
      )
    },
    {
      id: "contact",
      title: "Whisper Your Vision",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">In the gradient of connections, let's meet! From Laimdotas Street 2, LV-1006 Riga, Latvia, I await your spark.</p>
          <ul className="list-none space-y-3 text-lg">
            <li><strong>Emails:</strong> asjshuklaji@gmail.com | shuklajipro@gmail.com</li>
            <li><strong>Phone/WhatsApp:</strong> (+371) 28705807</li>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/ambuj-shukla-23806915a/" className="text-yellow-300 hover:underline hover:scale-105 transition duration-300">Profile</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/ambuj4373" className="text-yellow-300 hover:underline hover:scale-105 transition duration-300">Repository</a></li>
          </ul>
          <p className="text-lg leading-relaxed">Share your story over virtual chai—ideas await! 🌟📩</p>
          {/* Interactive Form */}
          <form className="flex flex-col space-y-4 mt-8 max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="p-4 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="p-4 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
            />
            <textarea 
              placeholder="Your Message" 
              className="p-4 rounded-2xl bg-white/10 text-white placeholder-gray-400 h-32 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
            />
            <button 
              type="button" 
              onClick={() => alert('Message sent! (Simulation)')}
              className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition duration-300 shadow-md hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      )
    }
  ];

  return (
    <div className="animated-gradient text-white min-h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black bg-opacity-50 backdrop-blur-md p-6">
        <ul className="flex justify-center space-x-10">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-xl font-light hover:text-yellow-300 transition duration-300"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((section) => (
        <motion.section
          key={section.id}
          id={section.id}
          className="snap-start min-h-screen flex flex-col items-center justify-center p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-xl p-12 max-w-5xl w-full">
            <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-wide">
              {section.title}
            </h1>
            {section.subtitle && (
              <p className="text-2xl md:text-3xl font-light italic mb-8 tracking-wide text-yellow-100">
                {section.subtitle}
              </p>
            )}
            {section.content}
          </div>
        </motion.section>
      ))}
    </div>
  );
}