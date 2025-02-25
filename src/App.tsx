import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import Home from './views/Home';

const App = () => {
  console.log('App executed');
  return (
    <SafeAreaView style={styles.container}>
      <Home></Home>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 60 : 0,
    backgroundColor: 'hotpink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 400,
    height: 400,
  },
});

export default App;
