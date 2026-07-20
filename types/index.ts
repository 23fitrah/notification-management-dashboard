export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Entity CRUD demo: Product
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
}

export type ProductPayload = Omit<Product, "id">;
