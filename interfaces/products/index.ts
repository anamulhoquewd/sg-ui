export interface IProduct {
  _id: string;
  name: string;
  slug: string;
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
