import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

import OrderList from './OrderList.tsx';
import PickList from './PickList.tsx';

const Stack = createNativeStackNavigator();


export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List">

            <Stack.Screen name="List">
                {(screenProps) => <OrderList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}


//            <Stack.Screen name="List" component={OrderList} />