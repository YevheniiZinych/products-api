import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { IProduct } from './dto/create-product.dto';
import { Order } from 'src/orders/order.model';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model<IProduct> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @Column
  serialNumber: number;

  @Column
  isNew: number;

  @Column
  photo: string;

  @Column
  title: string;

  @Column
  type: string;

  @Column
  specification: string;

  @Column({ type: DataType.JSONB })
  guarantee: { start: string; end: string };

  @Column({ type: DataType.JSONB })
  price: Array<{ value: number; symbol: string; isDefault: boolean }>;

  @BelongsTo(() => Order)
  order: Order;

  @Column
  date: string;
}
