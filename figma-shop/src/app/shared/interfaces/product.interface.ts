import { ICategory } from './category.interface';
import { IMessage } from './message.interface';

export interface IProduct {
    id: number;
    category: ICategory;
    title: string;
    price: number;
    previousPrice: number;
    freshness: string;
    farm: string;
    deliveryArea: string;
    deliveryTime: number;
    country: string;
    color: string;
    size: string;
    buyProperties: string;
    stock: number | string;
    image: string;
    description: Array<IMessage>;
    reviews: Array<IMessage>;
    questions: Array<IMessage>;
}