import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Stock from './components/Stock';
import styles from './styles/styles';

export default function App() {
  return (

    <View style={styles.base}>

      <View style={styles.dummyTop}>

      </View>

      <ScrollView>

      <View style={styles.container}>
        <Text style={styles.header}>Lager-Appen</Text>
        <Image source={require('./assets/warehouse.jpg')} style={{ width: 320, height: 240 }} />
      </View>
        <Stock />
        <StatusBar style="auto" />

      </ScrollView>

    </View>
  );
}

