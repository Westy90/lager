import config from "../config/config.json";
import productModel from "./products";
import {Order, OrderItem, Delivery } from "../interfaces/index";

const deliveryModel = {

    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {


        console.log("====== making delivery ======");

        function callBackFunction() {
            console.log("====== items has been delivered ======");
        }

        var delivery = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            delivery_date: delivery.delivery_date,
            comment: delivery.comment,
            api_key: config.api_key,
        };

        console.log("delivery funktionen");
        console.log(delivery);

        var json = JSON.stringify(delivery);

        var request = new XMLHttpRequest();
        request.addEventListener("load", callBackFunction);
        request.open("POST", "https://lager.emilfolino.se/v2/deliveries");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);

    },



    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
        const result = await response.json()

        return result.data;
    },

};



export default deliveryModel;