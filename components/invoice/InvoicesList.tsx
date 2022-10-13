
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typo, Elements } from "../../styles/index";
import { DataTable } from "react-native-paper";
import invoiceModel from "../../models/invoices";


function CurrentInvoicesList({invoices, setInvoices}) {

    const table = invoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{invoice.name}</DataTable.Cell>
              <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
              <DataTable.Cell> {invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <ScrollView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title numeric>Totalpris</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {table}
            </DataTable>
        </ScrollView>
    );
}

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

            <CurrentInvoicesList
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


