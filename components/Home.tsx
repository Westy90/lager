import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import Stock from './Stock';
import { Base, Typo } from "../styles/index.js";


export default function Home({route, products, setProducts}) {
    return (
        <ScrollView style={Base.base}>
            <Text style={Typo.header3}>LagerAppen</Text>
            <Image source={require('../assets/warehouse.jpg')} style={{ width: 320, height: 240 }} />
            <Stock products={products} setProducts={setProducts } />
        </ScrollView>
    );
}


