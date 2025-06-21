import type { OrderItem } from "./order_item";
import type { Customer } from "./customer";

export interface Order {
    id: string;
    customer: Customer;
    items: OrderItem[];
    totalAmount: number;
    createdAt: string;  
}