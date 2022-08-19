import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import { Base, Typo } from "../styles/index";
import productModel from "../models/products"



function StockList({products, setProducts}) {


  useEffect(() => {
    async function fetchData() {
      setProducts(await productModel.getProducts());
    }
    fetchData();
  }, []);

  /*
const { reload } = route.params || false;

  if (reload) {
    reloadProductsList();
}

async function reloadProductsList() {
    setProducts(await productModel.getProducts());
}

useEffect(() => {
    reloadProductsList();
}, []);
*/


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
      {list}
    </View>
  );
}

export default function Stock({products, setProducts}) {
  return (
    <View style={Base.container}>
      <Text style={Typo.header3}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </View>
  );
}


