
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typo, Elements } from "../styles/index";
import deliveryModel from "../models/delivery";
import DeliveriesListList from "./DeliveriesListList"




export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [deliveries, setDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
      async function fetchData() {
        reloadDeliveries()
      }
      fetchData();
    }, []);


    return (

        <View style={Base.base}>
            <Text style={Typo.header2}>Inleveranser</Text>

            <DeliveriesListList
            deliveries={deliveries}
            setDeliveries={setDeliveries}
            />

            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </View>
    );

};


