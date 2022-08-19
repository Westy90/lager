import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from "../models/orders";
import productModel from "../models/products";

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);
    const [pickButton, setPickButton] = useState(true);

    useEffect(() => {

        async function getProducts() {
            setProductsList(await productModel.getProducts());
        }

        async function getPickButton() {
            setPickButton(await orderModel.checkProducts(order));
        }

        getProducts();
        getPickButton();

    }, []);


    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts()); //Behövs för att uppdatera de minskade antalet artiklarna
        navigation.navigate("List", { reload: true });
    };

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>Code: {order.status_id}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}

            {pickButton ? <Button title="Plocka order" onPress={pick} />: <Text> Produkter saknas i lagret </Text> }


        </View>
    )
};
