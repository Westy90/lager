
import { useState, useEffect } from 'react';
import { Platform, ScrollView, View, Text, Button, TextInput } from "react-native";
import { Base, Typo, Forms } from "../../styles/index";
import { Delivery, OrderItem as Product } from "../../interfaces/interfaces"
import { Picker } from '@react-native-picker/picker';
import {showMessage} from 'react-native-flash-message';


export default function TextFieldForm ({setDelivery, delivery}) {

    function validateComment(text : string) {
        if (text.length < 10) {
                showMessage({
                    message: "För kort texten",
                    description: "Texten behöver vara minst 10 tecken ",
                    type: "warning"
                })
        }
    }

    return (
    <TextInput
    style={Forms.input}
    onChangeText = {(content: string) => {
        validateComment(content);
        setDelivery({...delivery, comment: content});

        console.log("On change:");
        console.log(delivery);
    }}

    value ={delivery?.comment}
    testID = "textField"
    />
    )
}


