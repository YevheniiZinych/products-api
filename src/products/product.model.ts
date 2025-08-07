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

  @Column({ type: DataType.TEXT })
  title: string;

  @Column({ type: DataType.TEXT })
  type: string;

  @Column({ type: DataType.TEXT })
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
