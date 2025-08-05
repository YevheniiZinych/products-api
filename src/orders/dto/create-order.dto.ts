import { IProduct } from 'src/products/dto/create-product.dto';

export interface IOrder {
  id?: number;
  title: string;
  date: string;
  description?: string;
  products: IProduct[];
}
