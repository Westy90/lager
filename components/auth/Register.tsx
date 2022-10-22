import { Auth } from "../../interfaces/index";
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import {showMessage} from 'react-native-flash-message';

export default function Register( { navigation }) {
    const [auth, setAuth] = useState<Partial<Auth>>({})

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);
            navigation.navigate("Login");
        } else {
            console.log("ingen email eller lösenord är ifylld!");

            showMessage({
                message: "Något saknas",
                description: "e-post eller lösenord saknas",
                type: "warning"
            })
    }
    }

    return (
        <AuthFields
            auth = {auth}
            setAuth = {setAuth}
            submit= {doRegister}
            title="Registrera"
            navigation= {navigation}
        />
    )
}
