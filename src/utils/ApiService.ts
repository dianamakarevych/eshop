const BASE_URL = "https://fakestoreapi.com";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
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

  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/products/categories`);

    if (!response.ok) {
      throw new Error("Product categories could not be loaded.");
    }

    return response.json();
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
