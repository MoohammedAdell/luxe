"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useTheme } from "@/lib/theme-context"
import { t } from "@/lib/i18n"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const featuredCollections = [
  {
    id: 1,
    name: { en: "Modern Sofa Collection", ar: "مجموعة الأريكة الحديثة" },
    description: { en: "Contemporary sofas designed for comfort and style", ar: "أرائك معاصرة مصممة للراحة والأناقة" },
    image: "/modern-sofa-living-room.jpg",
    href: "/living-room?category=sofas",
  },
  {
    id: 2,
    name: { en: "Bedroom Essentials", ar: "أساسيات غرفة النوم" },
    description: {
      en: "Premium beds and bedroom furniture for restful sleep",
      ar: "أسرة وأثاث غرفة نوم فاخر للنوم الهانئ",
    },
    image: "/luxury-bedroom-bed.jpg",
    href: "/bedroom?category=beds",
  },
  {
    id: 3,
    name: { en: "Dining Room Sets", ar: "مجموعات غرفة الطعام" },
    description: { en: "Elegant dining tables and chairs for gatherings", ar: "طاولات ومقاعد طعام أنيقة للتجمعات" },
    image: "/luxury-dining-room-table.jpg",
    href: "/living-room?category=dining",
  },
]

export default function Home() {
  const { language } = useTheme()
  const isRTL = language === "ar"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-6 text-balance">
              {t("home.hero.title", language)}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
              {t("home.hero.subtitle", language)}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              {t("home.cta", language)}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Hero Image */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <Image
              src="/luxury-furniture-hero-modern.jpg"
              alt="Premium furniture showcase"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">{t("home.featured", language)}</h2>
              <p className="text-foreground/60 text-lg">
                {language === "en"
                  ? "Explore our curated collections of premium furniture"
                  : "استكشف مجموعاتنا المختارة من الأثاث الفاخر"}
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? "rtl" : "ltr"}`}>
              {featuredCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={collection.href}
                  className="group overflow-hidden rounded-lg bg-card hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64 overflow-hidden bg-secondary/20">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name[language]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{collection.name[language]}</h3>
                    <p className="text-foreground/60 text-sm mb-4">{collection.description[language]}</p>
                    <div className="flex items-center gap-2 text-accent font-medium">
                      {language === "en" ? "Explore" : "استكشف"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-light text-foreground mb-16 text-center">
              {language === "en" ? "Why Choose Luxe?" : "لماذا تختار لوكس؟"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: { en: "Premium Quality", ar: "جودة فاخرة" },
                  desc: {
                    en: "Handcrafted furniture using only the finest materials",
                    ar: "أثاث مصنوع يدويًا باستخدام أفضل المواد فقط",
                  },
                },
                {
                  title: { en: "Expert Design", ar: "تصميم خبير" },
                  desc: {
                    en: "Curated by world-renowned interior designers",
                    ar: "منسقة من قبل مصممي الديكور الشهيرين عالميًا",
                  },
                },
                {
                  title: { en: "Lifetime Support", ar: "دعم مدى الحياة" },
                  desc: {
                    en: "Dedicated customer service and lifetime warranty",
                    ar: "خدمة عملاء مخصصة وضمان مدى الحياة",
                  },
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-card p-8 rounded-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title[language]}</h3>
                  <p className="text-foreground/60">{item.desc[language]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
