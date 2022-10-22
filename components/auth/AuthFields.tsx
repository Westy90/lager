import { View, Text, TextInput, Button } from "react-native";
import { Typo, Forms, Base } from "../../styles";
import {showMessage} from 'react-native-flash-message';

export default function AuthFields({auth, setAuth, title, submit, navigation}) {


    function validateEmail(text: string) {

        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!text.match(pattern)) {
        showMessage({
            message: "Icke giltigt email-adress",
            description: "Emailen följer inte traditionell utformning ",
            type: "warning"
        })
        }
    }

    function validatePassword(text: string) {

        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-?@$]).{4,}$/

        if (!text.match(pattern)) {
        showMessage({
            message: "Icke giltigt lösenord",
            description: "Lösenord måste vara minst 4 tecken, små och stora bokstäver, siffror och ett specialtecken",
            type: "warning"
        })
        }
    }

    return(
        <View>
            <Text
            style={Typo.header2}
            >{title}</Text>

            <Text
            style={Typo.header3}
            >E-post</Text>
            <TextInput
                onChangeText={(content:string) => {
                    validateEmail(content);
                    setAuth({...auth, email:content})
                }}
                style={Forms.input}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                testID = "email-field"
            />

            <Text
            style={Typo.header3}
            >Lösenord</Text>
            <TextInput
                onChangeText={(content:string) => {
                    validatePassword(content);
                    setAuth({...auth, password:content})
                }}
                style={Forms.input}
                value={auth?.password}
                secureTextEntry = {true}
                autoCapitalize="none"
                autoCorrect={false}
                testID = "password-field"
            />

            <Button
                title={title}
                onPress={()=> {
                    submit();
                }}
                testID = "submitButton"
            />

            {title == "Logga in" &&
            <Button
                title="Registrera istället"
                onPress={() =>
                navigation.navigate("Register")
            }
            />}

        </View>
    )


}