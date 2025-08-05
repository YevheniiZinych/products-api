import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Product } from 'src/products/product.model';
import { IOrder } from './dto/create-order.dto';
import { IProduct } from 'src/products/dto/create-product.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(Product) private productModel: typeof Product,
  ) {}

  async createOrder(data: IOrder): Promise<Order> {
    try {
      const { products, ...orderData } = data;
      const order = await this.orderModel.create(orderData as any);

      if (products?.length) {
        const createProducts: IProduct[] = products.map((p) => ({
          ...p,
          orderId: order.id,
        }));

        await this.productModel.bulkCreate(createProducts as any);
      }

      const orderWithProducts = await this.orderModel.findByPk(order.id, {
        include: [Product],
      });

      if (!orderWithProducts)
        throw new NotFoundException('Order not found after creation');

      return orderWithProducts;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while creating order',
        error?.message,
      );
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.orderModel.findAll({
        include: [Product],
        order: [['id', 'ASC']],
      });

      if (!orders) throw new NotFoundException('Orders not found');

      return orders;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while getting all order',
        error?.message,
      );
    }
  }

  async deleteOrder(id: number): Promise<void> {
    try {
      const order = await this.orderModel.findByPk(id, { include: [Product] });

      if (!order) throw new NotFoundException('Order not found');

      await this.productModel.destroy({ where: { orderId: id } });
      await this.orderModel.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while deleting order',
        error?.message,
      );
    }
  }
}
