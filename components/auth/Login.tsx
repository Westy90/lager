// auth/Login.tsx

import { Auth } from "../../interfaces/index";
import { useState } from "react";
import AuthModel from "../../models/auth";
import AuthFields from "./AuthFields";


export default function Login({ navigation, setIsLoggedIn }) {

    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        console.log("hej")
        console.log(auth)
        if (auth.email && auth.password) {
            console.log("hej2")
            const result = await AuthModel.login(auth.email, auth.password);

            setIsLoggedIn(true);
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