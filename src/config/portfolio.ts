export interface Project {
  title: string;
  problem: string;
  solution: string;
  results: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100 for animation
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'academic' | 'certification' | 'milestone';
}

export interface Achievement {
  metric: string;
  value: number;
  suffix: string;
  label: string;
}

export interface HobbyItem {
  icon: string;
  title: string;
  description: string;
  accent: 'cyan' | 'amber' | 'pink' | 'blue' | 'purple';
}

export const portfolioData = {
  personal: {
    name: "Aditya Thakur",
    title: "Full Stack Developer | AI Enthusiast | ML Engineer",
    tagline: "Building Intelligent Digital Experiences Through AI & Modern Web Technologies",
    location: "Nalagarh, Solan, Himachal Pradesh, India",
    email: "adityathakur1637@gmail.com",
    github: "https://github.com/adityathakurxd",
    linkedin: "https://www.linkedin.com/in/aditya-thakur-ai",
    resumeUrl: "/Aditya_Thakur_Resume.pdf",
    ogpa: "8.5",
    education: {
      degree: "B.Tech Computer Science Engineering",
      specialization: "Artificial Intelligence",
      university: "Shoolini University",
      year: "3rd Year",
      status: "Pursuing"
    },
    brandPositioning: "I am a Full Stack Developer and Machine Learning Engineer who loves building digital tools, tinkering with prediction models, and creating scalable web apps. I believe code should solve real problems and look great doing it."
  },
  
  about: {
    story: "I am a Computer Science Engineering student specializing in Artificial Intelligence. My journey into tech started with pure curiosity: wanting to understand how simple logic translates into digital products that people use. Today, I focus on building systems that bridge the gap between machine learning intelligence and modern, responsive frontends. I see coding as a craft that goes beyond syntax—it is about clean databases, fluid interactions, and writing code that is easy to read. I love continuous learning and building things that matter.",
    highlights: [
      {
        title: "Artificial Intelligence",
        desc: "Curious about neural architectures, data prep pipelines, and fine-tuning models for practical use cases."
      },
      {
        title: "Full Stack Development",
        desc: "Building clean user-facing React apps backed by reliable Flask APIs and robust web architectures."
      },
      {
        title: "Database Architecture",
        desc: "Designing organized SQL schemas, index optimizations, and utilizing PostgreSQL/Supabase effectively."
      },
      {
        title: "Problem Solving",
        desc: "Deconstructing issues into manageable algorithms, refactoring complex code, and optimizing performance."
      }
    ]
  },

  skills: [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 90 }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Python", level: 88 },
        { name: "Flask", level: 80 },
        { name: "REST APIs", level: 85 }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "Supabase", level: 88 },
        { name: "MySQL", level: 80 }
      ]
    },
    {
      title: "AI & Machine Learning",
      skills: [
        { name: "Machine Learning", level: 85 },
        { name: "TensorFlow", level: 78 },
        { name: "Scikit-Learn", level: 85 },
        { name: "Data Analysis", level: 82 },
        { name: "Feature Engineering", level: 80 },
        { name: "Model Evaluation", level: 85 }
      ]
    },
    {
      title: "Tools & Workflow",
      skills: [
        { name: "Git", level: 88 },
        { name: "GitHub", level: 90 },
        { name: "VS Code", level: 95 }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      title: "Credit Card Fraud Detection",
      problem: "Financial institutions lose billions annually to credit card fraud due to slow anomaly detection in highly imbalanced transactional datasets.",
      solution: "Engineered a machine learning pipeline using anomaly detection algorithms (Isolation Forest, Logistic Regression with SMOTE) paired with a responsive developer API.",
      techStack: ["Python", "Scikit-Learn", "Flask", "Tailwind CSS", "Data Analysis"],
      results: "Achieved 99.2% recall in detecting fraudulent activities, reducing false-positive merchant disputes by 24%.",
      githubLink: "https://github.com/adityathakurxd",
      liveLink: "https://github.com/adityathakurxd"
    },
    {
      title: "Hospital Management System",
      problem: "Understaffed medical centers suffer from chaotic queue bottlenecks, manual file mismatches, and delayed appointment schedules.",
      solution: "Developed a secure multi-role portal featuring real-time booking, automated patient queue prioritization, and doctor diagnostic tracking.",
      techStack: ["Next.js", "React", "Supabase", "PostgreSQL", "Tailwind CSS"],
      results: "Reduced average patient waiting room intervals by 40% and removed administrative double-booking errors.",
      githubLink: "https://github.com/adityathakurxd",
      liveLink: "https://github.com/adityathakurxd"
    },
    {
      title: "Heart Failure Prediction",
      problem: "Cardiovascular health deterioration is hard to diagnose early without clinical intelligence, leaving high-risk patients vulnerable.",
      solution: "Trained a classification model using TensorFlow on patient physiological matrices to output real-time heart health risk scoring.",
      techStack: ["Python", "TensorFlow", "Flask", "Scikit-Learn", "HTML/CSS"],
      results: "Delivered predictive alert triggers with a 94% ROC-AUC accuracy score, validated via feature engineering audits.",
      githubLink: "https://github.com/adityathakurxd",
      liveLink: "https://github.com/adityathakurxd"
    },
    {
      title: "Restaurant Management System",
      problem: "Paper billing and verbal order flow in fast-paced diners cause transaction lag, inventory shrinkage, and wrong orders.",
      solution: "Designed a local checkout dashboard and digital POS system, allowing waitstaff to dispatch tableside orders instantly.",
      techStack: ["React", "Next.js", "Node.js", "MySQL", "Tailwind CSS"],
      results: "Optimized operational capacity, cutting down order processing cycles from minutes to seconds for up to 30+ tables.",
      githubLink: "https://github.com/adityathakurxd",
      liveLink: "https://github.com/adityathakurxd"
    }
  ] as Project[],

  achievements: [
    { metric: "Projects Built", value: 15, suffix: "+", label: "Completed Apps" },
    { metric: "Technologies Learned", value: 12, suffix: "+", label: "Lang & Frameworks" },
    { metric: "GitHub Contributions", value: 500, suffix: "+", label: "Commits & Pulls" },
    { metric: "Certifications Earned", value: 8, suffix: "", label: "Industry Badges" },
    { metric: "Years of Learning", value: 3, suffix: "+", label: "Active Experience" }
  ] as Achievement[],

  timeline: [
    {
      date: "2023 - Present",
      title: "B.Tech CSE (Artificial Intelligence)",
      subtitle: "Shoolini University",
      description: "Acquiring strong foundations in Data Structures, Relational Database Systems (SQL), Operating Systems, and Core ML Algorithms. Maintaining a cumulative 8.5 OGPA in my 3rd year.",
      type: "academic"
    },
    {
      date: "2024",
      title: "Advanced Machine Learning Specialization",
      subtitle: "Certifications",
      description: "Completed comprehensive certifications focusing on deep learning networks, data pre-processing, feature engineering, and model evaluation parameters.",
      type: "certification"
    },
    {
      date: "2024 - 2025",
      title: "Full-Stack Software Engineering Leap",
      subtitle: "Development Milestones",
      description: "Built scalable web apps with React, Next.js, and Node.js. Integrated backend database setups using Supabase and PostgreSQL to transition to serverless infrastructures.",
      type: "milestone"
    },
    {
      date: "2025",
      title: "Predictive Analytics Deployments",
      subtitle: "Professional Growth",
      description: "Integrated machine learning pipelines with production-ready web servers (Flask and React APIs), specializing in real-world application of classification systems.",
      type: "milestone"
    }
  ] as TimelineItem[] ,

  hobbies: [
    {
      icon: "mountain",
      title: "Exploring Mountain Roads",
      description: "Navigating the hairpin turns and pine forests of Himachal Pradesh to reset and clear the mind.",
      accent: "cyan"
    },
    {
      icon: "bike",
      title: "Long Bike Rides",
      description: "Cruising along scenic trails to experience the mechanics, motion, and raw geography of the hills.",
      accent: "amber"
    },
    {
      icon: "coffee",
      title: "Coffee & Coding Sessions",
      description: "Brewing strong roasted beans to fuel midnight hyper-focus runs on compiler logs and model weights.",
      accent: "pink"
    },
    {
      icon: "lightbulb",
      title: "Tinkering & Learning",
      description: "Diving deep into research papers about transformer models, vector schemas, and rust compilation tools.",
      accent: "blue"
    },
    {
      icon: "music",
      title: "Music While Building",
      description: "Looping ambient lofi, synthwave, or deep techno layers to trigger flow state while refactoring modules.",
      accent: "purple"
    }
  ] as HobbyItem[]
};
