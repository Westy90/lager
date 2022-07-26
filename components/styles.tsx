import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    dummyTop: {
      height: 50,
      backgroundColor: 'powderblue'
    },
    header: {
      color: "#C0392B",
      fontSize:42,
      fontWeight: 'bold',
    },
    smallHeader: {
      color: "#C0392B",
      fontSize:38,
      fontWeight: 'bold',
    },
    smallText: {
      color: '#D35400', 
      fontSize: 32,
      marginBottom: 10,
    },
    container: { //används typ som en div i mitt fall för varje element på sidan
      flex: 1,
      marginTop: 30,
    },
    base: {
      flex: 1,
      backgroundColor: '#fff',
      paddingLeft: 12,
      paddingRight: 12,
    }
});
