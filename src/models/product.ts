export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductPayload {
  name: string;
  categoryId: string;
  sku:string
  description: string;
  regularPrice: number;
  offerPrice: number;
  initialStock: number;
  minStockAlert: number;
}

export interface ProductResponse {
  id:number;
  name:string 
  description:string 
  sku: string
  regularPrice:number
  offerPrice: number 
  initialStock: number
  minStockAlert:number
  categoryId:number
  categoryName?:string
  imageUrl:string
  createdAt?:string
  updatedAt:string
}
