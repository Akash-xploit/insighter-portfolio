// Site content: every section on the page is rendered from this file.
// icon: "python" (devicon) | "si:splunk" (simpleicons) | "assets/x.svg" | "" (initials tile)
// Images: card covers 1600x900 (16:9), cert logos 512x512, photo 480x480.

window.SITE = {

  // profile
  profile: {
    name: "Akash Kukkala",
    handle: "in$1ghter",
    role: "Blue Team & Cloud Security Engineer",
    location: "College Park, Maryland",
    available: "Open to roles · December 2026",
    gpa: "3.9",
    photo: "assets/photo.jpg",
    bio: [
      "I'm a cybersecurity engineer finishing my MEng at the University of Maryland (3.9 GPA). I started out in penetration testing, breaking into web apps and APIs for clients, and that's exactly why I'm on the blue team now: I defend systems the way an attacker would probe them.",
      "Today I build and secure AWS environments: least-privilege access, encryption by default, and detection wired in from day one so nothing happens without a log and an alert.",
    ],
  },

  // now: ~/now line under the intro
  now: [
    "Building AWS Secure Vault",
    "Studying for CDSA & Security+",
    "Graduating December 2026",
  ],

  // links: buttons under the intro and in contact; url "" hides one, mailto copies
  links: [
    { label: "LinkedIn",    url: "https://www.linkedin.com/in/akashkukkala", icon: "linkedin" },
    { label: "GitHub",      url: "https://github.com/Akash-xploit",          icon: "github" },
    { label: "Résumé",      url: "assets/Akash_Kukkala_Resume.pdf",          icon: "resume" },
    { label: "Email",       url: "mailto:akash.kukkala@outlook.com",         icon: "email" },
    { label: "Linktree",    url: "",                                         icon: "si:linktree" },
    { label: "Hack The Box",url: "",                                         icon: "si:hackthebox" },
    { label: "Medium",      url: "",                                         icon: "si:medium" },
  ],

  // journey: hero timeline, oldest first. type: edu | work | cert | research | project | next
  journey: [
    { date: "Sep 2020", type: "edu",      title: "Started B.Tech in Cybersecurity",   detail: "Computer Science & Engineering at JNTU, India." },
    { date: "Sep 2022", type: "cert",     title: "Microsoft SC-900",                  detail: "First certification: security, compliance & identity fundamentals." },
    { date: "Sep 2022", type: "work",     title: "Penetration Testing Intern",        detail: "Web app and API pentests for Coincent clients: OWASP Top 10, Burp Suite, Metasploit." },
    { date: "Apr 2024", type: "research", title: "First paper published",             detail: "DDoS Attack Detection using Machine Learning, IJIRT." },
    { date: "May 2024", type: "edu",      title: "Graduated B.Tech",                  detail: "Moved from breaking systems toward defending them." },
    { date: "Nov 2024", type: "cert",     title: "Ethical Hacking Essentials",        detail: "EC-Council." },
    { date: "Dec 2024", type: "research", title: "Second paper published",            detail: "Keylogger Detection System, IJIRT." },
    { date: "Jan 2025", type: "edu",      title: "Started MEng at UMD",               detail: "Cybersecurity Engineering, University of Maryland. GPA 3.9." },
    { date: "May 2025", type: "project",  title: "Hardened an AWS e-commerce stack",  detail: "12+ critical issues found and fixed across IAM, VPC, EBS and logging." },
    { date: "Aug 2025", type: "project",  title: "Built an ML intrusion detector",    detail: "NSL-KDD, four classifiers, live Flask demo." },
    { date: "Sep 2025", type: "cert",     title: "eJPT",                              detail: "INE Security Junior Penetration Tester." },
    { date: "Feb 2026", type: "cert",     title: "AWS Cloud Practitioner",            detail: "Amazon Web Services." },
    { date: "2026",     type: "project",  title: "Building AWS Secure Vault",         detail: "Serverless, encrypted, with GuardDuty and real-time alerting. Also studying for CDSA and Security+." },
    { date: "Dec 2026", type: "next",     title: "MEng complete · ready for the blue team", detail: "Looking for SOC, DFIR, threat hunting and cloud security roles." },
  ],

  // contact form: FormSubmit (first submission sends an activation email). formEmail "" hides the form
  contact: {
    formEmail: "akash.kukkala@outlook.com",
    subject: "New message from your portfolio",
  },

  // skills: accent = tile color for skills without a logo
  skills: [
    {
      group: "Languages",
      accent: "#3fa9f5",
      items: [
        { name: "Python",     icon: "python" },
        { name: "C",          icon: "c" },
        { name: "Java",       icon: "java" },
        { name: "JavaScript", icon: "javascript" },
        { name: "HTML",       icon: "html5" },
        { name: "CSS",        icon: "css3" },
        { name: "SQL",        icon: "mysql" },
        { name: "Bash",       icon: "bash" },
        { name: "PHP",        icon: "php" },
      ],
    },
    {
      group: "Cloud · AWS",
      accent: "#ff9900",
      items: [
        { name: "AWS",            icon: "amazonwebservices/amazonwebservices-original-wordmark" },
        { name: "EC2",            icon: "" },
        { name: "S3",             icon: "" },
        { name: "IAM",            icon: "" },
        { name: "VPC",            icon: "" },
        { name: "Lambda",         icon: "" },
        { name: "KMS",            icon: "" },
        { name: "GuardDuty",      icon: "" },
        { name: "CloudTrail",     icon: "" },
        { name: "CloudWatch",     icon: "" },
        { name: "Cognito",        icon: "" },
        { name: "CloudFormation", icon: "" },
      ],
    },
    {
      group: "DevOps & Infrastructure",
      accent: "#a78bfa",
      items: [
        { name: "Terraform",      icon: "terraform" },
        { name: "Docker",         icon: "docker" },
        { name: "Kubernetes",     icon: "kubernetes" },
        { name: "GitHub Actions", icon: "githubactions" },
        { name: "Git",            icon: "git" },
        { name: "Linux",          icon: "linux" },
      ],
    },
    {
      group: "Security Tools",
      accent: "#ff6b6b",
      items: [
        { name: "Burp Suite",      icon: "si:burpsuite" },
        { name: "Wireshark",       icon: "si:wireshark" },
        { name: "Metasploit",      icon: "si:metasploit" },
        { name: "OWASP ZAP",       icon: "si:owasp" },
        { name: "Nmap",            icon: "" },
        { name: "Ghidra",          icon: "" },
        { name: "sqlmap",          icon: "" },
        { name: "Hydra",           icon: "" },
        { name: "John the Ripper", icon: "" },
      ],
    },
    {
      group: "SIEM & Monitoring",
      accent: "#3ddc97",
      items: [
        { name: "Splunk",             icon: "si:splunk" },
        { name: "Elastic Stack",      icon: "si:elasticstack" },
        { name: "Microsoft Sentinel", icon: "" },
        { name: "Wazuh",              icon: "" },
      ],
    },
  ],

  // currently learning: dashed strip at the bottom of ~/skills
  learning: [
    { name: "Jenkins",             icon: "jenkins" },
    { name: "Wazuh (hands-on)",    icon: "" },
    { name: "Microsoft Sentinel",  icon: "" },
    { name: "Splunk SPL",          icon: "si:splunk" },
  ],

  // projects: progress: 0-100 marks a project as in progress; status "Upcoming" for planned ones. image overrides flow
  projects: [
    {
      title: "AWS Secure Vault",
      status: "In progress",
      progress: 60,
      flow: ["Cognito", "API GW", "Lambda", "S3 · KMS"],
      summary: "A serverless file vault that encrypts everything it stores and alerts on every access, with GuardDuty, CloudTrail and SNS watching it.",
      tags: ["AWS", "Serverless", "Detection"],
      repo: "https://github.com/Akash-xploit/aws-secure-vault",
    },
    {
      title: "DDoS Attack Detection",
      status: "Aug 2025",
      flow: ["Traffic", "Features", "ML models", "Verdict"],
      summary: "An ML intrusion detection system that sorts network traffic into normal or four attack types, with a Flask app to test it live.",
      tags: ["Python", "Scikit-learn", "Flask"],
      repo: "https://github.com/Akash-xploit/DDoS-attack-detection",
    },
    {
      title: "AWS Security Hardening",
      status: "May 2025",
      flow: ["Assess", "Lock down", "Encrypt", "Monitor"],
      summary: "Found 12+ critical issues in an AWS e-commerce deployment, then fixed them: least-privilege IAM, locked-down SSH, KMS encryption and audit logging.",
      tags: ["AWS", "IAM", "Hardening"],
      repo: "",
    },
  ],

  // blog: newest first. progress marks a draft; sample: true tags a placeholder
  blogs: [
    // placeholder posts
    {
      title: "Catching SSH brute force on EC2 with GuardDuty and SNS",
      date: "Nov 2026",
      platform: "Medium",
      summary: "Walking through a GuardDuty finding from first alert to automatic containment, and what the CloudTrail logs showed along the way.",
      url: "",
      sample: true,
    },
    {
      title: "Lessons from hardening an AWS e-commerce stack",
      date: "Draft",
      platform: "Medium",
      summary: "The 12 misconfigurations I found in an OWASP Juice Shop deployment and how each one was fixed.",
      url: "",
      progress: 40,
      sample: true,
    },
  ],

  // experience & education: newest first
  experience: [
    {
      when: "Jan 2025 — Dec 2026",
      title: "MEng, Cybersecurity Engineering",
      org: "University of Maryland, College Park · GPA 3.9",
      points: [],
    },
    {
      when: "Sep 2022 — Nov 2023",
      title: "Penetration Testing Intern",
      org: "Coincent",
      points: [
        "Web app and API penetration tests against client environments, finding OWASP Top 10 issues like SQL injection, XSS and IDOR.",
        "Nmap reconnaissance and enumeration to map attack surfaces and uncover misconfigurations.",
        "Wrote client reports turning technical findings into risk-rated fixes.",
      ],
    },
    {
      when: "Sep 2020 — May 2024",
      title: "B.Tech, Computer Science (Cybersecurity)",
      org: "Jawaharlal Nehru Technological University",
      points: [],
    },
  ],

  // offense → defense
  offenseToDefense: [
    { offense: "Recon & enumeration with Nmap",        defense: "Know the attack surface first: AWS Config, security groups, CloudTrail" },
    { offense: "Exploiting OWASP Top 10 (SQLi, XSS, IDOR)", defense: "Detections and hardening built around real attack paths" },
    { offense: "Brute force & credential attacks",     defense: "MFA, lockouts and GuardDuty alerts on unusual sign-ins" },
    { offense: "Writing risk-rated pentest reports",   defense: "Clear incident write-ups that non-security people can act on" },
  ],

  // certifications: done: true = earned; planned: true = not started; url = credential link
  certifications: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Feb 2026", done: true,
      logo: "amazonwebservices/amazonwebservices-original-wordmark", url: "" },
    { name: "eJPT — Junior Penetration Tester",  issuer: "INE Security",        date: "Sep 2025", done: true,
      logo: "", url: "" },
    { name: "Ethical Hacking Essentials",        issuer: "EC-Council",          date: "Nov 2024", done: true,
      logo: "", url: "" },
    { name: "Microsoft SC-900",                  issuer: "Microsoft",           date: "Sep 2022", done: true,
      logo: "microsoft", url: "" },
    { name: "CDSA — Defensive Security Analyst", issuer: "Hack The Box",        date: "",         done: false,
      logo: "si:hackthebox", url: "" },
    { name: "CompTIA Security+",                 issuer: "CompTIA",             date: "",         done: false,
      logo: "si:comptia", url: "" },
  ],

  // research papers
  researchInterests: ["Intrusion detection", "ML for security", "Malware & credential theft", "Digital forensics", "Cloud threat detection"],

  papers: [
    {
      title: "Keylogger Detection System",
      venue: "IJIRT · Dec 2024",
      tags: ["Malware analysis", "Credential theft", "Forensics"],
      summary: "How keyloggers are used in credential theft, what they leave behind for forensics, and the dual-use line between offensive and defensive tooling.",
      url: "",
    },
    {
      title: "DDoS Attack Detection using Machine Learning",
      venue: "IJIRT · Apr 2024",
      tags: ["Machine learning", "Ensemble classifiers", "Network IDS"],
      summary: "A hybrid detection framework combining ensemble classifiers to identify malicious traffic and stay resilient against sophisticated attacks.",
      url: "",
    },
  ],
};
