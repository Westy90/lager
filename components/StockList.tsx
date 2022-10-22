import { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import config from "../config/config.json";
import { Base, Typo } from "../styles/index";
import productModel from "../models/products"
import orderModel from "../models/orders";

export default function StockList({route, products, setProducts}) {

  useEffect(() => {
    async function fetchData() {
      setProducts(await productModel.getProducts());
    }
    fetchData();
  }, []);

  const list = products.map((product, index) => {
    return <Text
            key={index}
            style={{ ...Typo.normal }}
            >
              { product.name }   |   { product.stock }
            </Text>
  });

  return (
    <View>
      <Button
      title="Återställ allt!"
      onPress={() => {
          orderModel.resetEverything();
      }}
      />

      {list}
    </View>
  );
}

