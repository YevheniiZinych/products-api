import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productModel.findAll({
        order: [['id', 'ASC']],
      });

      if (!products) throw new NotFoundException('Products not found');

      return products;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while getting products',
        error?.message,
      );
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const deleted = await this.productModel.destroy({ where: { id } });
      if (!deleted) throw new NotFoundException('Product not found');
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while deleted product',
        error?.message,
      );
    }
  }
}
