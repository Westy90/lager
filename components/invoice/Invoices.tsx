// components/Deliveries.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoicesList from './InvoicesList';
import InvoiceForm from './InvoiceForm';

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="List">

            <Stack.Screen name="List">
                {(screenProps) => <InvoicesList {...screenProps} />}
            </Stack.Screen>

            <Stack.Screen name="Form" component={InvoiceForm} />

        </Stack.Navigator>
    );
};


//  
//            <Stack.Screen name="List" component={DeliveriesList} />

