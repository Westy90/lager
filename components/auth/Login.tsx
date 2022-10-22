// auth/Login.tsx

import { Auth } from "../../interfaces/index";
import { useState } from "react";
import AuthModel from "../../models/auth";
import AuthFields from "./AuthFields";
import {showMessage} from 'react-native-flash-message';


export default function Login({ navigation, setIsLoggedIn }) {

    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        console.log("hej")
        console.log(auth)
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);

            if (result.type === "success") {
                setIsLoggedIn(true);
            }


            showMessage(result);

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
            submit= {doLogin}
            title="Logga in"
            navigation= {navigation}
        />
    )


}