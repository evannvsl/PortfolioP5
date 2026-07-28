export const projectHardware = {
  id: 2,
  num: '02',
  category: 'hardware',
  title: 'TECH & HARDWARE',
  subtitle: 'Embedded Systems, Custom Robotics & Hardware Fabrication',
  desc: 'Eksplorasi dari diagram skematik hingga produk fisik — menggabungkan pemrograman mikrokontroler, 3D printing, fabrikasi PCB, dan integrasi sensor IoT.',
  tags: ['ARDUINO', 'ESP32', 'MICROCONTROLLER', 'ELECTRONICS', 'ROBOTICS', 'PCB DESIGN', '3D PRINTING', 'IoT'],
  img: 'assets/img/gif/kid.gif',
  securityTag: 'BERSIAPLAH',
  detail: {
    year: '2023 — NOW',
    role: 'Hardware Engineer & Programmer',
    overview:
      'Bidang ini merupakan wujud nyata integrasi software dengan dunia fisik. Mempelajari logika sirkuit, penyolderan presisi, desain PCB custom dengan KiCad/Eagle, pembuatan komponen fisik melalui 3D Printing, serta pemrograman firmware menggunakan C/C++ dan Python.',
    stack: ['Arduino', 'ESP32', 'C/C++', 'Python', 'KiCad PCB', 'Fusion 360', 'Raspberry Pi', 'MQTT', 'Soldering'],
    highlights: [
      'Desain & fabrikasi PCB custom untuk modul kontroler terintegrasi',
      'Pemrograman firmware real-time untuk pembacaan sensor & kendali motor',
      'Perancangan 3D CAD & pencetakan komponen presisi dengan 3D Printer',
      'Integrasi protokol komunikasi nirkabel (MQTT, ESP-NOW, NRF24L01)',
      'Pengujian konsumsi daya rendah (low-power management) pada perangkat IoT battery-powered'
    ],
    items: [
      {
        title: 'Autonomous Obstacle-Avoiding Mobile Robot',
        role: 'Hardware Lead',
        year: '2024',
        stack: ['Arduino', 'C++', 'Ultrasonic Sensors', 'L298N', '3D Print'],
        summary: 'Robot navigasi otonom dengan algoritma penghindar rintangan dan kendali PWM presisi.',
        details: 'Membuat robot dua roda berbasis Arduino Uno yang dilengkapi dengan sensor ultrasonik pan-tilt servo untuk pemetaan jarak secara real-time dan perhitungan jalur bebas hambatan.',
        link: 'https://github.com/evannvsl'
      },
      {
        title: 'Smart Home IoT Air Quality & Climate Station',
        role: 'Embedded Developer',
        year: '2023',
        stack: ['ESP32', 'DHT22', 'MQ-135', 'MQTT', 'Web Dashboard'],
        summary: 'Stasiun monitoring kualitas udara dan cuaca ruangan dengan transmisi data telemetry ke cloud.',
        details: 'Stasiun IoT kecil berbasis ESP32 yang mengirimkan suhu, kelembaban, dan gas CO2 ke broker MQTT dengan tampilan dashboard web real-time.',
        link: 'https://github.com/evannvsl'
      },
      {
        title: 'Custom Mechanical Keyboard PCB & Firmware',
        role: 'PCB & Firmware Designer',
        year: '2023',
        stack: ['Eagle PCB', 'ATmega32U4', 'C++', 'QMK', 'Soldering'],
        summary: 'Desain skematik PCB keyboard mekanik 60% custom dengan firmware QMK tersuai.',
        details: 'Merancang tata letak PCB matrix switch, melakukan penyolderan komponen SMD, dan mengunggah firmware kustom untuk makro dan efek pencahayaan.',
        link: 'https://github.com/evannvsl'
      }
    ],
    links: { github: 'https://github.com/evannvsl', live: '#' }
  }
};
