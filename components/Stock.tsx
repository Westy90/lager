import { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import config from "../config/config.json";
import { Base, Typo } from "../styles/index";
import productModel from "../models/products"
import orderModel from "../models/orders";

import StockList from "./StockList"




export default function Stock({route, products, setProducts}) {
  return (
    <View style={Base.container}>
      <Text style={Typo.header3}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </View>
  );
}


