import { Category } from "./category";

export class Event {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    images?: string[];
    category?: Category;
    dateCreated?: string;
}