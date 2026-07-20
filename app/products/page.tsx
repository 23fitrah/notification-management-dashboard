"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import ProductModal from "@/components/ProductModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { isAuthenticated } from "@/services/authService";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";
import { Product, ProductPayload } from "@/types";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }
    loadProducts();
  }, [router]);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      toast.error("Gagal memuat data produk");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setModalOpen(true);
  }

  async function handleSubmit(payload: ProductPayload) {
    try {
      if (editing) {
        const updated = await updateProduct(editing.id, payload);
        setProducts((prev) =>
          prev.map((p) => (p.id === editing.id ? updated : p))
        );
        toast.success("Produk berhasil diperbarui");
      } else {
        const created = await createProduct(payload);
        setProducts((prev) => [created, ...prev]);
        toast.success("Produk berhasil ditambahkan");
      }
      setModalOpen(false);
    } catch (err) {
      toast.error("Gagal menyimpan produk");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success("Produk berhasil dihapus");
      setDeleteTarget(null);
    } catch (err) {
      toast.error("Gagal menghapus produk");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Manajemen Produk
            </h1>
            <p className="text-sm text-slate-500">
              Kelola data produk kamu — tambah, ubah, dan hapus.
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600"
          >
            <Plus size={18} />
            Tambah Produk
          </button>
        </div>

        <div className="overflow-hidden rounded-xl2 border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-10 text-center text-sm text-slate-400">
              Memuat data...
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center gap-3 p-12 text-center text-slate-400">
              <Package size={36} />
              <p className="text-sm">Belum ada produk. Tambahkan yang pertama.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-50 text-brand-700">
                <tr>
                  <th className="px-6 py-3 font-semibold">Nama Produk</th>
                  <th className="px-6 py-3 font-semibold">Kategori</th>
                  <th className="px-6 py-3 font-semibold">Harga</th>
                  <th className="px-6 py-3 font-semibold">Stok</th>
                  <th className="px-6 py-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium text-slate-700">
                      {p.title}
                    </td>
                    <td className="px-6 py-3 text-slate-500">{p.category}</td>
                    <td className="px-6 py-3 text-slate-500">
                      Rp{p.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-3 text-slate-500">{p.stock}</td>
                    <td className="px-6 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="rounded-full p-2 text-brand-600 hover:bg-brand-50"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="rounded-full p-2 text-red-500 hover:bg-red-50"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <ProductModal
        open={modalOpen}
        initialData={editing}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Produk?"
        description={`Produk "${deleteTarget?.title}" akan dihapus secara permanen.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
