import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { Base, Typo, Elements } from "../../styles/index";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { DataTable } from "react-native-paper";

import getCoordinates from "../../models/nominatim";


function CurrentOrderList(order) {

    const table = order.order.order_items.map((order_item, index) => {
        return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{order_item.name}</DataTable.Cell>
              <DataTable.Cell>{order_item.amount}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <ScrollView>
        <Text style={Typo.header2}> {order.order.name} </Text>
        <Text style={Typo.header3}> {order.order.address} </Text>
        <Text style={Typo.header3}> {order.order.zip} {order.order.city}</Text>

        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Artikelnamn</DataTable.Title>
                <DataTable.Title>Antal</DataTable.Title>
            </DataTable.Header>
            {table}
        </DataTable>
        </ScrollView>
    );
}



export default function ShipOrder({ route }) {
    const {order} = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            //const results = await getCoordinates(`${order.address}, ${order.city}`);

            const results = await getCoordinates(`${route.params.order.address}, ${route.params.order.city}`);

            //console.log(results);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    return (
        <>
        <View {...Base.base}>
            <Text style={Typo.header2}> Skicka order</Text>

            <CurrentOrderList
                order={route.params.order} />
        </View>
        <View style={styles.container}>

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}>

                    {marker}
                    {locationMarker}

                </MapView>

            </View>
            </>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyCContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});