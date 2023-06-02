export interface Product {
    product: string;
    cost: number;
    description: string;
    quantity: number;
    createdAt: Date;
}

export interface ProductsAPIList {
    status: boolean;
    data: Product[];
}