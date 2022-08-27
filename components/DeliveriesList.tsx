
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typo, Elements } from "../styles/index";
import deliveryModel from "../models/delivery";


function CurrentDeliveriesList({deliveries, setDeliveries}) {

    const list = deliveries.map((deliveries, index) => {
      return (
        <View
            style={ Elements.box }
            key={index}
        >
            <Text
              style={ Typo.header3 }
            >
                { deliveries.amount } st { deliveries.product_name }
              </Text>

            <Text
            style={ Typo.normal }
            >
            Levererad: { deliveries.delivery_date } {"\n"}
            Kommentar: { deliveries.comment }
            </Text>

        </View>

      );

    });

    return (
      <ScrollView>
        {list}
      </ScrollView>
    );
  }

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

            <CurrentDeliveriesList
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


