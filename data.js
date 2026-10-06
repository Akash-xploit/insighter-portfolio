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
    photo: "assets/photo.jpg",
    bio: [
      "I'm a cybersecurity engineer finishing my MEng at the University of Maryland (3.9 GPA). I started out in penetration testing, breaking into web apps and APIs for clients, and that's exactly why I'm on the blue team now: I defend systems the way an attacker would probe them.",
      "Today I build and secure AWS environments: least-privilege access, encryption by default, and detection wired in from day one so nothing happens without a log and an alert.",
    ],
  },

  // links: buttons under the intro and in contact; url "" hides one, mailto copies
  links: [
    { label: "LinkedIn",    url: "https://www.linkedin.com/in/akashkukkala", icon: "linkedin" },
    { label: "GitHub",      url: "https://github.com/Akash-xploit",          icon: "github" },
    { label: "Résumé",      url: "assets/Akash_Kukkala_Resume.pdf",          icon: "resume" },
    { label: "Email",       url: "mailto:akash.kukkala@outlook.com",         icon: "email" },
    { label: "Linktree",    url: "https://linktr.ee/akashkukkala",           icon: "si:linktree" },
    { label: "Hack The Box",url: "https://profile.hackthebox.com/profile/019d450d-9db9-70f8-86ce-40ce946a963e?utm_medium=copy_url",              icon: "si:hackthebox" },
    { label: "Medium",      url: "https://medium.com/@insighter9",           icon: "si:medium" },
  ],

  // journey: hero timeline, oldest first. type: edu | work | cert | research | project | next
  journey: [
    { date: "Sep 2020", type: "edu",      title: "Started B.Tech in Cybersecurity",   detail: "Computer Science & Engineering at JNTU, India." },
    { date: "Sep 2022", type: "cert",     title: "Microsoft SC-900",                  detail: "First certification: security, compliance & identity fundamentals." },
    { date: "Sep 2022", type: "work",     title: "Penetration Testing Intern",        detail: "Pentested 13 vulnerable web apps and APIs at Coincent: OWASP Top 10, Burp Suite, Metasploit." },
    { date: "Apr 2024", type: "project",  title: "Built an ML intrusion detector",    detail: "NSL-KDD, 6 classifiers benchmarked; Random Forest at 99.5% accuracy." },
    { date: "Apr 2024", type: "research", title: "First paper published",             detail: "DDoS Attack Detection using Machine Learning, IJIRT." },
    { date: "May 2024", type: "edu",      title: "Graduated B.Tech",                  detail: "Moved from breaking systems toward defending them." },
    { date: "Nov 2024", type: "cert",     title: "Ethical Hacking Essentials",        detail: "TryHackMe." },
    { date: "Dec 2024", type: "research", title: "Second paper published",            detail: "Keylogger Detection System, IJIRT." },
    { date: "Jan 2025", type: "edu",      title: "Started MEngg. at UMD",             detail: "Cybersecurity Engineering, University of Maryland." },
    { date: "May 2025", type: "project",  title: "Hardened an AWS E-Commerce stack",  detail: "20+ CVSS-rated vulnerabilities found and fixed, mapped to CIS and NIST 800-53." },
    { date: "Sep 2025", type: "cert",     title: "eJPT",                              detail: "INE Security Junior Penetration Tester." },
    { date: "Dec 2025", type: "project",  title: "Malware forensic investigation",    detail: "Three malware variants traced from a disk image to a hidden VeraCrypt payload." },
    { date: "Feb 2026", type: "cert",     title: "AWS Cloud Practitioner",            detail: "Amazon Web Services." },
    { date: "April 2026",type: "project",  title: "Building AWS Secure Vault",        detail: "Zero Trust serverless vault with GuardDuty alerting, built in Terraform." },
    { date: "Dec 2026", type: "next",     title: "Graduated M.Engg at UMD",           detail: "Looking for SOC, DFIR, threat hunting and cloud security roles." },
  ],

  // contact form: FormSubmit (first submission sends an activation email). formEmail "" hides the form
  contact: {
    formEmail: "akash.kukkala@outlook.com",
    subject: "New message from your portfolio",
  },

  // skills: accent = tile color for skills without a logo
  skills: [
    {
      group: "Cloud & Infrastructure",
      accent: "#ff9900",
      items: [
        { name: "AWS",            icon: "amazonwebservices/amazonwebservices-original-wordmark" },
        { name: "IAM",            icon: "" },
        { name: "KMS",            icon: "" },
        { name: "VPC",            icon: "" },
        { name: "CloudTrail",     icon: "" },
        { name: "GuardDuty",      icon: "" },
        { name: "Security Hub",   icon: "" },
        { name: "Config",         icon: "" },
        { name: "CloudWatch",     icon: "" },
        { name: "S3",             icon: "" },
        { name: "Lambda",         icon: "" },
        { name: "CSPM",           icon: "" },
        { name: "Terraform",      icon: "terraform" },
        { name: "CloudFormation", icon: "" },
        { name: "Docker",         icon: "docker" },
        { name: "Kubernetes",     icon: "kubernetes" },
        { name: "VMware",         icon: "si:vmware" },
        { name: "Hyper-V",        icon: "" },
        { name: "Linux",          icon: "linux" },
        { name: "Windows",        icon: "windows11/windows11-original" },
      ],
    },
    {
      group: "Analysis & Response",
      accent: "#3ddc97",
      items: [
        { name: "Incident Response (PICERL)", icon: "" },
        { name: "Threat Hunting",           icon: "" },
        { name: "KQL",                      icon: "" },
        { name: "SPL",                      icon: "" },
        { name: "Detection Engineering",    icon: "" },
        { name: "Sigma",                    icon: "" },
        { name: "YARA",                     icon: "" },
        { name: "Threat Detection",         icon: "" },
        { name: "Log Analysis",             icon: "" },
        { name: "Disk Forensics",           icon: "" },
        { name: "Memory Forensics",         icon: "" },
        { name: "Network Forensics",        icon: "" },
        { name: "Chain of Custody",         icon: "" },
        { name: "Vulnerability Management", icon: "" },
      ],
    },
    {
      group: "Security Tools",
      accent: "#ff6b6b",
      items: [
        { name: "Splunk",     icon: "si:splunk" },
        { name: "Wazuh",      icon: "" },
        { name: "Snort",      icon: "si:snort" },
        { name: "Nessus",     icon: "" },
        { name: "Wireshark",  icon: "si:wireshark" },
        { name: "Nmap",       icon: "" },
        { name: "Burp Suite", icon: "si:burpsuite" },
        { name: "Metasploit", icon: "si:metasploit" },
        { name: "OWASP ZAP",  icon: "si:owasp" },
        { name: "sqlmap",     icon: "" },
        { name: "Ghidra",     icon: "" },
      ],
    },
    {
      group: "Forensics",
      accent: "#a78bfa",
      items: [
        { name: "Volatility",       icon: "" },
        { name: "Autopsy",          icon: "" },
        { name: "The Sleuth Kit",   icon: "" },
        { name: "FTK Imager",       icon: "" },
        { name: "SIFT Workstation", icon: "" },
        { name: "RegRipper",        icon: "" },
        { name: "Plaso",            icon: "" },
      ],
    },
    {
      group: "Scripting & Frameworks",
      accent: "#3fa9f5",
      items: [
        { name: "Python (Boto3)", icon: "python" },
        { name: "Bash",           icon: "bash" },
        { name: "PowerShell",     icon: "powershell" },
        { name: "Go",             icon: "go" },
        { name: "SQL",            icon: "mysql" },
        { name: "MITRE ATT&CK",   icon: "" },
        { name: "NIST CSF",       icon: "" },
        { name: "OWASP Top 10",   icon: "si:owasp" },
        { name: "CVSS",           icon: "" },
      ],
    },
  ],

  // projects: progress: 0-100 marks a project as in progress; status "Upcoming" for planned ones. image overrides flow
  projects: [
    {
      title: "AWS Secure Vault",
      status: "In progress",
      progress: 60,
      flow: ["Cognito", "API GW", "Lambda", "S3 · KMS"],
      summary: "A Zero Trust serverless file vault: KMS-encrypted S3, least-privilege IAM per Lambda and Cognito JWT auth, with GuardDuty, CloudTrail and 5 CloudWatch alarms sending real-time SNS alerts. Built entirely in Terraform.",
      tags: ["AWS", "Terraform", "Detection"],
      repo: "https://github.com/Akash-xploit/aws-secure-vault",
    },
    {
      title: "Malware Forensic Investigation",
      status: "Dec 2025",
      flow: ["Disk image", "Dynamic analysis", "Decode key", "Payload"],
      summary: "Analyzed three malware variants from a suspect's disk image, decoded a Base64 key from captured traffic to unlock a VeraCrypt container disguised as an MP3, and wrote a forensic report with 18 evidence exhibits.",
      tags: ["Wireshark", "Autopsy", "DFIR"],
      repo: "",
    },
    {
      title: "AWS Security Hardening",
      status: "May 2025",
      flow: ["Assess", "Lock down", "Encrypt", "Monitor"],
      summary: "Assessed an AWS e-commerce platform across 6 domains, found 20+ CVSS-rated vulnerabilities including a 10.0 wildcard IAM policy, and remediated them against CIS AWS Benchmark and NIST SP 800-53.",
      tags: ["AWS", "IAM", "Compliance"],
      repo: "",
    },
    {
      title: "DDoS Attack Detection",
      status: "Apr 2024",
      flow: ["NSL-KDD", "Features", "ML models", "Verdict"],
      summary: "An ML intrusion detection system on 148K NSL-KDD records. A stacked LSTM reached 98.9% accuracy, and Random Forest led 6 benchmarked classifiers at 99.5% with a 0.35% false-positive rate.",
      tags: ["Python", "Scikit-learn", "LSTM"],
      repo: "https://github.com/Akash-xploit/DDoS-attack-detection",
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
      when: "Sep 2022 — Feb 2023",
      title: "Penetration Testing Intern",
      org: "Coincent",
      points: [
        "Pentested 13 intentionally vulnerable web applications and APIs, exploiting OWASP Top 10 issues including SQL injection, XSS and IDOR with Burp Suite, OWASP ZAP and Metasploit.",
        "Ran Nmap reconnaissance and service enumeration to map attack surfaces and find misconfigured services.",
        "Wrote penetration test reports with reproduction steps, proof-of-concept evidence, business impact and remediation, mapped to OWASP Top 10.",
      ],
    },
    {
      when: "Sep 2020 — May 2024",
      title: "B.Tech, Computer Science (Cybersecurity)",
      org: "Jawaharlal Nehru Technological University · GPA 3.5",
      points: [],
    },
  ],

  // certifications: done: true = earned; planned: true = not started; url = credential link
  certifications: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Feb 2026", done: true,
      logo: "amazonwebservices/amazonwebservices-original-wordmark", url: "" },
    { name: "eJPT — Junior Penetration Tester",  issuer: "INE Security",        date: "Sep 2025", done: true,
      logo: "", url: "" },
    { name: "Ethical Hacking Essentials",        issuer: "TryHackMe",           date: "Nov 2024", done: true,
      logo: "", url: "" },
    { name: "Microsoft SC-900",                  issuer: "Microsoft",           date: "Sep 2022", done: true,
      logo: "microsoft", url: "" },
    { name: "CDSA — Defensive Security Analyst", issuer: "Hack The Box",        date: "",         done: false,
      logo: "si:hackthebox", url: "" },
    { name: "CompTIA Security+",                 issuer: "CompTIA",             date: "",         done: false,
      logo: "si:comptia", url: "" },
  ],

  // research papers
  papers: [
    {
      title: "Keylogger Detection System",
      venue: "IJIRT · Dec 2024",
      summary: "How keyloggers are used in credential theft, what they leave behind for forensics, and the dual-use line between offensive and defensive tooling.",
      url: "",
    },
    {
      title: "DDoS Attack Detection using Machine Learning",
      venue: "IJIRT · Apr 2024",
      summary: "A hybrid detection framework combining ensemble classifiers to identify malicious traffic and stay resilient against sophisticated attacks.",
      url: "",
    },
  ],
};
