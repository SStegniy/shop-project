import { MessageInterface } from './message.interface';
import { DescriptionInterface } from './description.interface';

export interface ProductInterface {
    id: number;
    category: string;
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
    sizes: string;
    buyProperties: string;
    stock: number | string;
    imgUrl: string;
    count: number;
    description: DescriptionInterface;
    reviews: MessageInterface[];
    questions: MessageInterface[];
}
