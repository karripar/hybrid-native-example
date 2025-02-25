import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, Text, Image} from 'react-native';

const App = () => {
  console.log('App executed');
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello, React Native!</Text>
      <Image style={styles.img} source={require('../img/kissakiipeily.jpg')} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 400,
    height: 400,
  },
});

export default App;
