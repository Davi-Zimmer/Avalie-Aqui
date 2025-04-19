
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

    axios.get(`http:/192.168.0.5:3000/products` ).then( res => {
      
        setProducts( res.data )
      
    }).catch( err => {
        console.error( err )
    })
    
    return (
      <>
       
        {
          /*
          <View style={styles.images}>
        
            <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92RibS6nXGww1R7R2dYrHb53A0aS9CbjE5w&s'}} style={styles.img} />
            <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92RibS6nXGww1R7R2dYrHb53A0aS9CbjE5w&s'}} style={styles.img} />
            <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92RibS6nXGww1R7R2dYrHb53A0aS9CbjE5w&s'}} style={styles.img} />

          </View>
          */
        }

        <FlatList data={ products }
            keyExtractor={ (item) => item.id }
            renderItem={({ item }) => (
                <View style={{ padding: 10, borderBottomWidth: 1 }}>
                    <Image source={{ uri: item.image }} style={styles.img} />
                    <Text>{item.name}</Text>
                </View>
            )
        }/>

        <View style={styles.bodyContainer}>

            <Text style={styles.title}>Avalie Aqui</Text>

            <Text style={styles.text}>Escolha o produto que deseja avaliar e compartilhe sua experiencia com os outros consumidores</Text>

            <TouchableOpacity onPress={Navigate}>
                <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('FeedBack')}>
                <Text style={styles.btnText}>FeedBack</Text>
            </TouchableOpacity>
        </View>
        
    </>)
}

const styles = StyleSheet.create({

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
