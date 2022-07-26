import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Stock from './components/Stock';

export default function App() {
  return (


      <View style={styles.base}>

      <View style={styles.dummyTop}>

      </View>


        <Text style={{color: '#33c', fontSize: 42}}>Lager-Appen</Text>
        <Image source={require('./assets/warehouse.jpg')} style={{ width: 320, height: 240 }} />

        <Stock />
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  dummyTop: {
    height: 50,
    backgroundColor: 'powderblue'
  },
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 12,
    paddingRight: 12,
  }
});