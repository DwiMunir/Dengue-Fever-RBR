# React Query Setup Documentation

## 📦 Instalasi

React Query (TanStack Query) telah berhasil diinstall dan dikonfigurasi dalam project ini.

### Package yang Diinstall:
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools --legacy-peer-deps
```

## 🏗️ Struktur File

```
src/
├── api/
│   └── authApi.js          # API client & auth endpoints
├── hooks/
│   └── useAuth.js          # React Query hooks untuk authentication
├── lib/
│   └── queryClient.js      # Query Client configuration
└── App.js                   # QueryClientProvider setup
```

## 📝 File-file yang Dibuat

### 1. `src/lib/queryClient.js`
Konfigurasi Query Client dengan default options:
- `staleTime`: 5 menit
- `cacheTime`: 10 menit
- `refetchOnWindowFocus`: false
- `retry`: 1

### 2. `src/api/authApi.js`
API client menggunakan Axios dengan:
- Base URL dari environment variable
- Request interceptor untuk auth token
- Response interceptor untuk error handling
- Auth API functions: `login`, `register`, `logout`, `getProfile`
- **Note**: Saat ini menggunakan mock implementation, uncomment kode API call ketika backend sudah siap

### 3. `src/hooks/useAuth.js`
Custom hooks untuk authentication:
- `useLogin()` - Login mutation
- `useRegister()` - Register mutation
- `useLogout()` - Logout mutation
- `useProfile()` - Fetch user profile query

## 🔧 Cara Menggunakan

### Login
```jsx
import { useLogin } from '@/hooks/useAuth';

function LoginPage() {
  const loginMutation = useLogin();

  const handleSubmit = (credentials) => {
    loginMutation.mutate({
      email: credentials.email,
      password: credentials.password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

### Register
```jsx
import { useRegister } from '@/hooks/useAuth';

function RegisterPage() {
  const registerMutation = useRegister();

  const handleSubmit = (data) => {
    registerMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  // Similar usage as login
}
```

### Logout
```jsx
import { useLogout } from '@/hooks/useAuth';

function Navbar() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <button onClick={handleLogout} disabled={logoutMutation.isPending}>
      Logout
    </button>
  );
}
```

### Get User Profile
```jsx
import { useProfile } from '@/hooks/useAuth';

function Dashboard() {
  const { data, isLoading, error } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Welcome, {data?.name}</div>;
}
```

## 🎯 Features

### Auto Navigation
- Login/Register: Otomatis redirect ke `/dashboard` setelah success
- Logout: Otomatis redirect ke `/` setelah success

### Auto Toast Notification
- Success messages untuk login/register/logout
- Error messages dengan error details dari API

### Query Invalidation
- Setelah login/register, user profile query di-invalidate
- Memastikan data user selalu up-to-date

### Loading States
- `isPending` untuk menampilkan loading indicator
- Disable button saat mutation sedang berjalan

### Error Handling
- Error dari API ditampilkan via toast notification
- 401 Unauthorized otomatis redirect ke login page

## 🔌 Backend Integration

Saat ini menggunakan **mock implementation**. Untuk mengintegrasikan dengan backend:

1. Set environment variable di `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

2. Di `src/api/authApi.js`, uncomment bagian API call dan hapus mock implementation:
   ```javascript
   // Hapus mock Promise
   // Uncomment kode ini:
   const response = await apiClient.post('/auth/login', credentials);
   return response.data;
   ```

3. Sesuaikan response structure dengan backend API Anda

## 🛠️ React Query DevTools

DevTools sudah diaktifkan (hanya di development mode):
- Tekan button floating di pojok kanan bawah untuk membuka
- Lihat status query, cache, dan mutations
- Debug query lifecycle

## 📊 Query Keys Convention

```javascript
export const authKeys = {
  all: ['auth'],
  profile: () => [...authKeys.all, 'profile'],
};
```

Gunakan convention ini untuk membuat query keys yang konsisten.

## 🎨 Integration dengan Existing Code

File-file yang sudah diupdate:
- ✅ `src/App.js` - Added QueryClientProvider
- ✅ `src/pages/LoginPage.jsx` - Using useLogin hook
- ✅ `src/pages/RegisterPage.jsx` - Using useRegister hook
- ✅ `src/components/Navbar.jsx` - Using useLogout hook
- ✅ `src/i18n/locales/id.json` - Added new translation keys
- ✅ `src/i18n/locales/en.json` - Added new translation keys

## 📚 Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)

## 🚀 Next Steps

1. Buat backend API untuk authentication
2. Update `authApi.js` dengan real API calls
3. Tambahkan React Query hooks untuk test management:
   - `useTests()` - Fetch all tests
   - `useTest(id)` - Fetch single test
   - `useCreateTest()` - Create new test
   - `useDeleteTest()` - Delete test
4. Implementasi optimistic updates untuk better UX
5. Add pagination untuk test history
