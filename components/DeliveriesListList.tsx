
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typo, Elements } from "../styles/index";
import deliveryModel from "../models/delivery";


export default function DeliveriesListList({deliveries, setDeliveries}) {

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
