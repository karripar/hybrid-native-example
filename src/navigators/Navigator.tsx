import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';
import { House, User} from 'lucide-react-native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let IconComponent;

          if (route.name === 'All Media') {
            IconComponent = House;
          } else if (route.name === 'My Profile') {
            IconComponent = User;
          }

          return IconComponent ? <IconComponent size={size} color={color} /> : null;
        },
      })}
    >
      <Tab.Screen name="All Media" component={Home} />
      <Tab.Screen name="My Profile" component={Profile} />
    </Tab.Navigator>
  );
};


const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Single" component={Single}/>
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
