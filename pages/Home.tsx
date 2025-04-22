
import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

interface productInterface {
    id: string
    name: string
    image: string
}

export default function Home ({ navigation }:any){

    function Navigate(){
        navigation.navigate('Products')
    }

    const [ products, setProducts ] = useState<productInterface[]>([])

    axios.get(`http:/192.168.0.5:3000/products`).then( res => {

        setProducts( res.data )
      
    }).catch( err => {
        console.error( err )
    })
    
    return (
      <>
        <FlatList data={ products }
            horizontal
            keyExtractor={ (item) => item.id }
            contentContainerStyle={ styles.flatlist }
            renderItem={({ item }) => (
                <View style={ styles.flatListItem }>
                    <Image source={{ uri: item.image }} style={styles.img} />
                    <Text style={ styles.flatListItemText }>{item.name}</Text>
                </View>
            )
        }/>

        <View style={styles.bodyContainer}>

            <Text style={styles.title}>Avalie Aqui</Text>

            <Text style={styles.text}>Escolha o produto que deseja avaliar e compartilhe sua experiencia com os outros consumidores</Text>

            <TouchableOpacity onPress={Navigate}>
                <Text style={styles.btnText}>Dar Feedback</Text>
            </TouchableOpacity>

            {
                /*
                <TouchableOpacity onPress={() => navigation.navigate('FeedBack')}>
                    <Text style={styles.btnText}>FeedBack</Text>
                </TouchableOpacity>
                */    
            }
            
        </View>
        
    </>)
}

const styles = StyleSheet.create({
    flatlist: {
        justifyContent: 'center',
        flexGrow: 1,
    },

    flatListItem: {
       padding: 10,
       borderBottomWidth: 1,
       width: 150,
       alignItems: "center"
    },
    
    flatListItemText: {
        textAlign: "center",

    },

    btnText: {
        padding: 10,
        color: 'white',
        backgroundColor: '#414141',
        paddingHorizontal: 50,
        borderRadius: 10,
        marginTop: 20
    },
  
    bodyContainer: {
        width: '100%',
        alignItems: 'center'
    },
  
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
  
    text: {
        textAlign: 'center',
        marginVertical: 10
    },
  
    img: {
        width: 100,
        height: 100,
        backgroundColor: 'gray'
    },
  
    images: {
        width: '100%',
        flexDirection: 'row',
        gap: 20,
        padding: 10,
        justifyContent: 'center'
  
    },
  
    container: {
        backgroundColor: '#fff',
        gap: 50
    }
});
