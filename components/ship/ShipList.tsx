import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typo } from "../../styles/index";
import orderModel from "../../models/orders";
import { useState, useEffect } from 'react';


export default function ShipList({ navigation }) {

    //const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    /*if (reload) {
        reloadOrders();
    }*/

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);


    const listOfOrders = allOrders
    .filter(order => order.status_id === 200)
    .map((order, index) => {
        return <Button
            title={order.name}
            key={index}
            onPress={() => {
                navigation.navigate('Order', {
                    order: order
                });
            }}
        />
    });

    return (
        <View>
            <Text style={Typo.header2}>Ordrar redo att skickas</Text>
            {listOfOrders}
        </View>
    )

}

