const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = RAW_API_URL.replace(/\/+$/, '');

export async function fetchApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('sfi_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    let res: Response;
    try {
      res = await fetch(url, {
        ...options,
        headers,
        cache: options.cache || 'no-store',
      });
    } catch (netErr: any) {
      // If fetching localhost failed in Node.js SSR (e.g. IPv6 vs IPv4 loopback mismatch on Windows), retry on 127.0.0.1
      if (url.includes('localhost') && typeof window === 'undefined') {
        const fallbackUrl = url.replace('localhost', '127.0.0.1');
        res = await fetch(fallbackUrl, {
          ...options,
          headers,
          cache: options.cache || 'no-store',
        });
      } else {
        throw netErr;
      }
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error(`API Error on ${url}:`, error?.message || error);
    throw error;
  }
}

export function buildWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
