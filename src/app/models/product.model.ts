export interface Product {
  id: number;
  name: string;
  category: 'celulares' | 'smartwatches' | 'acessorios';
  description: string;
  price: number;
  image: string;
}