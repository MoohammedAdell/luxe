export interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  price: number
  originalPrice?: number
  image: string
  category: "sofas" | "chairs" | "beds" | "dining" | "tables" | "storage"
  room: "living-room" | "bedroom" | "dining"
  material: "leather" | "fabric" | "wood" | "metal"
  color: string
  dimensions?: { en: string; ar: string }
  rating: number
  reviews: number
  inStock: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: { en: "Modern Leather Sofa", ar: "أريكة جلدية حديثة" },
    description: {
      en: "Sleek modern sofa with premium leather upholstery. Perfect for contemporary living rooms.",
      ar: "أريكة حديثة أنيقة مع تنجيد جلدي فاخر. مثالية لغرف المعيشة المعاصرة.",
    },
    price: 2499,
    originalPrice: 3299,
    image: "/modern-leather-sofa.png",
    category: "sofas",
    room: "living-room",
    material: "leather",
    color: "Charcoal",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: "2",
    name: { en: "Scandinavian Armchair", ar: "كرسي الحلقة الاسكندنافي" },
    description: {
      en: "Minimalist Scandinavian design armchair with comfortable seating. Ideal for reading nooks.",
      ar: "كرسي تصميم إسكندنافي بسيط مع جلوس مريح. مثالي لزوايا القراءة.",
    },
    price: 899,
    image: "/scandinavian-armchair.jpg",
    category: "chairs",
    room: "living-room",
    material: "fabric",
    color: "Natural Beige",
    rating: 4.7,
    reviews: 87,
    inStock: true,
  },
  {
    id: "3",
    name: { en: "Premium King Bed Frame", ar: "إطار سرير ملك فاخر" },
    description: {
      en: "Elegant king-size bed frame with solid wood construction. Provides superior support and comfort.",
      ar: "إطار سرير بحجم الملك الأنيق مع بناء خشب صلب. يوفر دعم وراحة فائقة.",
    },
    price: 1799,
    originalPrice: 2299,
    image: "/premium-king-bed.jpg",
    category: "beds",
    room: "bedroom",
    material: "wood",
    color: "Walnut",
    rating: 4.9,
    reviews: 156,
    inStock: true,
  },
  {
    id: "4",
    name: { en: "Dining Table Set (6 seater)", ar: "مجموعة طاولة الطعام (6 أشخاص)" },
    description: {
      en: "Spacious dining table with 6 matching chairs. Perfect for family gatherings and entertaining.",
      ar: "طاولة طعام فسيحة مع 6 كراسي متطابقة. مثالية لتجمعات العائلة والترفيه.",
    },
    price: 3299,
    image: "/elegant-dining-set.png",
    category: "dining",
    room: "dining",
    material: "wood",
    color: "Oak",
    rating: 4.6,
    reviews: 92,
    inStock: true,
  },
  {
    id: "5",
    name: { en: "Coffee Table - Marble Top", ar: "طاولة قهوة - الرخام العلوي" },
    description: {
      en: "Elegant marble-top coffee table with metal frame. A statement piece for any living room.",
      ar: "طاولة قهوة رخامية أنيقة مع إطار معدني. قطعة متميزة لأي غرفة معيشة.",
    },
    price: 699,
    image: "/marble-coffee-table.png",
    category: "tables",
    room: "living-room",
    material: "metal",
    color: "Black with Marble",
    rating: 4.5,
    reviews: 67,
    inStock: true,
  },
  {
    id: "6",
    name: { en: "Wardrobe Cabinet", ar: "خزانة الملابس" },
    description: {
      en: "Large wooden wardrobe with smooth sliding doors. Provides ample storage for bedroom essentials.",
      ar: "خزانة ملابس خشبية كبيرة مع أبواب منزلقة ناعمة. توفر تخزين كبير لأساسيات غرفة النوم.",
    },
    price: 1299,
    image: "/wardrobe-cabinet.jpg",
    category: "storage",
    room: "bedroom",
    material: "wood",
    color: "Light Oak",
    rating: 4.7,
    reviews: 78,
    inStock: true,
  },
  {
    id: "7",
    name: { en: "Sectional Sofa", ar: "أريكة قطاعية" },
    description: {
      en: "L-shaped sectional sofa with deep seating and premium fabric. Perfect for large living spaces.",
      ar: "أريكة قطاعية على شكل L مع جلوس عميق وقماش فاخر. مثالية للمساحات المعيشية الكبيرة.",
    },
    price: 3999,
    originalPrice: 4999,
    image: "/cozy-sectional-sofa.png",
    category: "sofas",
    room: "living-room",
    material: "fabric",
    color: "Deep Gray",
    rating: 4.8,
    reviews: 203,
    inStock: true,
  },
  {
    id: "8",
    name: { en: "Pendant Light Fixture", ar: "جهاز الإضاءة المعلقة" },
    description: {
      en: "Modern pendant light with adjustable height. Adds elegance to dining areas and living spaces.",
      ar: "إضاءة معلقة حديثة بارتفاع قابل للتعديل. تضيف الأناقة لمناطق الطعام والمساحات المعيشية.",
    },
    price: 449,
    image: "/elegant-pendant-light.png",
    category: "tables",
    room: "living-room",
    material: "metal",
    color: "Brushed Gold",
    rating: 4.4,
    reviews: 45,
    inStock: true,
  },
]

export const categories = [
  { id: "sofas", name: { en: "Sofas", ar: "الأرائك" } },
  { id: "chairs", name: { en: "Chairs", ar: "الكراسي" } },
  { id: "beds", name: { en: "Beds", ar: "الأسرة" } },
  { id: "dining", name: { en: "Dining Sets", ar: "مجموعات الطعام" } },
  { id: "tables", name: { en: "Tables", ar: "الطاولات" } },
  { id: "storage", name: { en: "Storage", ar: "التخزين" } },
]

export const materials = [
  { id: "leather", name: { en: "Leather", ar: "جلد" } },
  { id: "fabric", name: { en: "Fabric", ar: "نسيج" } },
  { id: "wood", name: { en: "Wood", ar: "خشب" } },
  { id: "metal", name: { en: "Metal", ar: "معدن" } },
]
