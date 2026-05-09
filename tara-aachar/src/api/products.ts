const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://tara-aachar-admin-be.onrender.com';

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  variant: string;
  ingredients: string[];
  manufacturerName: string;
  allowsCustomIngredients: boolean;
  // optional fields that may or may not be present depending on role
  manufacturerLicense?: string;
  isActive?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  products: Product[];
  totalCount: number;
}

interface ApiResponse<T> {
  message: string;
  success: boolean;
  totalCount: number | null;
  data: T;
}

export const getProductsApi = async (
  token: string,
  pageNo = 0,
  pageSize = 10
): Promise<ProductsResponse> => {
  const res = await fetch(
    `${BASE_URL}/api/v1/user/content?pageNo=${pageNo}&pageSize=${pageSize}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json: ApiResponse<Product[]> = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to fetch products');
  }

  return {
    products: json.data,
    totalCount: json.totalCount ?? json.data.length,
  };
};
