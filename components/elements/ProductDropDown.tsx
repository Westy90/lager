
import { useState, useEffect } from 'react';
import { Platform, ScrollView, View, Text, Button, TextInput } from "react-native";
import { Base, Typo, Forms } from "../../styles/index";
import { Delivery, OrderItem as Product } from "../../interfaces/interfaces"
import { Picker } from '@react-native-picker/picker';
import productModel from "../../models/products";
import {showMessage} from 'react-native-flash-message';





export default function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};


    console.log("=== ProductDropDown ===");

    useEffect(() => {
        async function fetchData() {
            setProducts(await productModel.getProducts());
        }
        fetchData();
    }, [])

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}
            testID = 'picker'
            >
            {itemsList}
        </Picker>
    );
}