
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typo, Elements } from "../../styles/index";
import { DataTable } from "react-native-paper";
import invoiceModel from "../../models/invoices";
import InvoicesListTable from "./InvoicesListTable";

export default function InvoicesList({ route, navigation }) {

    const { reload } = route.params || false;
    const [invoices, setInvoices] = useState([]);

    console.log("InvoiceList function");

    if (reload) {
        reloadInvoices();
        route.params.reload = false
    }

    async function reloadInvoices() {
        setInvoices(await invoiceModel.getInvoices());
    }

    useEffect(() => {
      async function fetchData() {
        reloadInvoices()
      }
      fetchData();
    }, []);

    return (

        <View style={Base.base}>
            <Text style={Typo.header2}>Fakturor</Text>

            <InvoicesListTable
            invoices={invoices}
            setInvoices={setInvoices}
            />

            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />


        </View>
    );


};


