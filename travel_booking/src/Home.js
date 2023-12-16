import { View,Text,StyleSheet,FlatList, Image } from "react-native";
import { places } from "./places";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Home(props){
    
    const navigation = useNavigation()
    useEffect(() => {
        const checkToken = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
    
            if (!token) {
              navigation.navigate('login'); 
            }
          } catch (error) {
            console.error('Error reading token from AsyncStorage:', error);
          }
        };
    
        // Call the async function to check the token
        checkToken();
      }, []); 
    function gotToDetail(place){
        console.log(place.image)
        props.navigation.navigate('detail',{"place":place})
    }

    return (<>
    <View style={styles.container}>
        <FlatList
            data={places}
            renderItem={({item,index})=>(<View style={styles.item}>
                    <Image style={styles.image} source={item.image}/>
                    <Text style={styles.header}>{item.placeName}</Text>
                    <Text style={styles.text} numberOfLines={3}>{item.placeDescription}</Text>
                    <Text style={{color:"white",fontWeight:"400"}} onPress={()=>gotToDetail(item)}>see more</Text>
                    <Text style={styles.text}>Price : {item.placePrice}MMK</Text>
                </View>)
            }
        />  
    </View>
    </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    item:{
        height:"auto",
        padding:15,
        backgroundColor:"purple",
        margin:10,
        borderRadius:10
    },
    text:{
        color:"white"
    },
    header:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
        color:"white"
    },
    image:{
        width:"100%",
        height:200,
        borderRadius:10,
        marginBottom:10
    }
})