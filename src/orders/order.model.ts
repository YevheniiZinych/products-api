import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { IOrder } from './dto/create-order.dto';
import { Product } from 'src/products/product.model';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<IOrder> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column
  title: string;

  @Column
  date: string;

  @Column({ allowNull: true })
  description: string;

  @HasMany(() => Product)
  products: Product[];
}
