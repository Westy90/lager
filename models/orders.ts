import config from "../config/config.json";
import productModel from "./products";
import {Order, OrderItem } from "../interfaces/index";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {

        console.log("====== picking order ======");

        order.order_items.forEach(productModel.pickProduct);

        await this.updateOrderStatus(await this.getSpecificOrder(order.id), 200);

    },

    checkProducts: async function checkProducts(order: Partial<Order>) {

        var to_return = true;

        for (let i = 0; i < order.order_items.length; i++) {
            to_return = await productModel.checkProduct(order.order_items[i]);
          }

          console.log("to return: " + to_return)

        return to_return;

    },


    getSpecificOrder: async function getSpecificOrder(id) {
        const response = await fetch(`${config.base_url}/orders/${id}?api_key=${config.api_key}`)
        const result = await response.json()
        return result.data;
    },

    updateOrderInvoiced: async function updateOrderInvoiced(id) {
        await this.updateOrderStatus(await this.getSpecificOrder(id), 600);
    },


    updateOrderStatus: async function updateOrderStatus(order: Partial<Order>, order_status) {

        function callBackFunction() {
            console.log("====== order " + order.id + " has been update ======");
        }

        var orderUpdate = {
            id: order.id,
            name: order.name,
            address: order.address,
            zip: order.zip,
            city: order.city,
            country: order.country,
            status_id: order_status,
            api_key: config.api_key,
        };

        var json = JSON.stringify(orderUpdate);

        var request = new XMLHttpRequest();

        request.addEventListener("load", callBackFunction);
        request.open("PUT", "https://lager.emilfolino.se/v2/orders");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
    },

    updateOrderAddressAndStatus: async function updateOrderAddress(order: Partial<Order>, order_address, order_city) {

        function callBackFunction() {
            console.log("====== order " + order.id + " has been update ======");
        }

        var orderUpdate = {
            id: order.id,
            name: order.name,
            address: order_address,
            zip: order.zip,
            city: order_city,
            country: order.country,
            status_id: 200,
            api_key: config.api_key,
        };

        var json = JSON.stringify(orderUpdate);

        var request = new XMLHttpRequest();

        request.addEventListener("load", callBackFunction);
        request.open("PUT", "https://lager.emilfolino.se/v2/orders");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
    },


    resetEverything: async function resetEverything() {

        function callBackFunction() {
            console.log("====== Resetted for KMOM05 (1/2)! ======");
        }

        var verify = {
            api_key: config.api_key,
        }

        var json = JSON.stringify(verify);

        var request = new XMLHttpRequest();
        request.addEventListener("load", callBackFunction);
        request.open("POST", "https://lager.emilfolino.se/v2/copier/reset");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);

        //Uppdatera varje order med ny adress

        let orders = await this.getOrders();

        let newAddresses = [
            {address: "Stortorget", city:"Karlskrona"},
            {address: "Ringvägen", city:"Nättraby"},
            {address: "Cedergrensvägen", city:"Karlskrona"},
            {address: "Saltövägen", city:"Karlskrona"},
        ];

        let index = 0;

        orders.forEach(order => {

            this.updateOrderAddressAndStatus(order, newAddresses[index].address, newAddresses[index].city)

            index++;
        });

        console.log("====== Resetted for KMOM05 (2/2)! ======");
    },


};



export default orders;