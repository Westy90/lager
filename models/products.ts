import config from "../config/config.json";

import {Order, OrderItem as Product } from "../interfaces/index"



const productModel = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        const result = await response.json()

        return result.data;
    },
    pickProduct: async function pickProduct(product: Partial<Product>) {

        console.log("====== picking product ======");

        function callBackFunction() {
            console.log("====== product has been picked ======")
        }

        //console.log(product.product_id, product.amount, product.stock);

        var inventoryProduct = product.stock;
        var orderProduct = product.amount;

        //console.log("OrderProduct value:" + orderProduct + " | Type: " + typeof orderProduct);
        //console.log("inventoryProduct value:" + inventoryProduct + " | Type: " + typeof inventoryProduct);
        //console.log(inventoryProduct - orderProduct);

        var productUpdate = {
            id: product.product_id,
            name: product.name,
            stock: inventoryProduct - orderProduct,
            api_key: config.api_key,
        };

        var json = JSON.stringify(productUpdate);

        var request = new XMLHttpRequest();

        request.addEventListener("load", callBackFunction);
        request.open("PUT", "https://lager.emilfolino.se/v2/products");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);

    },

    checkProduct: async function checkProduct(product: Partial<Product>) {

        console.log("====== checking product inventory status ======");

        var inventoryProduct = product.stock;

        var orderProduct = product.amount;

        console.log("product has stock " + inventoryProduct);
        console.log("quantity ordered " + orderProduct);

        if (inventoryProduct > orderProduct) {
            console.log("====== product is in stock ======")
            return true;
        } else {
            console.log("====== product out of stock ======")
            return false;
        }
    },

    getSpecificProduct: async function getSpecificProduct(id) {
        const response = await fetch(`${config.base_url}/products/${id}?api_key=${config.api_key}`)

        const result = await response.json()

        return result.data;
    },

    updateProduct: async function updateProduct(product: Partial<Product>) {

        function callBackFunction() {
            console.log("====== product has been added to stock ======")
        }

        var productUpdate = {
            id: product.id,
            name: product.name,
            stock: product.stock,
            api_key: config.api_key,
        };

        console.log(product);
        console.log(productUpdate);

        var json = JSON.stringify(productUpdate);

        var request = new XMLHttpRequest();

        request.addEventListener("load", callBackFunction);
        request.open("PUT", "https://lager.emilfolino.se/v2/products");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);

    },

};

export default productModel;