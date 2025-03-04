import {StatusBar} from 'expo-status-bar';
import {Keyboard, Platform, SafeAreaView, StyleSheet} from 'react-native';
import Navigator from './navigators/Navigator';
import { UserProvider } from './contexts/UserContext';
import { TouchableOpacity } from 'react-native';
import { UpdateProvider } from './contexts/UpdateContext';

const App = () => {
  console.log('App executed');
  return (
    <TouchableOpacity
    activeOpacity={1}
    style={{flex: 1}}
    onPress={() => Keyboard.dismiss()}
    >
    <SafeAreaView style={styles.container}>
      <UserProvider>
      <UpdateProvider>
      <Navigator />
      </UpdateProvider>
      </UserProvider>
      <StatusBar style="auto" />
    </SafeAreaView>
    </TouchableOpacity>
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
