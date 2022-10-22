import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base, Typo } from "./styles/index.js";
import Deliveries from "./components/Deliveries";
import Invoices from "./components/invoice/Invoices";
import Ship from "./components/ship/Ship";
import FlashMessage from 'react-native-flash-message';

import Auth from "./components/auth/Auth";
import authModel from "./models/auth";




const Tab = createBottomTabNavigator();


const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleverans": "md-paper-plane-sharp",
  "Leverans": "map-outline"
};




export default function App() {



  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    async function logIn() {
      setIsLoggedIn(await authModel.loggedIn());
    }
    logIn();
  }, []);

  const [products, setProducts] = useState([]);

  const [invoices, setInvoices] = useState([]);

  return (

    <SafeAreaView style={Base.container}>



      <NavigationContainer>

      <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {

      let iconName = routeIcons[route.name] || "alert";

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
      })}
    >

      <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
      </Tab.Screen>

      <Tab.Screen name="Plock">
            {() => <Pick products={products} setProducts={setProducts} />}
      </Tab.Screen>

      <Tab.Screen name="Inleverans">
            {() => <Deliveries products={products} setProducts={setProducts} />}
      </Tab.Screen>

      <Tab.Screen name="Leverans" component={Ship} />

      {
        isLoggedIn ?
        <Tab.Screen name="Faktura" component={Invoices} /> :

        <Tab.Screen name="Logga in">
          {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
      }

      </Tab.Navigator>

      </NavigationContainer>
      <StatusBar style="auto" />


      <FlashMessage 
      position="top"
      testID = "flashMessage"
      />
    </SafeAreaView>
  );
}


