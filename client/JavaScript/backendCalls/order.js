class Order {
    constructor(id_order, order_date, id_cart, id_user, id_course) {
        this.id_order = id_order;
        this.order_date = order_date;
        this.id_cart = id_cart;
        this.id_user = id_user;
        this.id_course = id_course;
    }
}
export { Order };
