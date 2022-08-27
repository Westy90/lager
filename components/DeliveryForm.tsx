
import { useState, useEffect } from 'react';
import { Platform, ScrollView, View, Text, Button, TextInput } from "react-native";
import { Base, Typo, Forms } from "../styles/index";
import { Delivery, OrderItem as Product } from "../interfaces/interfaces"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import deliveryModel from "../models/delivery";

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

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    )
}

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

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
            }}>
            {itemsList}
        </Picker>
    );
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
                console.log("On change:");
                setDelivery({...delivery, amount: parseInt(content)});

                console.log(delivery);
            }}
        value ={delivery?.amount?.toString()}
        keyboardType ="numeric"
        />

        <Text style={Typo.label}>Kommentar</Text>

        <TextInput
            style={Forms.input}
            onChangeText = {(content: string) => {
                console.log("On change:");
                setDelivery({...delivery, comment: content});

                console.log(delivery);
            }}

            value ={delivery?.comment}
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
