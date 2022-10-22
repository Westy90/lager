
import { useState, useEffect } from 'react';
import { Platform, ScrollView, View, Text, Button, TextInput } from "react-native";
import { Base, Typo, Forms } from "../../styles/index";
import { Invoice, Order } from "../../interfaces/index"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import invoiceModel from "../../models/invoices";
//import orders from "../../models/orders";
import orderModel from "../../models/orders";


import deliveryModel from "../../models/delivery";
import orders from '../../models/orders';


function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        let due_date = new Date();
                        due_date.setDate(date.getDate() + 14);

                        props.setInvoice({
                            ...props.invoice,
                            creation_date: date.toLocaleDateString('se-SV'),
                            due_date: due_date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    )
}


function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);
    let ordersHash: any = {};

    useEffect(() => {
        async function fetchData() {
            setOrders(await orderModel.getOrders());
        }
        fetchData();
    }, [])

    const itemsList = orders
        .filter(order => order.status_id < 500)
        .map((order, index) => {
        ordersHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    console.log("orders in orderDropDown");
    console.log(orders);

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
                props.setCurrentOrder(ordersHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

export default function InvoiceForm( {navigation }) {

    const [invoice, setInvoice] = useState<Partial <Invoice>>({});
    const [currentOrder, setCurrentOrder] = useState<Partial <Order>>({});

    async function addInvoice() {

        console.log("Invocing...!");

        await invoiceModel.addInvoice(invoice);

        await orderModel.updateOrderInvoiced(invoice.order_id);

        navigation.navigate("List", { reload: true });
    }

    return (
    <ScrollView style={ Base.base }>
        <Text style={Typo.header2}>Ny Faktura</Text>

        <Text style={{ ...Typo.label }}>Produkt</Text>
        <OrderDropDown
            invoice={invoice}
            setInvoice={setInvoice}
            setCurrentOrder={setCurrentOrder}
        />

        <Text style={Typo.label}>Datum</Text>
        <DateDropDown
            invoice= {invoice}
            setInvoice={setInvoice}
        />

        <Button
            title="Skapa faktura"
            onPress= {() => {
                addInvoice();
            }}
        />
    </ScrollView>


    );
};


/*
export default interface Invoice {
    order_id: number,
    total_price: number,
    creation_date: string,
    due_date: string,

}

export interface Order {
    id: number,
    name: string,
    address: string,
    zip: number,
    city: string,
    country: string,
    status: string,
    status_id: number,
    api_key: string,
    order_items: Array<OrderItem>,
}
*/
