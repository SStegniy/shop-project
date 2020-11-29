import { CategoryInterace } from './category.interface';
import { MessageInterface } from './message.interface';
import { DescriptionInterface } from './description.interface';

export interface ProductInterface {
    id: number;
    category: CategoryInterace;
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
    reviews: MessageInterface;
    questions: MessageInterface;
}
