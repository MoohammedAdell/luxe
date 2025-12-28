export const languages = {
  en: { name: "English", nativeName: "English", dir: "ltr" },
  ar: { name: "العربية", nativeName: "العربية", dir: "rtl" },
}

export type Language = keyof typeof languages

export const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.living-room": "Living Room",
    "nav.bedroom": "Bedroom",
    "nav.about": "About Us",
    "nav.contact": "Contact",

    // Header/Footer
    "header.search": "Search products...",
    "header.cart": "Cart",

    // Home
    "home.hero.title": "Elevate Your Living Space",
    "home.hero.subtitle": "Discover premium furniture that transforms your home with elegance and comfort",
    "home.featured": "Featured Collections",
    "home.cta": "Shop Now",

    // Products
    "product.price": "Price",
    "product.material": "Material",
    "product.color": "Color",
    "product.dimensions": "Dimensions",
    "product.add-to-cart": "Add to Cart",
    "product.quantity": "Quantity",

    // Filters
    "filter.category": "Category",
    "filter.price": "Price Range",
    "filter.material": "Material",
    "filter.room": "Room Type",

    // Cart
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Checkout",

    // Footer
    "footer.about": "About Us",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.living-room": "غرفة المعيشة",
    "nav.bedroom": "غرفة النوم",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",

    // Header/Footer
    "header.search": "البحث عن المنتجات...",
    "header.cart": "السلة",

    // Home
    "home.hero.title": "ارفع من مستوى مساحتك المعيشية",
    "home.hero.subtitle": "اكتشف أثاثاً فاخراً يحول منزلك بأناقة وراحة",
    "home.featured": "المجموعات المميزة",
    "home.cta": "تسوق الآن",

    // Products
    "product.price": "السعر",
    "product.material": "المادة",
    "product.color": "اللون",
    "product.dimensions": "الأبعاد",
    "product.add-to-cart": "أضف إلى السلة",
    "product.quantity": "الكمية",

    // Filters
    "filter.category": "الفئة",
    "filter.price": "نطاق السعر",
    "filter.material": "المادة",
    "filter.room": "نوع الغرفة",

    // Cart
    "cart.empty": "سلتك فارغة",
    "cart.total": "الإجمالي",
    "cart.checkout": "الدفع",

    // Footer
    "footer.about": "من نحن",
    "footer.contact": "اتصل بنا",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "الشروط والأحكام",
  },
}

export function t(key: string, lang: Language): string {
  return translations[lang][key as keyof (typeof translations)[Language]] || key
}
