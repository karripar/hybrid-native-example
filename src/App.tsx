import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import Navigator from './navigators/Navigator';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  console.log('App executed');
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
      <Navigator />
      </UserProvider>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 65 : 0,
    backgroundColor: 'fff',
    justifyContent: 'center',
  },
});

export default App;
