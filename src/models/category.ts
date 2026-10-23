export interface Category {
  id: number | string;
  name: string;
  description: string;
}

export interface CategoryPayload {
  name: string;
  description: string;
}

export interface CategoryResponse {
  id: number | string;
  name: string;
  description: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
