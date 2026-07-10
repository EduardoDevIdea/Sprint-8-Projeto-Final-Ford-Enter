export enum ProductCategory {
  CELLPHONES = 'Celulares',
  SMARTWATCHES = 'Smart Watchs',
  ACCESSORIES = 'Acessórios'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
}