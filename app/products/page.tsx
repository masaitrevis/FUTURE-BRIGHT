"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Package,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
  });
  const [message, setMessage] = useState("");

  const categories = [
    "Executive Transport",
    "Driver Training",
    "Corporate Services",
    "Hospitality",
    "Property",
    "Education",
    "Other",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.error || "Failed to fetch products");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const body = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        is_active: true,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(
          editingProduct
            ? "Product updated successfully!"
            : "Product created successfully!"
        );
        resetForm();
        fetchProducts();
      } else {
        setError(data.error || "Operation failed");
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Product deleted successfully!");
        fetchProducts();
      } else {
        setError(data.error || "Delete failed");
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price?.toString() || "",
      category: product.category || "",
      image_url: product.image_url || "",
    });
    setShowForm(true);
  }

  function resetForm() {
    setFormData({ name: "", description: "", price: "", category: "", image_url: "" });
    setEditingProduct(null);
    setShowForm(false);
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-navy-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 to-navy-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">
            What We Offer
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
            Our Products & Services
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Premium solutions across mobility, training, property, and corporate services.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Alert Messages */}
          {message && (
            <div className="mb-6 flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg">
              <CheckCircle size={18} />
              <span className="text-sm">{message}</span>
            </div>
          )}
          {error && (
            <div className="mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Admin Actions */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
              <Package size={24} className="text-gold-400" />
              Products
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-4 py-2 rounded transition-colors"
            >
              {showForm ? <X size={18} /> : <Plus size={18} />}
              {showForm ? "Cancel" : "Add Product"}
            </button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="mb-10 bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-white mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Executive Chauffeur Package"
                      className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50 transition-colors"
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Price (KES)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="e.g. 15000"
                      className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe the product or service..."
                    className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-2.5 rounded transition-colors"
                  >
                    <Save size={18} />
                    {editingProduct ? "Update Product" : "Create Product"}
                  </button>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-semibold px-6 py-2.5 rounded transition-colors border border-white/10"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Products List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="text-gold-400 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <Package size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-lg">
                No products yet. Add your first product above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-navy-900/60 border border-white/5 rounded-lg overflow-hidden group"
                >
                  {product.image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-navy-800 flex items-center justify-center">
                      <Package size={48} className="text-white/20" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-gold-400 uppercase tracking-wider font-semibold">
                        {product.category || "Uncategorized"}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-white/40 hover:text-gold-400 transition-colors"
                          aria-label="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-white/40 hover:text-red-400 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-white/60 mb-4 line-clamp-3">
                      {product.description || "No description provided."}
                    </p>
                    {product.price && (
                      <p className="text-lg font-bold text-gold-400">
                        KES {Number(product.price).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
