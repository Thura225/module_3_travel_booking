import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Home';
import Detail from './src/Detail';
import Form from './src/Form';
import BookingList from './src/BookingList';
import Login from './src/Login';
import Logout from './src/Logout';
import Register from './src/Register';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <NavigationContainer theme={ThemeStyle}>
      <Tab.Navigator initialRouteName='home'>
        <Tab.Screen name='home' component={Home} options={{
          tabBarIcon:()=>(<Icons name="home" color={"white"} size={30} />)
        }}/>
        <Tab.Screen name='detail' component={Detail} options={{
          tabBarButton:()=>null,
          tabBarStyle:{display:'none'},
        }}/>
        <Tab.Screen name='form' component={Form} options={{
          tabBarIcon:()=>(<Icons name="form-select" color={"white"} size={30} />)
        }}/>
        <Tab.Screen name='bookings' component={BookingList} options={{
          tabBarIcon:()=>(<Icons name="clipboard" color={"white"} size={30} />)
        }}/>
        <Tab.Screen name='login' component={Login} options={{
          tabBarButton:()=>null,
          tabBarStyle:{display:'none'}
        }}/>
        <Tab.Screen name='logout' component={Logout} options={{
          tabBarIcon:()=>(<Icons name="door-open" color={"white"} size={30} />)
        }}/>
        <Tab.Screen name='register' component={Register} options={{
          tabBarButton:()=>null,
          tabBarStyle:{display:'none'}
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const ThemeStyle= {
  dark: false,
  colors: {
    primary: 'white', //rgb(10, 132, 255)
    background: '#f5f5f5',
    card: 'purple',//rgb(18, 18, 18)
    text: 'white', //rgb(229, 229, 231)
    border: 'purple',//rgb(39, 39, 41)
    notification: 'rgb(255, 69, 58)',
  },
};

