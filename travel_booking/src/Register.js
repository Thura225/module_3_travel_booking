import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./endpoint";

export default function Register(props){
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password1,setPassword1] = useState("")
    const [password2,setPassword2] = useState("")
    const register=()=>{
        if(password1==password2){
            let password = password1
            fetch(`http://${endpoint}/register/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "username":username,
                    "email":email,
                    "password":password
                })
            })
            .then(resp=>resp.json())
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
        
    }
    return (
        <View style={styles.container}>
            <Text style={{color:"purple",fontSize:30,marginBottom:10}}>Register</Text>
            <View style={styles.formBox}>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Username :</Text>
                        <TextInput style={styles.inputText} onChangeText={value=>setUsername(value)} placeholder="Enter Username"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Email :</Text>
                        <TextInput style={styles.inputText} onChangeText={value=>setEmail(value)} placeholder="Enter Email"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Password :</Text>
                        <TextInput style={styles.inputText} secureTextEntry={true} onChangeText={value=>setPassword1(value)} placeholder="Enter Password"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Confirm Password :</Text>
                        <TextInput style={styles.inputText} secureTextEntry={true} onChangeText={value=>setPassword2(value)} placeholder="Confirm Password"/>
                    </View>
                    <Button title="Register" color={"purple"} onPress={register}/>
                    <Text style={{color:'purple',textAlign:'center',textDecorationLine:'underline',marginTop:5}} onPress={()=>props.navigation.navigate('login')}>Already have an account? Login</Text>
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
