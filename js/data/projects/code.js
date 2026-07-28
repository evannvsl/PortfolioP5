export const projectCode = {
  id: 1,
  num: '01',
  category: 'code',
  title: 'CODE | DATA & SECURITY',
  subtitle: 'Web Security, Cryptography & High-Performance Systems',
  desc: 'Membangun sistem web & software yang aman dari bawah ke atas — arsitektur database, enkripsi data sensitif, penetration testing, dan pencegahan exploit.',
  tags: ['WEB', 'APPS', 'DATABASE', 'SECURITY', 'ETHICAL HACKING', 'BUG HUNTING', 'CRYPTOGRAPHY'],
  img: 'assets/img/futaba sakura.jpeg',
  securityTag: 'WASPADALAH',
  detail: {
    year: '2024 — NOW',
    role: 'Fullstack Developer & Security Researcher',
    overview:
      'Proyek di kategori ini mencakup pembuatan aplikasi web modern berskala enterprise dengan standar keamanan tinggi. Fokus utama terletak pada perlindungan data pengguna, arsitektur backend yang tangguh, penanganan celah keamanan (OWASP Top 10), serta pengujian penetrasi (penetration testing).',
    stack: ['JavaScript', 'TypeScript', 'Node.js', 'Express', 'Python', 'SQL', 'MySQL', 'PostgreSQL', 'JWT', 'bcrypt', 'AES-256', 'Docker'],
    highlights: [
      'Implementasi autentikasi multi-layer dengan JWT, Refresh Token & Rate Limiting',
      'Penetration testing & bug hunting berdasarkan panduan OWASP Top 10',
      'Enkripsi data sensitif pengguna end-to-end menggunakan AES-256-GCM',
      'Proteksi proaktif terhadap SQL Injection, XSS, CSRF & Remote Code Execution',
      'Perancangan REST API terstruktur dengan dokumentasi OpenAPI / Swagger'
    ],
    items: [
      {
        title: 'Secure E-Commerce & Payment Gateway API',
        role: 'Lead Backend Engineer',
        year: '2024',
        stack: ['Node.js', 'Express', 'MySQL', 'JWT', 'Redis'],
        summary: 'Backend API e-commerce terenkripsi dengan proteksi transaksi finansial & pencegahan double-spending.',
        details: 'Merancang API backend transaksi tinggi menggunakan Node.js dan MySQL. Dilengkapi enkripsi payload AES-256, autentikasi dua faktor, serta integrasi Redis caching untuk response time cepat.',
        link: 'https://github.com/evannvsl'
      },
      {
        title: 'Vulnerability Scanner & Network Recon Toolkit',
        role: 'Security Researcher',
        year: '2024',
        stack: ['Python', 'Scapy', 'Socket', 'CLI', 'Nmap API'],
        summary: 'Tool otomatisasi audit keamanan jaringan & pemindaian port untuk mendeteksi service berisiko.',
        details: 'Toolkit berbasis Python CLI untuk melakukan port scanning multi-threaded, banner grabbing, dan penilaian kerentanan awal pada server web lokal maupun publik.',
        link: 'https://github.com/evannvsl'
      },
      {
        title: 'Zero-Knowledge Encrypted Storage Vault',
        role: 'Developer',
        year: '2023',
        stack: ['Python', 'Cryptography', 'SHA-256', 'RSA'],
        summary: 'Sistem penyimpanan dokumen terenkripsi dengan arsitektur Zero-Knowledge Architecture.',
        details: 'Aplikasi vault di mana kunci dekripsi disimpan sepenuhnya di sisi klien. Kunci publik RSA digunakan untuk pembagian dokumen aman antar pengguna.',
        link: 'https://github.com/evannvsl'
      }
    ],
    links: { github: 'https://github.com/evannvsl', live: '#' }
  }
};
