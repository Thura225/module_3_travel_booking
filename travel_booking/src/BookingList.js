import { FlatList,Text,View,StyleSheet, Button, Alert } from "react-native"
import { endpoint } from "./endpoint";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mock_booking } from "./mockbooking";

export default function BookingList(props){
    const [bookings,setBookings] = useState([])
    let [isRefreshing,setRefreshing] = useState(false)

    useEffect(()=>{
        async function ComponentDidMount(){
            const token = await AsyncStorage.getItem('token')
            console.log(token)
            fetch(`http://${endpoint}/api/bookings/`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Token ${token}`
                }
            }).then(resp=>resp.json())
            .then(res=>{
                if(res){
                    setBookings([...res])
                }else{
                    Alert.alert("No data")
                }
            }).catch(err=>console.log(err))
        }
        ComponentDidMount()
    },[isRefreshing])

    function onRefresh(){
        setRefreshing(true)
        setTimeout(()=>{
            setRefreshing(false)
        },5000)
    }
    function goToEdit(f){
        props.navigation.navigate('form',{"place":'',"booking":f})
    }

    function deleteItem(item){
        async function ComponentDidMount(){
            const token = await AsyncStorage.getItem('token')
            fetch(`http://${endpoint}/api/bookings/${item.id}/`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Token ${token}`
                }
            })
            .then(res=>{
                if(res){
                    props.navigation.navigate('bookings')
                }else{
                    Alert.alert("Something Wrong!")
                }
            }).catch(err=>console.log(err))
        }
        ComponentDidMount()
    }
    return (<>
        <View style={styles.container}>
            <FlatList
                data={bookings}
                renderItem={({item,index})=>(
                    <View style={styles.item}>
                        <Text style={styles.header}>{item.place}</Text>
                        <Text style={styles.text}>Name : {item.name}</Text>
                        <Text style={styles.text}>No Of Person : {item.person}</Text>
                        <Text style={styles.text}>Price : {item.price}MMK</Text>
                        <Text style={styles.text}>Date : {item.date}</Text>
                        <View style={styles.buttonBox}>
                            <Button title="Edit" onPress={()=>goToEdit(item)}/>
                            <Button title="delete" color={"red"} onPress={()=>deleteItem(item)}/>
                        </View>
                    </View>
                    )
                }
                onRefresh={onRefresh}
                refreshing={isRefreshing}
            />  
    </View>
    </>)
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
        color:"white",
        marginBottom:5
    },
    header:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
        color:"white"
    },
    buttonBox:{
        width:"40%",
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between"
    }
})