
import { useState, useEffect } from 'react';
import { Platform, ScrollView, View, Text, Button, TextInput } from "react-native";
import { Base, Typo, Forms } from "../styles/index";
import { Delivery, OrderItem as Product } from "../interfaces/interfaces"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import deliveryModel from "../models/delivery";
import {showMessage} from 'react-native-flash-message';
import DateDropDown from './elements/DateDropDown';
import ProductDropDown from './elements/ProductDropDown';
import TextFieldForm from './elements/TextFieldForm';



function validateAmount(amount : number) {
    if (amount < 1 || amount > 99) {
            showMessage({
                message: "Felaktigt värde",
                description: "Antalet ska vara minst 1-99 ",
                type: "warning"
            })
    }
}

export default function DeliveriesForm( {navigation }) {

    const [delivery, setDelivery] = useState<Partial <Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial <Product>>({});

    async function addDelivery() {

        console.log("Inleverans!")

        await deliveryModel.addDelivery(delivery);

        console.log(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);

        navigation.navigate("List", { reload: true });
    }

    return (
    <ScrollView style={ Base.base }>
        <Text style={Typo.header2}>Ny inleverans</Text>


        <Text style={{ ...Typo.label }}>Produkt</Text>
        <ProductDropDown
            delivery={delivery}
            setDelivery={setDelivery}
            setCurrentProduct={setCurrentProduct}
        />

        <Text style={Typo.label}>Datum</Text>
        <DateDropDown
            delivery= {delivery}
            setDelivery={setDelivery}
        />

        <Text style={Typo.label}>Antal</Text>

        <TextInput
            style={Forms.input}
            onChangeText = {(content: string) => {

                validateAmount(parseInt(content))
                setDelivery({...delivery, amount: parseInt(content)});

                console.log("On change:");
                console.log(delivery);
            }}
        value ={delivery?.amount?.toString()}
        keyboardType ="numeric"
        />

        <Text style={Typo.label}>Kommentar</Text>

        <TextFieldForm
            delivery = {delivery}
            setDelivery = {setDelivery}
        />

        <Button
            title="Gör inleverans"
            onPress= {() => {

                console.log(currentProduct);

                addDelivery();
            }}
        />
    </ScrollView>


    );
};
