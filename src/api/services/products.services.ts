import L from "../../common/logger"
import CustomError from "../../common/utils/customError"


interface Product{
    id: number, 
    name: string,
    branchId: number 
}

export class ProductsService {
    private products: Product[];
    private internalId = 0;

    constructor(){
        this.products = [
            {
                id: ++this.internalId,
                name: "Product 1",
                branchId: 1
            },
            {
                id: ++this.internalId,
                name: "Product 2",
                branchId: 2
            }
        ]
    }
    create(name: string): Promise<Product> {
        L.info(`Create prodcut with name ${name}`);
        const product: Product = { id: ++this.internalId, name: name, branchId: 3 };
        this.products.push(product)
        return Promise.resolve(product)
    }

    findAll(): Promise<Product[]> {
        L.info(this.products, "Fetch all products");
        return Promise.resolve(this.products)
    }

    findById(id: number){
        L.info(`Fetch by id ${id}`);
        const element = this.products.find((x)=> x.id == id);
        if(!element) throw new CustomError("Product not found")  
        return Promise.resolve(element)
    }

    async update(id: number, data: Product){
        await this.findById(id);
        const index = this.products.findIndex((x)=> x.id == id);
        this.products[index].name = data.name;
        return this.products[index]
    }

    async delete(id: number){
        await this.findById(id);
        this.products = this.products.filter((x)=> x.id == id);
        return Promise.resolve({ status: 'deleted'})
    }
}

export default new ProductsService();