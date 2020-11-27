import { ICategory } from '../interfaces/category.interface';
import { IMessage } from '../interfaces/message.interface';
import { IProduct } from '../interfaces/product.interface';
import { DescriptionInterface } from '../interfaces/description.interface';

export class Product implements IProduct {
    constructor(
        public id: number,
        public category: ICategory,
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
        public size: string,
        public buyProperties: string,
        public stock: number | string,
        public image: string,
        public description: DescriptionInterface,
        public reviews: IMessage,
        public questions: IMessage){}
}
