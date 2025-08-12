import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Data and Content  
const workExperiences = [
  {
    title: "Anti-Money Laundering Analyst",
    company: "GoCardless — Riga, Latvia",
    dates: "01/01/2024 – CURRENT",
    responsibilities: [
      "Conduct enhanced and customer due diligence on high-risk customers.",
      "Use LexisNexis and SAS for identity verification, adverse media checks, and risk assessments.",
      "Monitor transactions to detect suspicious activity.",
      "Perform sanctions and PEP screening.",
      "Raise suspicious activity reports and ensure regulatory compliance.",
    ],
  },
  {
    title: "KYC and Support Specialist",
    company: "GoCardless — Riga, Latvia",
    dates: "01/05/2023 – 31/12/2023",
    responsibilities: [
      "Performed due diligence on new customers and verified documentation.",
      "Handled KYC-related customer queries and resolved complaints.",
      "Collaborated with sales, operations, and legal teams to ensure KYC compliance.",
      "Maintained and updated customer data securely.",
    ],
  },
  {
    title: "Equities Operations Specialist",
    company: "Skandinaviska Enskilda Banken AB (SEB) — Riga, Latvia",
    dates: "15/02/2022 – 08/10/2022",
    responsibilities: [
      "Resolved daily trade issues with precision and efficiency.",
      "Collaborated with global partners to maintain smooth operations.",
      "Managed control, reconciliation, and client data confidentiality.",
      "Operated in HEX, OSE, and CSE markets using internal SEB tools.",
    ],
  },
  {
    title: "Data Associate (Zomato Onboarding Specialist)",
    company: "Jindal Intellicom Limited — Gurugram, India",
    dates: "23/08/2020 – 27/07/2021",
    responsibilities: [
      "Onboarded B2B restaurants, franchises, and retailers onto Zomato’s platform.",
      "Verified restaurant amenities, ambiance, and service features.",
      "Collaborated with restaurant owners for smooth integration.",
      "Performed data validation and analytics using MS tools.",
    ],
  },
];

const educationItems = [
  {
    title: "Internation Business with Specialisation In Internation Relations",
    institution: "University of Latvia",
    dates: "2024 – Present",
    description:
      "Currently pursuing a master's degree focusing on Internation Business and Internation Relations.",
    link: "https://www.lu.lv/en/admission/study-programmes/masters-study-programmes/international-business-with-specialization-in-export-management/",
  },
  {
    title: "Google Data Analytics Specialization",
    institution: "Coursera",
    dates: "2022",
    description:
      "Completed a comprehensive data analytics course covering data cleaning, visualization, SQL, and R programming. Gained hands-on experience with real-world datasets and case studies.",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/AAQR7QCNHPTV",
  },
  {
    title: "IBM Applied Data Science with R",
    institution: "Coursera",
    dates: "2023",
    description:
      "Focused on practical data science applications using R programming, including statistical analysis, machine learning basics, and data visualization.",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/ASVE32JK5C66",
  },
];

const skillsInterests = {
  skills: [
    "Due Diligence",
    "Risk Assessment",
    "Regulatory Reporting",
    "KYC and AML Compliance",
    "Data Analysis",
    "LexisNexis",
    "Excel",
    "R Programming",
    "Data Visualization",
    "Data Analytics",
  ],
  interests: [
    "Data Science Trends",
    "Global Economics",
    "Cultural, Politics and Current Affairs",
    "Machine Learning",
    "Financial Compliance",
    "International Relations",
    "Philosophy",
    "Travel and Exploration",
    "Reading Non-Fiction",
    "Cooking and Culinary Arts",
    "Music and Arts",
    "Sports and Fitness",
    "Technology and Innovation",
  ],
};

const projects = [
  {
    title: "Creating CNN Model in R",
    description:
      "Developed a convolutional neural network (CNN) in R for image classification, integrating TensorFlow and Keras libraries. Achieved 90% accuracy on CIFAR-10 dataset, demonstrating deep learning and data preprocessing skills.",
    link: "https://github.com/ambuj4373/Creating-CNN-MODEL-IN-R",
  },
  {
    title: "Personal CV Website (React + Vite)",
    description:
      "Built a fully responsive and animated personal portfolio website using React and Vite. Features smooth scrolling, animated timeline, and contact form integration.",
    link: "https://github.com/ambuj4373/cv-website",
  },
];

const mediumArticles = [
  {
    title: "Discovering Hidden Gems: Great R Libraries You Might Have Missed",
    url: "https://medium.com/r-evolution/discovering-hidden-gems-great-r-libraries-you-might-have-missed-9bae691ff552?sk=642c5c8f9291c42e742cfcf6136e42ab",
  },
  {
    title: "ggplot2 3.3.0- Hands-on New Features",
    url: "https://medium.com/p/69b0336f16eb",
  },
  {
    title: "Visualizing Hierarchical Data with Sunburst Charts in R",
    url: "https://medium.com/p/22b101f0ebfc",
  },
];

const coursesCertifications = [
  {
    name: "Google Data Analytics Specialization",
    provider: "Coursera",
    year: "2022",
    insights:
      "Learned fundamentals of data cleaning, visualization, and SQL querying. Hands-on projects helped sharpen practical skills.",
    link: "https://www.coursera.org/professional-certificates/google-data-analytics",
  },
  {
    name: "IBM Applied Data Science with R",
    provider: "Coursera",
    year: "2023",
    insights:
      "Gained expertise in R programming for data science, statistical analysis, and machine learning basics.",
    link: "https://www.coursera.org/professional-certificates/ibm-data-science",
  },
  {
    name: "Advanced AML Compliance Training",
    provider: "GoCardless Internal",
    year: "2024",
    insights:
      "In-depth understanding of AML regulations, sanctions screening, and suspicious activity reporting processes.",
    link: null,
  },
];

// Animation Hook
function useRevealAnimation() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  React.useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0, scale: 1 });
  }, [controls, inView]);
  return [ref, controls];
}

// Section Wrapper
function SectionWrapper({ id, title, children, bgClass = "" }) {
  const [ref, controls] = useRevealAnimation();
  return (
    <section
      id={id}
      ref={ref}
      aria-label={title}
      className={`max-w-6xl mx-auto px-6 py-20 scroll-mt-24 ${bgClass}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={controls}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-light mb-14 text-yellow-300 text-center tracking-wide select-none"
      >
        {title}
      </motion.h2>
      <motion.div animate={controls} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
        {children}
      </motion.div>
    </section>
  );
}

// Timeline Item for Work Experience
function TimelineItem({ job, isLeft }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) controls.start({ opacity: 1, x: 0 });
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={controls}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`mb-14 w-full md:w-1/2 px-6 relative ${
        isLeft ? "left-0 text-right md:pr-14" : "ml-auto text-left md:pl-14"
      }`}
    >
      {/* Dot on timeline */}
      <div
        className="absolute top-6 -left-6 md:-right-6 md:left-auto bg-yellow-300 rounded-full w-6 h-6 border-4 border-black shadow-lg"
        style={{ left: isLeft ? "-1.5rem" : "auto", right: isLeft ? "auto" : "-1.5rem" }}
      />
      <h3 className="text-2xl font-semibold text-yellow-300">{job.title}</h3>
      <p className="italic text-gray-300">{job.company}</p>
      <p className="text-sm text-gray-400 mb-4">{job.dates}</p>
      <ul className="list-disc space-y-2 text-gray-200 max-w-md mx-auto">
        {job.responsibilities.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

// Work Timeline Component
function WorkTimeline() {
  return (
    <div className="relative max-w-5xl mx-auto px-6 py-8">
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-yellow-300 rounded-full"></div>
      {/* Timeline items */}
      {workExperiences.map((job, index) => (
        <TimelineItem key={index} job={job} isLeft={index % 2 === 0} />
      ))}
    </div>
  );
}

// Education Card Component
function EducationCard({ edu }) {
  return (
    <motion.div
      className="bg-gray-900 rounded-xl shadow-lg p-8 max-w-3xl mx-auto mb-12"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h3 className="text-2xl font-semibold text-yellow-300 mb-1">{edu.title}</h3>
      <p className="italic text-gray-300 mb-2">{edu.institution}</p>
      <p className="text-sm text-gray-400 mb-4">{edu.dates}</p>
      <p className="text-gray-200 mb-4">{edu.description}</p>
      {edu.link && (
        <a
          href={edu.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-yellow-400 hover:underline hover:text-yellow-300 font-medium"
        >
          View Course
        </a>
      )}
    </motion.div>
  );
}

// Skills and Interests Component
function SkillsInterests() {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
      <motion.div
        className="bg-gray-900 rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h3 className="text-3xl font-semibold text-yellow-300 mb-6">Skills</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-2 text-lg">
          {skillsInterests.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="bg-gray-900 rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <h3 className="text-3xl font-semibold text-yellow-300 mb-6">Interests</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-2 text-lg">
          {skillsInterests.interests.map((interest, idx) => (
            <li key={idx}>{interest}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

// Projects Section
function ProjectsSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-10">
      {projects.map((project, idx) => (
        <motion.div
          key={idx}
          className="bg-gray-900 rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-yellow-300 mb-4">{project.title}</h3>
          <p className="text-gray-200 mb-4">{project.description}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline hover:text-yellow-300 font-medium"
            >
              View Project
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Medium Articles Section
function MediumArticles() {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-14 mb-20">
      <h3 className="text-4xl font-semibold text-yellow-300 mb-8 text-center select-none">
        Featured Medium Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {mediumArticles.map((article, idx) => (
          <motion.a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:bg-yellow-300 hover:text-black transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
          >
            <h4 className="text-xl font-semibold mb-3">{article.title}</h4>
            <p className="text-yellow-700 font-medium mt-auto">Read on Medium →</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

// Courses & Certifications Section
function CoursesCertifications() {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-14 mb-20">
      <h3 className="text-4xl font-semibold text-yellow-300 mb-8 text-center select-none">
        Courses & Certifications
      </h3>
      <div className="space-y-10">
        {coursesCertifications.map((course, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-900 rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.15 }}
          >
            <h4 className="text-2xl font-semibold text-yellow-300 mb-2">{course.name}</h4>
            <p className="italic text-gray-300 mb-2">
              {course.provider} — {course.year}
            </p>
            <p className="text-gray-200 mb-4">{course.insights}</p>
            {course.link && (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline hover:text-yellow-300 font-medium"
              >
                Learn More
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Contact Section with basic form
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    alert(`Thanks, ${form.name}! Your message has been sent (simulation).`);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900 rounded-xl shadow-lg">
      <h3 className="text-4xl font-semibold text-yellow-300 mb-8 text-center select-none">
        Contact Me
      </h3>
      <p className="mb-8 text-gray-300 text-center">
        From Laimdotas Street 2, LV-1006 Riga, Latvia — I’m open to professional connections,
        collaborations, and new opportunities.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-yellow-300 font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-yellow-400 bg-gray-800 px-4 py-2 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-yellow-300 font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-yellow-400 bg-gray-800 px-4 py-2 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-yellow-300 font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-md border border-yellow-400 bg-gray-800 px-4 py-2 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
        </div>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-md px-6 py-3 transition"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="bg-black min-h-screen text-yellow-200 font-sans selection:bg-yellow-400 selection:text-black scroll-smooth">
      {/* About Me */}
      <SectionWrapper id="about" title="About Me" bgClass="bg-black">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-lg leading-relaxed tracking-wide"
        >
          Hey! I’m Ambuj Shukla, an AML Analyst and aspiring data scientist currently
          based in Riga, Latvia. Passionate about financial compliance, data science,
          and international relations, I blend regulatory expertise with analytical
          insights to help detect and prevent financial crime. In my free time, I
          explore machine learning, read geopolitics, and build personal tech projects.
        </motion.p>
      </SectionWrapper>

      {/* Work Experience */}
      <SectionWrapper id="work" title="Work Experience" bgClass="bg-black">
        <WorkTimeline />
      </SectionWrapper>

      {/* Education */}
      <SectionWrapper id="education" title="Education" bgClass="bg-black">
        {educationItems.map((edu, idx) => (
          <EducationCard key={idx} edu={edu} />
        ))}
      </SectionWrapper>

      {/* Skills & Interests */}
      <SectionWrapper id="skills" title="Skills & Interests" bgClass="bg-black">
        <SkillsInterests />
      </SectionWrapper>

      {/* Projects */}
      <SectionWrapper id="projects" title="Projects" bgClass="bg-black">
        <ProjectsSection />
      </SectionWrapper>

      {/* Medium Articles */}
      <SectionWrapper id="articles" title="Featured Medium Articles" bgClass="bg-black">
        <MediumArticles />
      </SectionWrapper>

      {/* Courses & Certifications */}
      <SectionWrapper id="courses" title="Courses & Certifications" bgClass="bg-black">
        <CoursesCertifications />
      </SectionWrapper>

      {/* Contact */}
      <SectionWrapper id="contact" title="Contact" bgClass="bg-black">
        <ContactSection />
      </SectionWrapper>
    </div>
  );
}
