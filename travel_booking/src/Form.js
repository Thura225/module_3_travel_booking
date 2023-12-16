import { View, Text, TextInput, Pressable, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "./endpoint";



export default function Form(props) {
    let [date,setDate] = useState(new Date())
    let [show,setShow] = useState(false)
    let [mode,setMode] = useState("date")
    let [bookingdata,setBookingData] = useState({
        place:'',
        price:0,
        name:'',
        person:'',
        date:''
    })
    

    let place = ''
    let booking = ''
    

    if (props.route.params != undefined){
        place = props.route.params.place
        booking = props.route.params.booking
    }
    useEffect(()=>{
        function FetchData(){
            if(place!='' && booking==''){
                setBookingData({place:place.placeName,price:place.placePrice,name:'',person:0,date:''})
            }else if(place=='' && booking!=''){
                setBookingData(booking)
            }else{
                setBookingData({place:'',price:0,name:'',person:0,date:''})
            }
        }
        FetchData()
        
    },[place])
    
        
    

    console.log("Place",place)
    console.log("Booking",bookingdata)


    function onChangeValue(name,value){
        let newBooking = bookingdata
        newBooking[name] = value
        setBookingData(newBooking)
        console.log(bookingdata)
    }

    function changeDate(e,selectedDate){
        setDate(selectedDate)
        const newBooking = bookingdata
        let newDate = selectedDate.toLocaleDateString()
        newBooking['date'] = newDate
        setBookingData(newBooking)
        setShow(false)
    }

    function showMode(modeToShow){
        setShow(true)
        setMode(modeToShow)
    }

    function save(){
        async function ComponentDidMount(){
            const token = await AsyncStorage.getItem('token')
            fetch(`http://${endpoint}/api/bookings/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Token ${token}`
                },
                body:JSON.stringify(bookingdata)
            }).then(resp=>resp.json())
            .then(res=>{
                if(res){
                    props.navigation.navigate('bookings')
                }else{
                    Alert.alert("No data")
                }
            }).catch(err=>console.log(err))
        }
        ComponentDidMount()
    }

    function update(){
        async function ComponentDidMount(){
            console.log(bookingdata)
            const token = await AsyncStorage.getItem('token')
            fetch(`http://${endpoint}/api/bookings/${booking.id}/`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Token ${token}`
                },
                body:JSON.stringify(bookingdata)
            }).then(resp=>resp.json())
            .then(res=>{
                if(res){
                    props.navigation.navigate('bookings')
                }else{
                    Alert.alert("No data")
                }
            }).catch(err=>console.log(err))
        }
        ComponentDidMount()
    }
  return (
    <View style={styles.container}>
        <Text style={{color:"purple",fontSize:30,marginBottom:10}}>Create Your Booking</Text>
       {
        booking == ''?(
                <View style={styles.formBox}>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Place :</Text>
                        <TextInput style={styles.inputText} onChangeText={value=>onChangeValue('place',value)} defaultValue={place==''?'':place.placeName} placeholder="e.g.Chaung Thar Beach"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Price :</Text>
                        <TextInput style={styles.inputText} keyboardType="numeric" onChangeText={value=>onChangeValue('price',parseInt(value))} defaultValue={place==''?'':`${place.placePrice}`} placeholder="20000"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput style={styles.inputText} onChangeText={value=>onChangeValue('name',value)} placeholder="e.g.Mg Mg"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Number Of People:</Text>
                        <TextInput style={styles.inputText} keyboardType="numeric" onChangeText={value=>onChangeValue('person',parseInt(value))} placeholder="e.g.5"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Date:</Text>
                        <Pressable onPress={()=>showMode("date")}>
                            <TextInput style={styles.inputText} defaultValue={date.toLocaleDateString()} editable={false}/>
                        </Pressable>
                        {show && (<DateTimePicker dateFormat={"day month year"} mode={mode} display="spinner" value={date} onChange={changeDate}/>)}
                    </View>
                    <Button title='book' color={"purple"} onPress={save}/>
                </View>
            ):
            (
                <View style={styles.formBox}>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Place:</Text>
                        <TextInput style={styles.inputText} onChangeText={value=>onChangeValue('place',value)} defaultValue={booking.place} placeholder="e.g.Chaung Thar Beach"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Price :</Text>
                        <TextInput keyboardType="numeric" onChangeText={value=>onChangeValue('price',parseInt(value))} style={styles.inputText} defaultValue={`${booking.price}`} placeholder="20000"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput style={styles.inputText} onChangeText={value=>onChangeValue('name',value)} defaultValue={booking.name} placeholder="e.g.Mg Mg"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Number Of People:</Text>
                        <TextInput keyboardType="numeric" onChangeText={value=>onChangeValue('person',parseInt(value))} style={styles.inputText} defaultValue={`${booking.person}`} placeholder="e.g.5"/>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.label}>Date:</Text>
                        <Pressable onPress={()=>showMode("date")}>
                            <TextInput style={styles.inputText} defaultValue={date.toLocaleDateString()} editable={false}/>
                        </Pressable>
                        {show && (<DateTimePicker mode={mode} display="spinner" value={date} onChange={changeDate}/>)}
                    </View>
                    <Button title='Update' color={"purple"} onPress={()=>update(booking.id)}/>
                </View>
            )    
        }
    </View>
   );
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
