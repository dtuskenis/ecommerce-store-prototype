class Product {
    constructor(public id: number,
                public name: string,
                public price: number,
                public discount: number | null,
                public imageUrl: string) {}
}

export default Product
