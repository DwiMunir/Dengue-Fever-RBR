# 🚀 Quick Start - React Query Integration

## Setup Sudah Selesai ✅

React Query telah berhasil disetup dan terintegrasi dengan authentication flow.

## File-file Baru

```
src/
├── api/
│   └── authApi.js          # ✨ NEW - API client & endpoints
├── hooks/
│   └── useAuth.js          # ✨ NEW - React Query auth hooks
└── lib/
    └── queryClient.js      # ✨ NEW - Query client config
```

## Cara Menggunakan

### Login
```jsx
const loginMutation = useLogin();

loginMutation.mutate({ email, password });
// Auto redirect ke /dashboard jika success
// Auto toast notification
```

### Register
```jsx
const registerMutation = useRegister();

registerMutation.mutate({ name, email, password });
// Auto redirect ke /dashboard jika success
```

### Logout
```jsx
const logoutMutation = useLogout();

logoutMutation.mutate();
// Auto redirect ke / (landing page)
// Clear all cache
```

## Mock vs Real API

Saat ini menggunakan **mock implementation** (delay 1 detik).

Untuk menggunakan real API:
1. Buat file `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

2. Uncomment API calls di `src/api/authApi.js`

## Test Aplikasi

```bash
npm start
# Buka http://localhost:3000
```

- Login/Register akan berfungsi dengan mock data
- React Query DevTools tersedia di pojok kanan bawah
- Cek Network tab untuk melihat API calls (jika sudah real API)

## Dokumentasi Lengkap

Lihat `REACT_QUERY_SETUP.md` untuk dokumentasi detail.
