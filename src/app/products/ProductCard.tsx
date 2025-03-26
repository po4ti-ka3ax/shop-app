
export default interface IProductData {
    [index: number] :
    {
        id:number, 
        title: string,
        price: number,
        description: string,
        category: string,
        image: string
    };
}