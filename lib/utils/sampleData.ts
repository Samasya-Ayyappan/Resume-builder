import { ResumeData, ResumeType, DEFAULT_SECTION_TITLES } from '../types/resume';

export const createEmptyResume = (resumeType: ResumeType = 'experienced'): ResumeData => ({
  metadata: {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `resume_${Date.now()}`,
    title: resumeType === 'fresher' ? 'Entry Level Resume' : 'Professional Resume',
    resumeType,
    selectedTemplate: 'modern',
    themeColor: 'indigo',
    lastModified: Date.now(),
    version: 1,
  },
  sectionTitles: { ...DEFAULT_SECTION_TITLES },
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [
    {
      id: 'cat-languages',
      name: 'Programming Languages',
      skills: [],
    },
    {
      id: 'cat-frameworks',
      name: 'Frameworks & Libraries',
      skills: [],
    },
  ],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
  activeSections: {
    experience: resumeType === 'experienced',
    projects: true,
    certifications: true,
    languages: true,
    achievements: true,
  },
});

export const FRESHER_SAMPLE_DATA: ResumeData = {
  metadata: {
    id: 'sample_fresher',
    title: 'Software Engineer (Graduate)',
    resumeType: 'fresher',
    selectedTemplate: 'modern',
    themeColor: 'indigo',
    lastModified: Date.now(),
    version: 1,
  },
  sectionTitles: { ...DEFAULT_SECTION_TITLES },
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Aspiring Software Development Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 382-9102',
    location: 'Seattle, WA',
    website: 'https://alexmorgan.dev',
    linkedin: 'https://linkedin.com/in/alexmorgandev',
    github: 'https://github.com/alexmorgan',
  },
  summary:
    'Recent Computer Science graduate with a solid foundation in data structures, algorithms, and full-stack web development. Proven track record of building production-grade web applications through academic projects and open-source contributions. Eager to contribute scalable code and learn rapidly as an Associate SDE.',
  experience: [
    {
      id: 'exp-fresh-1',
      jobTitle: 'Software Engineering Intern',
      company: 'TechWave Solutions',
      location: 'Seattle, WA',
      startDate: '2025-06',
      endDate: '2025-08',
      isCurrent: false,
      description: 'Built customer-facing microservices and automated reporting pipelines.',
      highlights: [
        'Developed <strong>RESTful API endpoints</strong> in TypeScript & Node.js, reducing query response times by <strong>28%</strong>.',
        'Implemented end-to-end integration tests using <strong>Vitest</strong>, boosting code coverage from 64% to <strong>88%</strong>.',
        'Collaborated with a 5-member Agile squad on bi-weekly sprint cycles and CI/CD deployment pipelines.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-fresh-1',
      institution: 'University of Washington',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Engineering',
      location: 'Seattle, WA',
      startDate: '2022-09',
      endDate: '2026-05',
      gpa: '3.85 / 4.0',
      honors: 'Dean\'s List (All Semesters), Magna Cum Laude',
    },
  ],
  skills: [
    {
      id: 'sk-lang',
      name: 'Languages',
      skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Java', 'SQL', 'HTML5/CSS3'],
    },
    {
      id: 'sk-frameworks',
      name: 'Frameworks & Libraries',
      skills: ['React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express'],
    },
    {
      id: 'sk-tools',
      name: 'Developer Tools & Systems',
      skills: ['Git & GitHub', 'Docker', 'PostgreSQL', 'Jest / Vitest', 'Linux/Bash', 'REST APIs'],
    },
    {
      id: 'sk-concepts',
      name: 'Core Competencies',
      skills: ['Data Structures & Algorithms', 'System Design Basics', 'OOP', 'Agile/Scrum'],
    },
  ],
  projects: [
    {
      id: 'proj-fresh-1',
      title: 'DevPulse — Developer Metrics Dashboard',
      description:
        'A real-time analytics web dashboard that connects with GitHub webhooks to visualize PR cycle velocity, build health, and commit activity.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Chart.js'],
      link: 'https://devpulse-demo.app',
      github: 'https://github.com/alexmorgan/devpulse',
      startDate: '2026-01',
      endDate: '2026-04',
    },
    {
      id: 'proj-fresh-2',
      title: 'Distributed Key-Value Store',
      description:
        'Engineered an in-memory replicated storage engine with Raft consensus protocol support and consistent hashing for partition tolerance.',
      technologies: ['Go', 'gRPC', 'Protocol Buffers', 'Docker'],
      link: '',
      github: 'https://github.com/alexmorgan/raft-kv-store',
      startDate: '2025-10',
      endDate: '2025-12',
    },
  ],
  certifications: [
    {
      id: 'cert-fresh-1',
      name: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuer: 'Amazon Web Services',
      issueDate: '2025',
      url: 'https://aws.amazon.com/verification',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native / Bilingual' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Professional Working' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place Winner — Northwest Regional Hackathon',
      date: '2025',
      description: 'Built an accessible speech-to-text collaboration app used by 400+ participants.',
    },
    {
      id: 'ach-2',
      title: 'ACM Student Chapter Vice Chair',
      date: '2024 - 2025',
      description: 'Organized 12 technical coding workshops and mock technical interviews for 250+ undergraduates.',
    },
  ],
  activeSections: {
    experience: true,
    projects: true,
    certifications: true,
    languages: true,
    achievements: true,
  },
};

export const EXPERIENCED_SAMPLE_DATA: ResumeData = {
  metadata: {
    id: 'sample_experienced',
    title: 'Senior Full Stack Engineer',
    resumeType: 'experienced',
    selectedTemplate: 'modern',
    themeColor: 'slate',
    lastModified: Date.now(),
    version: 1,
  },
  sectionTitles: { ...DEFAULT_SECTION_TITLES },
  personalInfo: {
    fullName: 'Jordan Taylor',
    jobTitle: 'Senior Software Development Engineer',
    email: 'jordan.taylor@example.com',
    phone: '+1 (555) 749-2184',
    location: 'San Francisco, CA',
    website: 'https://jordantaylor.tech',
    linkedin: 'https://linkedin.com/in/jordantaylordev',
    github: 'https://github.com/jordantaylor',
  },
  summary:
    'Senior Software Engineer with 6+ years of experience architecting resilient cloud services, distributed web applications, and customer-facing interfaces at scale. Specializes in TypeScript, Next.js, React, Node.js, and event-driven microservices. Track record of mentoring engineers, optimizing P99 latencies by over 40%, and delivering high-impact features under tight schedules.',
  experience: [
    {
      id: 'exp-exp-1',
      jobTitle: 'Senior Software Engineer',
      company: 'StripeWave Cloud Platforms',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: 'Present',
      isCurrent: true,
      description: 'Lead engineer for the Core Billing and Developer Portal team serving 1.2M+ active merchant businesses.',
      highlights: [
        'Architected a distributed event-driven billing reconciliation service in Node.js and <strong>Kafka</strong>, processing <strong>$45M+ in monthly transactions</strong> with 99.99% reliability.',
        'Spearheaded frontend migration of merchant dashboard to <strong>Next.js App Router</strong>, cutting First Contentful Paint by <strong>44%</strong> and boosting SEO rankings.',
        'Mentored 6 junior and mid-level engineers through technical design reviews, pair programming, and career progression frameworks.',
      ],
    },
    {
      id: 'exp-exp-2',
      jobTitle: 'Software Development Engineer II',
      company: 'Apex Cloud Systems',
      location: 'Austin, TX',
      startDate: '2020-08',
      endDate: '2022-12',
      isCurrent: false,
      description: 'Built high-throughput API gateways and internal developer tools.',
      highlights: [
        'Designed and deployed scalable <strong>GraphQL microservices</strong> handling 85,000 requests/sec with Redis caching layer.',
        'Reduced AWS infrastructure monthly spending by <strong>$32,000</strong> through database index tuning and Lambda concurrency right-sizing.',
        'Implemented rigorous CI/CD GitHub Actions pipelines with automated canary releases, decreasing release rollback rate to < 1%.',
      ],
    },
    {
      id: 'exp-exp-3',
      jobTitle: 'Software Engineer I',
      company: 'Vanguard Digital Labs',
      location: 'Austin, TX',
      startDate: '2018-06',
      endDate: '2020-07',
      isCurrent: false,
      description: 'Frontend and full-stack feature development for SaaS enterprise portal.',
      highlights: [
        'Constructed reusable React component library with <strong>WCAG 2.1 AA accessibility</strong> compliance used by 5 product teams.',
        'Refactored legacy monolith endpoints into modular REST APIs, improving overall system maintainability.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-exp-1',
      institution: 'University of Texas at Austin',
      degree: 'B.S. in Electrical and Computer Engineering',
      fieldOfStudy: 'Computer Systems Architecture',
      location: 'Austin, TX',
      startDate: '2014-08',
      endDate: '2018-05',
      gpa: '3.78 / 4.0',
      honors: 'Distinguished College Scholar',
    },
  ],
  skills: [
    {
      id: 'sk-exp-core',
      name: 'Programming & Languages',
      skills: ['TypeScript', 'JavaScript', 'Go', 'Python', 'SQL', 'HTML5 / CSS3'],
    },
    {
      id: 'sk-exp-fe',
      name: 'Frontend & Architecture',
      skills: ['React 19', 'Next.js (App Router)', 'Redux Toolkit', 'Tailwind CSS', 'Micro-frontends', 'Web Performance / Vitals'],
    },
    {
      id: 'sk-exp-be',
      name: 'Backend & Cloud',
      skills: ['Node.js', 'Express / NestJS', 'GraphQL', 'PostgreSQL', 'Redis', 'Apache Kafka', 'AWS (ECS, S3, RDS, Lambda)', 'Docker & Kubernetes'],
    },
    {
      id: 'sk-exp-practices',
      name: 'Practices & Leadership',
      skills: ['System Design', 'TDD / Automated Testing', 'CI/CD Pipelines', 'Technical Mentorship', 'Scrum / Agile'],
    },
  ],
  projects: [
    {
      id: 'proj-exp-1',
      title: 'OpenTelemetry Gateway Plugin',
      description:
        'Open-source distributed tracing extension for distributed gateway clusters. Downloaded 45,000+ times on npm.',
      technologies: ['TypeScript', 'OpenTelemetry', 'gRPC', 'Docker'],
      link: 'https://github.com/jordantaylor/otel-gateway',
      github: 'https://github.com/jordantaylor/otel-gateway',
      startDate: '2023-01',
      endDate: '2024-02',
    },
  ],
  certifications: [
    {
      id: 'cert-exp-1',
      name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      issuer: 'Amazon Web Services',
      issueDate: '2024',
      url: '',
    },
  ],
  languages: [
    { id: 'lang-exp-1', language: 'English', proficiency: 'Native / Bilingual' },
    { id: 'lang-exp-2', language: 'German', proficiency: 'Conversational' },
  ],
  achievements: [
    {
      id: 'ach-exp-1',
      title: 'Engineering Excellence Award — StripeWave',
      date: '2024',
      description: 'Awarded for zero-downtime migration of customer billing infrastructure.',
    },
  ],
  activeSections: {
    experience: true,
    projects: true,
    certifications: true,
    languages: true,
    achievements: true,
  },
};
