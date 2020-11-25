import { ICategory } from './category.interface';

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
    description: Array<any>;
    reviews: Array<any>;
    questions: Array<any>;
}