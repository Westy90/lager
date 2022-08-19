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

        function callBackFunction() {
            console.log("====== order has been picked ======");
        }

        var orderUpdate = {
            id: order.id,
            name: order.name,
            address: order.address,
            zip: order.zip,
            city: order.city,
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

    checkProducts: async function checkProducts(order: Partial<Order>) {

        var to_return = true;

        for (let i = 0; i < order.order_items.length; i++) {
            to_return = await productModel.checkProduct(order.order_items[i]);
          }

          console.log("to return: " + to_return)

        return to_return;


    },



    updateOrder: async function updateOrder(order: Partial<Order>) {

        var Order = {
            id: 1,
            name: "Anders Andersson",
            address: "Andersgatan 1",
            zip: "12345",
            city: "Anderstorp",
            country: "Sweden",
            status_id: 200,
            api_key: config.api_key,
        };
        var json = JSON.stringify(order);

        var request = new XMLHttpRequest();
        //request.addEventListener("load", livet()); //[callbackFunction]
        request.open("PUT", "https://lager.emilfolino.se/v2/orders");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);

        function livet() {
            console.log("livet");
        }

    // TODO: Minska lagersaldo för de
    // orderrader som finns i ordern

    // TODO: Ändra status för ordern till packad



    }



    /*
    addOrder: async function addOrder(order: Partial<Order>) {
        // Add order?

        // Creating new order
        var newOrder = {
            id: 1,
            name: "Martin",
            address: "Sannadal",
            zip: 211,
            city: "Stockholm",
            country: "Sverige",
            status: "okand",
            status_id: 400,
            order_items: {
                "product_id": 1,
                "amount": 2,
                "article_number": "1214-RNT",
                "name": "Skruv M14",
                "description": "Skruv M14, värmförsinkad",
                "specifiers": "{'length' : '60mm', 'width' : '14mm'}",
                "stock": 12,
                "location": "A1B4",
                "price": 10
              },
            api_key: config.api_key
        };
        var json = JSON.stringify(newOrder);

        var request = new XMLHttpRequest();
        request.addEventListener("load", [callbackFunction]);
        request.open("POST", "https://lager.emilfolino.se/v2/orders");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
        */


};



export default orders;