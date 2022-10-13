import config from "../config/config.json";

import { Invoice } from "../interfaces/index"
import storage from "./storage"
import orders from "./orders"



const invoiceModel = {
    getInvoices: async function getInvoices() {

        var token = await storage.readToken(); // Token received during login

        console.log("get invoices")
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                        headers: {
                        'x-access-token': token.token
                        },
                    });

        const result = await response.json()

        return result.data;
},

addInvoice: async function addInvoice(invoice: Partial<Invoice>) {

    console.log("====== making invoice ======");

    function callBackFunction() {
        console.log("====== invoice added ======");
    }

    //räkna ut totalpriset (eventuellt lägga i orders-klassen som separat metod)
    let currentOrder = await orders.getSpecificOrder(invoice.order_id);
    let total_price = 0;
    for (let i = 0; i < currentOrder.order_items.length; i++) {
        total_price += currentOrder.order_items[i].amount * currentOrder.order_items[i].price;
      }

    var invoice = {
        order_id: invoice.order_id,
        total_price: total_price,
        creation_date: invoice.creation_date,
        due_date: invoice.due_date,
        api_key: config.api_key,
    };

    console.log("invoice to send:");
    console.log(invoice);

    var token = await storage.readToken(); // Token received during login
    var json = JSON.stringify(invoice);

    var request = new XMLHttpRequest();
    request.addEventListener("load", callBackFunction);
    request.open("POST", "https://lager.emilfolino.se/v2/invoices");
    request.setRequestHeader('Content-type','application/json; charset=utf-8');
    request.setRequestHeader('x-access-token', token.token);
    request.send(json);

}
}



export default invoiceModel;

/*

fetch("https://lager.emilfolino.se/v2/invoices?api_key=[YOUR_API_KEY]", {
    headers: {
      'x-access-token': [TOKEN]
    },
})
.then(function (response) {
    return response.json();
}).then(function(data) {

});

*/



/*
        console.log("get invoices")
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`)
        const result = await response.json()

        console.log(result);

        return result.data;
*/

/*
function callbackFunction() {
    console.log("====== invoices loaded ======");
}

var token = await storage.readToken(); // Token received during login
var request = new XMLHttpRequest();
request.addEventListener("load", callbackFunction);
request.open("GET", "https://lager.emilfolino.se/v2/invoices?api_key=[YOUR_API_KEY]");
request.setRequestHeader('x-access-token', token);
console.log(request.send());
*/




