const BASE_URL = "http://localhost:3000";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  mood?: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Mood {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  teas: { name: string; description: string; benefit: string; image: string; }[];
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Products could not be loaded from the API.");
  }

  return response.json();
}

export const ApiService = {
  getProducts: async (): Promise<Product[]> => {
    return fetchProducts();
  },

  getProductById: async (id: number | string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`Product detail could not be loaded for ID: ${id}.`);
    }

    return response.json();
  },

  getMoods: async (): Promise<Mood[]> => {
    const response = await fetch(`${BASE_URL}/moods`);
    if (!response.ok) {
      throw new Error("Moods could not be loaded.");
    }
    return response.json();
  },

  getCategories: async (): Promise<string[]> => {
    const products = await fetchProducts();
    
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    
    return uniqueCategories;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const encodedCategory = encodeURIComponent(category);
    const response = await fetch(
      `${BASE_URL}/products/category/${encodedCategory}`
    );

    if (!response.ok) {
      throw new Error(`Products could not be loaded for category: ${category}.`);
    }

    return response.json();
  },
};
