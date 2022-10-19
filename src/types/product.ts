export interface Product {
  _id: string;
  avatar: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  developerEmail?: string;
}
