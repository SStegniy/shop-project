import { ProductInterface } from '../interfaces/product.interface';
import { DescriptionInterface } from '../interfaces/description.interface';
import { MessageInterface } from '../interfaces/message.interface';

export class Product implements ProductInterface{
  constructor(
    public id: number,
    public category: string,
    public title: string,
    public rating: number,
    public price: number,
    public previousPrice: number,
    public freshness: string,
    public farm: string,
    public deliveryArea: string,
    public deliveryTime: number,
    public country: string,
    public color: string,
    public sizes: string,
    public buyProperties: string,
    public stock: number | string,
    public imgUrl: string,
    public count: number,
    public description: DescriptionInterface,
    public reviews?: MessageInterface[],
    public questions?: MessageInterface[]){
  }
}
