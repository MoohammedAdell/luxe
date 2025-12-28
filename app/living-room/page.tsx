"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductFilters } from "@/components/product-filters"
import { ProductCard } from "@/components/product-card"
import { useTheme } from "@/lib/theme-context"
import { products } from "@/lib/products"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"

export default function LivingRoomPage() {
  const { language } = useTheme()
  const [filters, setFilters] = useState({
    categories: [] as string[],
    materials: [] as string[],
    priceRange: [0, 5000] as [number, number],
  })

  const livingRoomProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.room === "living-room" &&
          (filters.categories.length === 0 || filters.categories.includes(p.category)) &&
          (filters.materials.length === 0 || filters.materials.includes(p.material)) &&
          p.price >= filters.priceRange[0] &&
          p.price <= filters.priceRange[1],
      ),
    [filters],
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section for Living Room */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="/luxury-furniture-hero-modern.jpg"
              alt="Living Room Collections"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-light text-foreground mb-4 text-balance">
              {language === "en" ? "Living Room" : "غرفة المعيشة"}
            </h1>
            <p className="text-lg text-foreground/70 text-balance">
              {language === "en"
                ? "Transform your living space with our premium furniture collection"
                : "قم بتحويل مساحة معيشتك باستخدام مجموعة الأثاث الفاخرة لدينا"}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Showcase */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-foreground mb-8">
              {language === "en" ? "Shop by Category" : "تسوق حسب الفئة"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: { en: "Sofas & Sectionals", ar: "الأرائك والقطاعية" },
                  count: 3,
                  href: "/products?category=sofas",
                  image: "/modern-leather-sofa.png",
                },
                {
                  name: { en: "Coffee Tables", ar: "طاولات القهوة" },
                  count: 2,
                  href: "/products?category=tables",
                  image: "/marble-coffee-table.png",
                },
                {
                  name: { en: "Chairs & Accent Seating", ar: "الكراسي والمقاعد الإضافية" },
                  count: 1,
                  href: "/products?category=chairs",
                  image: "/scandinavian-armchair.jpg",
                },
              ].map((cat) => (
                <Link key={cat.name.en} href={cat.href}>
                  <div className="group relative h-56 rounded-lg overflow-hidden cursor-pointer">
                    <Image
                      src={cat.image || "/placeholder.svg"}
                      alt={cat.name[language]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center">
                      <h3 className="text-white text-2xl font-semibold mb-2 text-center px-4">{cat.name[language]}</h3>
                      <p className="text-white/80 text-sm">
                        {cat.count} {language === "en" ? "products" : "منتجات"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Products Grid with Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Filters - Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 bg-card p-6 rounded-lg border border-border">
                <ProductFilters products={products} onFilterChange={setFilters} />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {livingRoomProducts.length > 0 ? (
                <>
                  <p className="text-foreground/60 mb-8">
                    {language === "en"
                      ? `Showing ${livingRoomProducts.length} products`
                      : `عرض ${livingRoomProducts.length} منتجات`}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {livingRoomProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
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

          {/* Design Tips Section */}
          <section className="mt-20 bg-secondary/5 p-12 rounded-lg">
            <h2 className="text-3xl font-light text-foreground mb-8">
              {language === "en" ? "Living Room Design Tips" : "نصائح تصميم غرفة المعيشة"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: { en: "Choose the Right Sofa", ar: "اختر الأريكة المناسبة" },
                  desc: {
                    en: "The sofa is the centerpiece of your living room. Choose one that fits your space and lifestyle.",
                    ar: "الأريكة هي النقطة المحورية في غرفة معيشتك. اختر ما يناسب مساحتك ونمط حياتك.",
                  },
                },
                {
                  title: { en: "Layer Your Lighting", ar: "طبقات الإضاءة الخاصة بك" },
                  desc: {
                    en: "Combine overhead, accent, and task lighting for a comfortable and inviting atmosphere.",
                    ar: "اجمع بين الإضاءة العلوية والإضاءة الإضافية والإضاءة الوظيفية.",
                  },
                },
                {
                  title: { en: "Add Personal Touches", ar: "أضف لمسات شخصية" },
                  desc: {
                    en: "Use accessories, artwork, and textiles to reflect your personal style and preferences.",
                    ar: "استخدم الإكسسوارات والفنون والمنسوجات لتعكس أسلوبك الشخصي.",
                  },
                },
              ].map((tip, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{tip.title[language]}</h3>
                  <p className="text-foreground/70">{tip.desc[language]}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
