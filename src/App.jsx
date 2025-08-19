import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger.js';
import * as THREE from 'three';

// --- ICONS ---
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const GitHubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const MediumIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.82 6.18c0-1.9.31-3.61.94-5.14a.5.5 0 0 1 .93.35v15.22a.5.5 0 0 1-.93.35c-.63-1.53-.94-3.24-.94-5.14zm5.15 10.33c-.43.43-.83.79-1.21 1.07a.5.5 0 0 1-.68-.1L6.1 13.21a.5.5 0 0 1 .1-.68c.3-.23.63-.44.98-.63l5.26-2.85c.53-.28.88-.82.88-1.41V6.5a.5.5 0 0 1 .8-.4l4.6 2.53a.5.5 0 0 1 .25.64l-3.3 9.38a.5.5 0 0 1-.88.13l-3.24-4.86z"></path></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const workExperiences = [
  { id: 1, title: "Anti-Money Laundering Analyst", company: "GoCardless", location: "Riga, Latvia", dates: "2024 - Present", description: "AML compliance with internal policies and external requirements.", responsibilities: ["Conduct enhanced due diligence", "Conduct comprehensive risk assessments", "PEP, Adverse Media and Enforcement Screening"], color: "#00D4FF" },
  { id: 2, title: "KYC and Support Specialist", company: "GoCardless", location: "Riga, Latvia", dates: "2023 - 2024", description: "Focus on Customer onboarding and compliance verification.", responsibilities: ["Comprehensive customer due diligence", " Manage KYC processes and resolve system-related customer inquiries", "Collaborated with cross-functional teams"], color: "#00D4FF" },
  { id: 3, title: "Equities Operations Specialist", company: "SEB", location: "Riga, Latvia", dates: "2022 - 2022", description: "Managed equity operations across Nordic markets.", responsibilities: ["Matching and Settlement of Daily booked trades", "Collaborated with market partners for smooth operations", "Managed reconciliation and daily settlements"], color: "#0066CC" },
  { id: 4, title: "Data Associate", company: "Eternal Limited (Zomato)", location: "Gurugram, India", dates: "2020 - 2021", description: "Zomato platform specialist for restaurant onboarding.", responsibilities: ["Onboarded B2B restaurants onto Zomato platform", "Verified restaurant and their presence", "Reviewing their license and KYB checks"], color: "#E23744" }
];
const projects = [
  { id: 1, title: "CNN Model in R", description: "Advanced convolutional neural network for image classification using TensorFlow and Keras in R.", image: "https://placehold.co/600x400/0a0a0a/ffffff?text=CNN+Model", link: "https://github.com/ambuj4373/Creating-CNN-MODEL-IN-R", tech: ["R", "TensorFlow", "Keras", "Data Science"], featured: true },
  { id: 2, title: "Portfolio Website", description: "This cutting-edge portfolio featuring Three.js, GSAP, and modern web technologies.", image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Portfolio", link: "https://github.com/ambuj4373/cv-website", tech: ["React", "Three.js", "GSAP", "Tailwind"], featured: true }
];
const skillsData = {
  professional: [
    { title: "AML & Compliance", content: "Leading anti-money laundering investigations and regulatory compliance at GoCardless, including enhanced due diligence, PEP, Adverse media and Enforcement Screenings, and monitoring high-risk customers." },
    { title: "KYC & Customer Onboarding", content: "Managing customer onboarding, resolving KYC queries, and ensuring compliance across teams." },
    { title: "Banking Operations", content: "Experience at SEB handling equity operations, trade reconciliation, and resolving issues across Nordic markets." },
    { title: "Tools I Use", content: "LexisNexis, World-Check, Dow Jones Risk & Compliance, ComplyAdvantage, Ondato / Sumsub, company's internal tools and softwares." }
  ],
  technical: [
    { title: "Data Science & Analytics", content: "Working with R, Python, and AI tools for data analysis, visualization, and predictive modeling." },
    { title: "Web & Portfolio Development", content: "Built interactive projects and websites using React, Three.js, Tailwind, and GSAP, sometimes experimenting with AI assistance." },
    { title: "Machine Learning Projects", content: "Created models like CNNs for image classification as part of learning and portfolio work." }
  ],
  personal: [
    { title: "Writing & Learning", content: "Reading new articles and learning about data science, geopolitics, philosophy, and upcoming tech trends." },
    { title: "Sports", content: "Passionate about football, fan of FC Barcelona, and enjoy following matches and tactics." },
    { title: "Outdoors & Travel", content: "Love travelling, camping, and exploring new places." },
    { title: "Entertainment & Curiosity", content: "Enjoy movies, music, and exploring anything new or exciting." }
  ]
};
const education = [
  { id: 1, title: "International Business with Specialisation in International Relations", institution: "University of Latvia", dates: "2024 - Present", type: "Master's Degree", description: "Advanced studies in international business strategy and global relations.", link: "https://www.lu.lv/en/", status: "current" },
  { id: 2, title: "Google Data Analytics Specialization", institution: "Coursera", dates: "2022", type: "Professional Certificate", description: "Comprehensive data analytics covering SQL, R, and visualization.", link: "https://www.coursera.org/account/accomplishments/specialization/certificate/AAQR7QCNHPTV", status: "completed" },
  { id: 3, title: "IBM Applied Data Science with R", institution: "Coursera", dates: "2023", type: "Professional Certificate", description: "Applied data science using R for statistical analysis and ML.", link: "https://www.coursera.org/account/accomplishments/specialization/certificate/ASVE32JK5C66", status: "completed" }
];
const articles = [
  { id: 1, title: "Discovering Hidden Gems: Great R Libraries You Might Have Missed", url: "https://medium.com/r-evolution/discovering-hidden-gems-great-r-libraries-you-might-have-missed-9bae691ff552", platform: "Medium", readTime: "8 min read", image: "https://placehold.co/600x400/000000/FFFFFF?text=Article+1" },
  { id: 2, title: "ggplot2 3.3.0 - Hands-on New Features", url: "https://medium.com/p/69b0336f16eb", platform: "Medium", readTime: "6 min read", image: "https://placehold.co/600x400/111111/FFFFFF?text=Article+2" },
  { id: 3, title: "Visualizing Hierarchical Data with Sunburst Charts in R", url: "https://medium.com/p/22b101f0ebfc", platform: "Medium", readTime: "7 min read", image: "https://placehold.co/600x400/222222/FFFFFF?text=Article+3" },
  { id: 4, title: "From Brinkmanship to a Fragile Truce", url: "https://ambuj4373.medium.com/from-brinkmanship-to-a-fragile-truce-how-the-may-2025-ceasefire-is-reshaping-indias-policy-d2e39639fab0", platform: "Medium", readTime: "5 min read", image: "https://placehold.co/600x400/333333/FFFFFF?text=Article+4" },
  { id: 5, title: "Unlocking the Power of the GT Package in R", url: "https://medium.com/r-evolution/unlocking-the-power-of-the-gt-package-in-r-an-underrated-gem-for-beautiful-tables-5b798355cf38", platform: "Medium", readTime: "6 min read", image: "https://placehold.co/600x400/444444/FFFFFF?text=Article+5" },
  { id: 6, title: "Tools and Techniques Features in R", url: "https://medium.com/r-evolution/tools-and-techniques-features-in-r-3614edc0e419", platform: "Medium", readTime: "4 min read", image: "https://placehold.co/600x400/555555/FFFFFF?text=Article+6" },
  { id: 7, title: "R Packages in 2024: Fresh Tools", url: "https://medium.com/r-evolution/r-packages-in-2024-fresh-tools-f25939267eda", platform: "Medium", readTime: "5 min read", image: "https://placehold.co/600x400/666666/FFFFFF?text=Article+7" },
  { id: 8, title: "The Hidden Players Shaping Global Geopolitics", url: "https://ambuj4373.medium.com/the-hidden-players-shaping-the-future-of-global-geopolitics-and-economy-ad022f35352c", platform: "Medium", readTime: "7 min read", image: "https://placehold.co/600x400/777777/FFFFFF?text=Article+8" },
  { id: 9, title: "Analyzing Sales Performance with R", url: "https://medium.com/r-evolution/analyzing-sales-performance-with-r-b1270c62b182", platform: "Medium", readTime: "6 min read", image: "https://placehold.co/600x400/888888/FFFFFF?text=Article+9" }
];

// --- 3D PARTICLE BACKGROUND ---
function ParticleField() {
  const ref = useRef();
  const [sphere] = useState(() => {
    const sphereGeometry = new THREE.SphereGeometry(1, 45, 45);
    const positions = sphereGeometry.attributes.position.array;
    const particles = [];
    for (let i = 0; i < positions.length; i += 3) {
      particles.push(positions[i] * 5, positions[i + 1] * 5, positions[i + 2] * 5);
    }
    return new Float32Array(particles);
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.position.x = state.mouse.x * 0.2;
      ref.current.position.y = state.mouse.y * 0.2;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00ffff" size={0.005} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

// --- MATRIX RAIN BACKGROUND ---
function MatrixRain({ count = 100 }) {
    const lines = useRef([]);
    const group = useRef();

    if (lines.current.length === 0) {
        for (let i = 0; i < count; i++) {
            lines.current.push({
                points: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -Math.random() * 2 - 1, 0)],
                position: new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random()) * 10, (Math.random() - 0.5) * 5),
                speed: Math.random() * 0.01 + 0.005,
            });
        }
    }

    useFrame(() => {
        lines.current.forEach(line => {
            line.position.y -= line.speed;
            if (line.position.y < -5) {
                line.position.y = 5;
            }
        });
        group.current.children.forEach((mesh, i) => {
            mesh.position.copy(lines.current[i].position);
        });
    });

    return (
        <group ref={group}>
            {lines.current.map((line, i) => (
                <Line
                    key={i}
                    points={line.points}
                    color="#00ffff"
                    lineWidth={1}
                    transparent
                    opacity={0.3}
                />
            ))}
        </group>
    );
}


// --- MINIMAL CURSOR ---
function MinimalCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    const interactiveElements = document.querySelectorAll('button, a, [data-cursor="interactive"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] bg-cyan-400 mix-blend-difference"
      animate={{ x: position.x - 6, y: position.y - 6, scale: isHovering ? 2.5 : 1 }}
      transition={{ type: "spring", stiffness: 800, damping: 40 }}
    />
  );
}


// --- HOOK FOR TEXT SCRAMBLE ANIMATION ---
const useScramble = (text, duration = 1500, delay = 0) => {
    const [scrambledText, setScrambledText] = useState('');
    const chars = '!<>-_\\/[]{}—=+*^?#________';
  
    useEffect(() => {
      let frameRequest;
      let startTime;
      const animate = (time) => {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const newText = text.split('').map((char, index) => {
          if (progress * text.length > index) return text[index];
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        setScrambledText(newText);
        if (progress < 1) frameRequest = requestAnimationFrame(animate);
      };
      const timeoutId = setTimeout(() => {
        startTime = performance.now();
        frameRequest = requestAnimationFrame(animate);
      }, delay);
      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(frameRequest);
      };
    }, [text, duration, delay]);
  
    return scrambledText;
};
  
// --- HERO SECTION ---
function Hero() {
    const name = "AMBUJ SHUKLA";
    const scrambledName = useScramble(name, 2000, 500);
    const subtitles = [
    "AML Analyst at GoCardless",
    "Huge Interest In Data Science",
    "Keen Interest In International Relations And Global Affairs",
    "FC Barcelona Fan",
    "Daily Workout With Regulatory Compliance at GoCardless",
    "Playing With Python, R & AI Projects In Free Time 😉",
    "Building Websites And Experimenting With The Help Of AI 😉",
    "Roamer And Adventurer",
    "Not a CS Graduate",
    "Also Interested In Machine Learning All Thanks To GPT 😉",
    "Sometimes I Write And Blog",
    "Like To Go For Camping And Hiking",
    "I Like To Read About Eastern Philosophies Sometimes",
    "Sometimes Watching Movies And Web Series",
    "Gaming Occasionally On Xbox 😉",
    "C'Mon Scroll Now 😀"
    ];
    const [subtitleIndex, setSubtitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSubtitleIndex(prevIndex => (prevIndex + 1) % subtitles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [subtitles.length]);

    return (
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <Suspense fallback={null}>
                        <ParticleField />
                        <MatrixRain />
                    </Suspense>
                </Canvas>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-purple-900/20" />
            <div className="relative z-10 text-center px-6">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 relative shine-effect bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-mono tracking-wider">
                    {scrambledName}
                </h1>
                <div className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto h-8">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={subtitleIndex}
                            className="text-cyan-400"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {subtitles[subtitleIndex]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
            <FloatingSocials />
        </section>
    );
}

// --- FLOATING SOCIALS ---
function FloatingSocials() {
    const socialLinks = [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ambuj-s-23806915a/', icon: <LinkedInIcon /> },
        { name: 'GitHub', url: 'https://github.com/ambuj4373', icon: <GitHubIcon /> },
        { name: 'Medium', url: 'https://medium.com/@ambuj4373', icon: <MediumIcon /> }
    ];
    return (
        <motion.div 
            className="absolute bottom-10 left-10 flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2.8, ease: "easeOut" }}
        >
            {socialLinks.map((social) => (
                <motion.a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white hover:scale-110 transition-all" 
                    data-cursor="interactive"
                    whileHover={{ scale: 1.2, color: '#00ffff' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {social.icon}
                </motion.a>
            ))}
        </motion.div>
    );
}

// --- Experience Section ---
function Experience() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const cards = timelineRef.current.querySelectorAll('.timeline-card');
    gsap.fromTo(cards, { opacity: 0, y: 100, rotationY: 15 }, {
        opacity: 1, y: 0, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: timelineRef.current, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" }
    });
  }, []);

  return (
    <section id="experience" className="min-h-screen py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Experience
        </motion.h2>
        <div ref={timelineRef} className="space-y-12">
          {workExperiences.map((exp) => (
            <motion.div key={exp.id} className="timeline-card group relative backdrop-blur-lg bg-black/20 rounded-2xl p-8 border border-white/10 shadow-2xl" whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${exp.color}40` }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-cyan-400 font-medium text-lg mb-1">{exp.company}</p>
                  <p className="text-gray-400 mb-4">{exp.location} • {exp.dates}</p>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (<li key={idx} className="text-gray-300 flex items-start"><span className="text-cyan-400 mr-2">→</span>{resp}</li>))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// --- Projects Section ---
function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className="group relative block aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} whileHover={{ scale: 1.05, rotateY: 2 }} data-cursor="interactive">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-lg"></div>
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-75 transition-all duration-500" />
              <div className="relative p-6 flex flex-col h-full text-white">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, idx) => (<span key={idx} className="px-3 py-1 text-xs bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-cyan-300 border border-cyan-500/30">{tech}</span>))}
                </div>
                <div className="mt-4 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-semibold text-purple-400">View Project →</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}


// --- TABBED SKILLS SECTION ---
function Skills() {
  const [activeTab, setActiveTab] = useState('professional');
  const tabs = [
    { id: 'professional', label: 'Professional', icon: <BriefcaseIcon /> },
    { id: 'technical', label: 'Technical', icon: <CodeIcon /> },
    { id: 'personal', label: 'Personal', icon: <UserIcon /> },
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          My Skillset
        </motion.h2>
        <div className="flex justify-center border-b border-white/10 mb-12">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? 'text-cyan-400' : 'text-gray-400'} relative flex items-center gap-2 px-6 py-4 text-lg font-medium transition-colors hover:text-white`} data-cursor="interactive">
              {tab.icon} {tab.label}
              {activeTab === tab.id && (<motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500" layoutId="underline" />)}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData[activeTab].map((skill, index) => (
              <motion.div key={skill.title} className="group relative backdrop-blur-lg bg-black/20 rounded-2xl p-6 border border-white/10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -5, boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)"}}>
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></div>
                <div className="relative">
                    <h3 className="text-xl font-bold text-white mb-3">{skill.title}</h3>
                    <p className="text-gray-300">{skill.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}


// --- Education Section ---
function Education() {
  return (
    <section id="education" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Education
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <motion.div key={edu.id} className="group relative backdrop-blur-lg bg-black/20 rounded-2xl p-6 border border-white/10 transition-all duration-300" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} whileHover={{ scale: 1.05, y: -5 }}>
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></div>
              <div className="relative">
                <div className={`w-3 h-3 rounded-full mb-4 ${edu.status === 'current' ? 'bg-green-400' : 'bg-blue-400'}`} />
                <h3 className="text-lg font-bold text-white mb-2">{edu.title}</h3>
                <p className="text-cyan-400 font-medium mb-1">{edu.institution}</p>
                <p className="text-gray-400 text-sm mb-3">{edu.dates}</p>
                <p className="text-gray-300 text-sm mb-4">{edu.description}</p>
                {edu.link && (<a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors" data-cursor="interactive">View Certificate →</a>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// --- Articles Section ---
function Articles() {
  return (
    <section id="articles" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent pb-2" // Added pb-2 for padding-bottom
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Thoughts & Publications
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              data-cursor="interactive"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-lg"></div>
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-75 transition-all duration-500" />
              <div className="relative p-4 flex flex-col h-full text-white">
                <h3 className="text-md font-bold mb-2 group-hover:text-orange-400 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{article.platform}</span>
                  <span>{article.readTime}</span>
                </div>
                <div className="mt-auto text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-semibold text-orange-400 text-sm">
                    Read →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}


// --- Contact Section ---
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true); setSubmitError('');
    try {
      const response = await fetch('https://formspree.io/f/xkgzyvqg', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (response.ok) {
        setIsSubmitted(true); setFormData({ name: '', email: '', message: '' }); setTimeout(() => setIsSubmitted(false), 5000);
      } else { throw new Error('Failed to send message'); }
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  const handleChange = (e) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); if (submitError) setSubmitError(''); };

  return (
    <section id="contact" className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Get In Touch
        </motion.h2>
        <motion.div className="group relative backdrop-blur-lg bg-black/20 rounded-2xl p-8 border border-white/10" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></div>
          <form onSubmit={handleSubmit} className="relative space-y-6">
            <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" placeholder="Your Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" placeholder="Your Email" />
            <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} disabled={isSubmitting} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none transition-all" placeholder="Your message..." />
            {submitError && (<p className="text-red-400 text-sm text-center">{submitError}</p>)}
            <motion.button type="submit" disabled={isSubmitting || isSubmitted} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold tracking-wider hover:shadow-lg hover:shadow-cyan-500/50 transition-shadow" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} data-cursor="interactive">
              {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent! ✔' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// --- FUTURISTIC FOOTER with Clock & Contacts ---
function FuturisticFooter() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    const contactLinks = [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ambuj-s-23806915a/', icon: <LinkedInIcon /> },
        { name: 'GitHub', url: 'https://github.com/ambuj4373', icon: <GitHubIcon /> },
        { name: 'Medium', url: 'https://medium.com/@ambuj4373', icon: <MediumIcon /> },
        { name: 'Email', url: 'mailto:asjshuklaji@gmail.com', icon: <EmailIcon /> },
        { name: 'Phone', url: 'tel:+37128705807', icon: <PhoneIcon /> },
    ];

    return (
        <footer className="py-8 px-6 bg-black/50 backdrop-blur-md border-t border-white/10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                     <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Ambuj Shukla. All rights reserved.</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-cyan-400 font-mono text-2xl tracking-widest" style={{ textShadow: '0 0 5px #00ffff' }}>
                        {formatTime(time)}
                    </div>
                    <div className="flex items-center gap-4">
                        {contactLinks.map(social => (
                            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all" data-cursor="interactive">
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}


// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div className="w-16 h-16 border-4 border-t-4 border-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-white bg-black aurora-background">
      <MinimalCursor />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Articles />
      <Contact />
      <FuturisticFooter />
    </div>
  );
}
