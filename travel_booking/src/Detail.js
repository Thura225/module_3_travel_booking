import {View,Text,StyleSheet, Button,Image} from 'react-native'


export default function Detail(props){
    const place = props.route.params.place
    console.log(place)
    function goToBook(b){
        props.navigation.navigate('form',{"place":b,"booking":''})
    }

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Image style={styles.image} source={place.image}/>
                <Text style={styles.header}>{place.placeName}</Text>
                <Text style={styles.text}>{place.placeDescription}</Text>
                <Text style={styles.text}>Price : {place.placePrice}MMK</Text>
                <Button title='Book' color={"purple"}  onPress={()=>goToBook(place)}/>
            </View>   
        </View>
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