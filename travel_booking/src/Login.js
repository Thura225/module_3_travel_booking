import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./endpoint";

export default function Login(props){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const clickLogin=()=>{
        fetch(`http://${endpoint}/get-token/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "username":username,
                "password":password
            })
        }).then(resp=>resp.json())
        .then(res=>{
            if(res.token){
                console.log(res.token)
                AsyncStorage.setItem('token',res.token)
                props.navigation.navigate('home')
            }else{
                Alert.alert("Username & passowrd is invalid!")
            }
        }).catch(err=>console.log(err))
    }
    return (
        <View style={styles.container}>
            <Text style={{color:"purple",fontSize:30,marginBottom:10}}>Login</Text>
            <View style={styles.formBox}>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Username :</Text>
                        <TextInput style={styles.inputText} onChangeText={value=>setUsername(value)} placeholder="Enter Username"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Password :</Text>
                        <TextInput style={styles.inputText} secureTextEntry={true} onChangeText={value=>setPassword(value)} placeholder="Enter Password"/>
                    </View>
                    <Button title="Login" color={"purple"} onPress={clickLogin}/>
                    <Text style={{color:'purple',textAlign:'center',textDecorationLine:'underline',marginTop:5}} onPress={()=>props.navigation.navigate('register')}>Don't have an account? Register</Text>
                </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    formBox:{
        width:"80%",
        paddingVertical:20,
        paddingHorizontal:15,
        backgroundColor:"white",
        height:"50px",
        alignItems:"center",
        borderRadius:10,
    },
    formItem:{
        marginBottom:10,
        width:"90%"
    },
    label:{
        fontSize: 20,
        marginBottom:5,
        color:"purple"
    },
    inputText:{
        borderRadius:10,
        backgroundColor:"white",
        padding:10,
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"purple"
        
    },
})
