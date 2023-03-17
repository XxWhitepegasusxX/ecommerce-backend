interface ICreateproductsDTO{
    name: string;
    description: string;
    price: number;
    sizes: string[];
    gender?: string;
    brand?: string;
    colors?: string[];
    stock?: number;
    installments?: number;
    interest?: number;

}
export { ICreateproductsDTO }