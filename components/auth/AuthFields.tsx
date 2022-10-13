import { View, Text, TextInput, Button } from "react-native";
import { Typo, Forms, Base } from "../../styles";

export default function AuthFields({auth, setAuth, title, submit, navigation}) {

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
                    setAuth({...auth, email:content})
                }}
                style={Forms.input}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Text
            style={Typo.header3}
            >Lösenord</Text>
            <TextInput
                onChangeText={(content:string) => {
                    setAuth({...auth, password:content})
                }}
                style={Forms.input}
                value={auth?.password}
                secureTextEntry = {true}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Button
                title={title}
                onPress={()=> {
                    submit();
                }}
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