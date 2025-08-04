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
export class OrdersService {}
