import { CategoryInterace } from '../interfaces/category.interface';
import { DescriptionInterface } from '../interfaces/description.interface';
import { MessageInterface } from '../interfaces/message.interface';

export class Product {
        public id: number;
        public category: CategoryInterace;
        public title: string;
        public rating: number;
        public price: number;
        public previousPrice: number;
        public freshness: string;
        public farm: string;
        public deliveryArea: string;
        public deliveryTime: number;
        public country: string;
        public color: string;
        public size: string;
        public buyProperties: string;
        public stock: number | string;
        public image: string;
        public description: DescriptionInterface;
        public reviews: MessageInterface;
        public questions: MessageInterface;
}
