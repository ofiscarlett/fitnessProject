class ShoppingCart {
    id_cart: number;
    id_user: number;
    id_course: number;
    constructor(id_cart: number, id_user: number, id_course: number) {
        this.id_cart = id_cart;
        this.id_user = id_user;
        this.id_course = id_course;
    }
}


const backendUrl = "http://localhost:3001/course";
const shoppingCartUrl = "http://localhost:3001/cart";


//old code
export { ShoppingCart };
