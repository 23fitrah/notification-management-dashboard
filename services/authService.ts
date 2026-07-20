import Cookies from "js-cookie";
import api from "./api";
import { LoginPayload, LoginResponse } from "@/types";

const AUTH_ENDPOINT = process.env.NEXT_PUBLIC_AUTH_ENDPOINT || "/auth/login";
const IS_DEMO_API = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://jsonplaceholder.typicode.com"
).includes("jsonplaceholder.typicode.com");

/**
 * Login ke backend RESTful API.
 *
 * Ganti AUTH_ENDPOINT di .env.local sesuai endpoint auth backend kamu.
 * Backend diharapkan mengembalikan bentuk: { token: string, user: {...} }
 *
 * NOTE: JSONPlaceholder (API demo default) tidak punya endpoint auth beneran,
 * jadi ada fallback simulasi supaya UI & alur login tetap bisa dicoba.
 * Hapus blok IS_DEMO_API di bawah kalau backend kamu sudah siap.
 */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>(AUTH_ENDPOINT, payload);
    Cookies.set("token", data.token, { expires: 1 });
    Cookies.set("user", JSON.stringify(data.user), { expires: 1 });
    return data;
  } catch (err) {
    if (IS_DEMO_API) {
      // Fallback demo: simulasikan login sukses agar CRUD bisa dicoba tanpa backend auth asli
      const mockUser = { id: 1, name: "Demo User", email: payload.email };
      const mockToken = "demo-token-" + Date.now();
      Cookies.set("token", mockToken, { expires: 1 });
      Cookies.set("user", JSON.stringify(mockUser), { expires: 1 });
      return { token: mockToken, user: mockUser };
    }
    throw err;
  }
}

export function logout() {
  Cookies.remove("token");
  Cookies.remove("user");
}

export function getCurrentUser() {
  const raw = Cookies.get("user");
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return !!Cookies.get("token");
}
