import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<{ message: string }> {
    await this.productService.deleteProduct(+id);

    return { message: 'Product deleted' };
  }
}
