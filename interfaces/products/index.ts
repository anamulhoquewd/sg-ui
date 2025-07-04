export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  status: "inStock" | "outOfStock" | "lowStock";
  lowStockThreshold: number;
  unit: {
    price: number;
    originalPrice: number;
    averageWeightPerFruit?: string;
    unitType: "kg" | "piece";
    stockQuantity: number;
    costPerItem: number;
  };
  category: {
    name: string;
    slug: string;
    _id: string;
    description?: string;
  };
  isPopular?: boolean;
  visibility: boolean;
  origin?: string;
  season?: string;
  media: { url: string; alt: string }[];
}

export interface IMedia {
  alt: string;
  url: string;
}

export interface ICartItem {
  _id: string;
  name: string;
  media: { url: string; alt: string };
  title: string;
  unit: {
    price: number;
    stockQuantity: number;
    unitType: "kg" | "piece";
  };
  quantity: number;
}
