import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

export default function Logout(props){
    const navigation = useNavigation();

    const removeAsyncStorageItem = async () => {
      try {
        await AsyncStorage.removeItem('token');
        await props.navigation.navigate('login')
      } catch (error) {
        console.error(error);
      }
    };
  
    
    useEffect(() => {
      const removeItemListener = navigation.addListener('tabPress', () => {
        removeAsyncStorageItem();
      });
  
      return () => {
        removeItemListener();
      };
    }, []);
  
    // Your component rendering code
    // ...
  
    return (
      <></>
    );
}