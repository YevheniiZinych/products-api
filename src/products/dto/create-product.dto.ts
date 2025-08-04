interface IPrice {
  value: number;
  symbol: 'USD' | 'UAH';
  isDefault: number;
}

interface IGuarantee {
  start: string;
  end: string;
}

export interface IProduct {
  orderId: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: IGuarantee;
  price: IPrice[];
  order: number;
  date: string;
}
