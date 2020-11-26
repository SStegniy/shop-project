import { ICategory } from '../interfaces/category.interface';
import { IMessage } from '../interfaces/message.interface';
import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct {
    constructor(
        public id: number,
        public category: ICategory,
        public title: string,
        public price: number,
        public previousPrice: number,
        public freshness: string,
        public farm: string,
        public deliveryArea: string,
        public deliveryTime: number,
        public country: string,
        public color: string,
        public size: string,
        public buyProperties: string,
        public stock: number | string,
        public image: string,
        public description: Array<IMessage>,
        public reviews: Array<IMessage>,
        public questions: Array<IMessage>){}
}
