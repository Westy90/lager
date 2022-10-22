
import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from "react-native";
import { Base, Typo, Elements } from "../../styles/index";
import { DataTable } from "react-native-paper";


export default function InvoicesListTable({invoices, setInvoices}) {

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



