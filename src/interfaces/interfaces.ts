export interface ProductsProps {
  products: Product[];
}


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}
