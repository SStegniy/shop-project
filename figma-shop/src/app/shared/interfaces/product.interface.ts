import { ICategory } from './category.interface';
import { IMessage } from './message.interface';
import { DescriptionInterface } from './description.interface';

export interface IProduct {
    id: number;
    category: ICategory;
    title: string;
    rating: number;
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
    description: DescriptionInterface;
    reviews: IMessage;
    questions: IMessage;
}
