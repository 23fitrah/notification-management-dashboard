# PulseNotify – Notification Management Dashboard

PulseNotify adalah aplikasi dashboard untuk membuat, mengelola, dan memantau notifikasi dalam satu tempat. Melalui dashboard ini, pengguna dapat mengakses pengelolaan notifikasi dan melihat aktivitas notifikasi secara lebih terpusat.

Aplikasi ini dikembangkan menggunakan Next.js dan React.

## Fitur

- **Notification Management** — membuat dan mengelola notifikasi melalui satu dashboard.

- **Notification Monitoring** — memantau aktivitas dan status notifikasi.

- **Real-Time Monitoring** — mendukung pemantauan notifikasi secara real-time.

- **Dashboard** — menyediakan tampilan terpusat untuk mengakses fitur pengelolaan notifikasi.

## Teknologi

- Next.js

- React

- JavaScript

- Node.js

- CSS Tailwind

## Struktur Project

```text

notification-management-dashboard/

├── app/                  # Halaman dan struktur aplikasi

├── components/           # Komponen antarmuka yang digunakan kembali

├── public/

│   └── assets/

│       └── img/          # Asset gambar

├── services/             # Service aplikasi

├── types/                # Definisi tipe data

├── .env.local.example    # Contoh konfigurasi environment

├── .gitignore

├── next-env.d.ts

├── next.config.js

├── package.json

├── package-lock.json

└── postcss.config.js

```

## Persyaratan

Pastikan perangkat sudah memiliki:

- Node.js

- npm

- Git

## Menjalankan Project

Clone repository:

```bash

git clone https://github.com/23fitrah/notification-management-dashboard.git

```

Masuk ke direktori project:

```bash

cd notification-management-dashboard

```

Install dependency:

```bash

npm install

```

Jika aplikasi membutuhkan environment variable, salin file contoh konfigurasi:

```bash

cp .env.local.example .env.local

```

Kemudian sesuaikan nilai environment variable dengan konfigurasi yang digunakan project.

Jalankan development server:

```bash

npm run dev

```

Buka aplikasi melalui browser:

```text

http://localhost:3000

```

## Build untuk Production

Buat production build:

```bash

npm run build

```

Jalankan aplikasi dalam mode production:

```bash

npm run start

```

## Live Application

Aplikasi yang sudah di-deploy dapat diakses melalui:

https://pulsenotify.vercel.app/login

## Repository

Source code tersedia di GitHub:

https://github.com/23fitrah/notification-management-dashboard

---

Developed by **23fitrah**