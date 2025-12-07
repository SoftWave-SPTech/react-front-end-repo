const TOKEN_COOKIE_KEYS = ['jwt'];
const DEFAULT_API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:8080';

function getCookieValue(name) {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie ? document.cookie.split('; ') : [];

  const [key, ...rest] = cookies.split('=');
  if (key === name) {
    return decodeURIComponent(rest.join('='));
  }
  return null;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function getAuthToken() {
  const value = getCookie('jwt');
  if (value) {
    return value;
  }
  
  return null;
}

function decodeBase64UrlSegment(segment) {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const remainder = base64.length % 4;
  const padded = remainder === 0 ? base64 : base64 + '='.repeat(4 - remainder);

  if (typeof globalThis !== 'undefined' && typeof globalThis.atob === 'function') {
    return globalThis.atob(padded);
  }

  if (typeof globalThis !== 'undefined' && globalThis.Buffer) {
    return globalThis.Buffer.from(padded, 'base64').toString('binary');
  }

  throw new Error('Ambiente sem suporte a decodificacao base64.');
}

function decodeJwt(token) {
  try {
    const segments = token.split('.');
    if (segments.length < 2) return null;

    const payloadSegment = segments[1];
    const decoded = decodeBase64UrlSegment(payloadSegment);
    const json = decodeURIComponent(
      decoded
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    return JSON.parse(json);
  } catch (error) {
    console.error('Erro ao decodificar token JWT:', error);
    return null;
  }
}

function normalizeRole(payload) {
  if (!payload) return null;
  // if (typeof payload.role === 'string') {
  //   return payload.role;
  // }
  // Handle authorities as string (como vem no JWT fornecido)
  if (typeof payload.authorities === 'string') {
    return payload.authorities;
  }

  return null;
}

function buildPhotoUrl(path) {
  if (!path || path === 'null') return null;

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const base = DEFAULT_API_BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\/+/, '');
  return `${base}/${clean}`;
}

export function getAuthUser() {
  const token = getAuthToken();
  if (!token){
    return null;
  }  

  const payload = decodeJwt(token);
  if (!payload) return null;

  const photo = payload.fotoPerfil ?? payload.foto ?? payload.avatar ?? null;
  const role = normalizeRole(payload);

  return {
    token,
    id: payload.id ?? payload.userId ?? null,
    email: payload.email ?? payload.sub ?? null,
    nome: payload.nome ?? payload.name ?? payload.fullName ?? null,
    role: role ?? null,
    tipoUsuario: payload.tipoUsuario ?? payload.userType ?? null,
    foto: photo,
    fotoUrl: buildPhotoUrl(photo),
    exp: payload.exp ?? null,
    raw: payload,
  };
}

export function getAuthField(field) {
  const user = getAuthUser();
  if (!user) return null;

  if (field in user) {
    return user[field];
  }

  return user.raw?.[field] ?? null;
}

export function getAuthProfilePhoto() {
  const user = getAuthUser();
  return user?.fotoUrl ?? null;
}

export function isTokenExpired() {
  const user = getAuthUser();
  if (!user?.exp) return false;

  const now = Math.floor(Date.now() / 1000);
  return user.exp <= now;
}

export function syncAuthSessionFromCookie() {
  if (typeof window === 'undefined' || typeof window.sessionStorage === 'undefined') return;

  const user = getAuthUser();
  const AUTH_KEYS = ['token', 'id', 'email', 'nome', 'role', 'tipoUsuario', 'fotoPerfil'];

  if (!user) {
    AUTH_KEYS.forEach((key) => {
      window.sessionStorage.removeItem(key);
    });
    return;
  }

  window.sessionStorage.setItem('token', user.token);
  window.sessionStorage.setItem('id', user.id != null ? String(user.id) : '');
  window.sessionStorage.setItem('email', user.email ?? '');
  window.sessionStorage.setItem('nome', user.nome ?? '');
  window.sessionStorage.setItem('role', (user.role ?? '').toUpperCase());
  window.sessionStorage.setItem('tipoUsuario', user.tipoUsuario ?? '');
  window.sessionStorage.setItem('fotoPerfil', user.fotoUrl ?? `${DEFAULT_API_BASE_URL.replace(/\/$/, '')}/null`);
}

let authSyncInitialized = false;

export function initializeAuthSync() {
  if (authSyncInitialized) return;
  authSyncInitialized = true;

  const synchronize = () => {
    try {
      syncAuthSessionFromCookie();
    } catch (error) {
      console.error('Erro ao sincronizar sessionStorage com o cookie JWT:', error);
    }
  };

  synchronize();

  if (typeof window !== 'undefined') {
    window.addEventListener('focus', synchronize);
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        synchronize();
      }
    });
  }
}

export function clearAuthData() {
  if (typeof document !== 'undefined') {
    TOKEN_COOKIE_KEYS.forEach((key) => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }

  if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
    const AUTH_KEYS = ['token', 'id', 'email', 'nome', 'role', 'tipoUsuario', 'fotoPerfil'];
    AUTH_KEYS.forEach((key) => window.sessionStorage.removeItem(key));
  }
}
