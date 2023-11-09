export class CreateComponentDto {
  id: number;
  brand: string;
  type: string;
  model: string;
  image: string;
  stock: number;
  quantity: number;
  isActive: boolean;
  serverId: number;
}
