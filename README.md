# Next.js CRUD App (RESTful API)

Aplikasi CRUD sederhana dengan Next.js 14 (App Router) + TypeScript + Tailwind CSS,
terhubung ke RESTful API lewat service layer (axios). Halaman login mengikuti desain
"Sign in to Account" (tema hijau, split panel).

## Fitur

- Halaman **Login** (email/password, sesuai desain referensi)
- Halaman **CRUD Produk**: list, tambah, edit, hapus
- Service layer terpisah (`services/`) yang memanggil RESTful API via axios
- Token disimpan di cookie, otomatis disisipkan ke setiap request
- Proteksi halaman: redirect ke `/login` jika belum login
- Notifikasi sukses/gagal (react-hot-toast)

## Struktur Folder

```
app/
  layout.tsx          # root layout
  page.tsx            # redirect ke /login atau /products
  login/page.tsx       # halaman login
  products/page.tsx    # halaman CRUD produk
components/
  Navbar.tsx
  ProductModal.tsx      # form tambah/edit (modal)
  ConfirmDialog.tsx      # konfirmasi hapus
  ToastProvider.tsx
services/
  api.ts               # axios instance + interceptor token
  authService.ts        # login/logout
  productService.ts      # CRUD produk ke REST API
types/
  index.ts             # tipe data (User, Product, dll)
```

## Instalasi

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Buka http://localhost:3000

## Menghubungkan ke REST API Kamu Sendiri

Secara default, project ini memakai **JSONPlaceholder** (`https://jsonplaceholder.typicode.com`)
sebagai API demo supaya bisa langsung dicoba tanpa setup backend. Data di API ini
**tidak benar-benar tersimpan** (hanya simulasi response).

Untuk menyambungkan ke API asli kamu:

1. Buka `.env.local`, ubah:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://api-kamu.com/api
   NEXT_PUBLIC_AUTH_ENDPOINT=/auth/login
   ```
2. Di `services/productService.ts`, ganti `RESOURCE = "/posts"` menjadi endpoint resource
   kamu, misalnya `"/products"`, dan sesuaikan field pada `mapToProduct` dengan skema
   response API kamu.
3. Di `services/authService.ts`, hapus/rapikan blok fallback `IS_DEMO_API` karena itu
   hanya simulasi login untuk demo dengan JSONPlaceholder. Backend asli kamu diharapkan
   mengembalikan `{ token, user }` dari endpoint login.

## Build untuk Production

```bash
npm run build
npm start
```

## Kustomisasi Tema

Warna hijau utama diatur di `tailwind.config.ts` pada `theme.extend.colors.brand`
(default `#3cb878`). Ubah nilai di situ untuk mengganti seluruh nuansa warna aplikasi.
