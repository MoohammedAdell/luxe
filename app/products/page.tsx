"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductFilters } from "@/components/product-filters"
import { ProductCard } from "@/components/product-card"
import { useTheme } from "@/lib/theme-context"
import { products } from "@/lib/products"
import { useState, useMemo } from "react"

export default function ProductsPage() {
  const { language } = useTheme()
  const [filters, setFilters] = useState({
    categories: [] as string[],
    materials: [] as string[],
    priceRange: [0, 5000] as [number, number],
  })

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)

      const materialMatch = filters.materials.length === 0 || filters.materials.includes(product.material)

      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      return categoryMatch && materialMatch && priceMatch
    })
  }, [filters])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl font-light text-foreground mb-2">
              {language === "en" ? "Our Collection" : "مجموعتنا"}
            </h1>
            <p className="text-foreground/60">
              {language === "en"
                ? `Browse our ${filteredProducts.length} premium furniture pieces`
                : `استعرض ${filteredProducts.length} قطعة أثاث فاخرة`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Filters - Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 bg-card p-6 rounded-lg border border-border">
                <ProductFilters products={products} onFilterChange={setFilters} />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <p className="text-xl text-foreground/60">
                    {language === "en"
                      ? "No products found matching your filters"
                      : "لم يتم العثور على منتجات تطابق المرشحات الخاصة بك"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
