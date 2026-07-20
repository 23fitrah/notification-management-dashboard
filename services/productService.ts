import api from "./api";
import { Product, ProductPayload } from "@/types";

// Ganti "/posts" dengan endpoint resource kamu, misal "/products"
const RESOURCE = "/posts";

// Helper: JSONPlaceholder tidak punya field category/price/stock,
// jadi kita mapping supaya tetap bisa didemokan dengan data dummy yang konsisten.
function mapToProduct(item: any, index: number): Product {
  return {
    id: item.id,
    title: item.title ?? `Produk ${item.id}`,
    category: ["Elektronik", "Fashion", "Makanan", "Kesehatan"][index % 4],
    price: 50000 + ((item.id * 3750) % 450000),
    stock: (item.id * 7) % 100,
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get(RESOURCE, { params: { _limit: 12 } });
  return Array.isArray(data) ? data.map(mapToProduct) : [];
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get(`${RESOURCE}/${id}`);
  return mapToProduct(data, id);
}

export async function createProduct(payload: ProductPayload): Promise<Product> {
  const { data } = await api.post(RESOURCE, payload);
  return mapToProduct({ ...payload, id: data.id ?? Date.now() }, data.id ?? 0);
}

export async function updateProduct(
  id: number,
  payload: ProductPayload
): Promise<Product> {
  const { data } = await api.put(`${RESOURCE}/${id}`, payload);
  return mapToProduct({ ...payload, id }, id);
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`${RESOURCE}/${id}`);
}
