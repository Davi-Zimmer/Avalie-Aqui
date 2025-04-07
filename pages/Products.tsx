import axios from "axios"
import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Alert, FlatList, Image, TouchableOpacity} from "react-native"

type Product = {
    //id: number
    //name: string
    //emao: string
    //feedback: string
    //experience: string
    //recommend: boolean
    

    id: number
    name: string
    price: string
    brand: string
    description: string
    image: string
}


function loadProduct({name, image, brand, price, description}:Product){
    return (
        <View style={styles.productContainer}>
            <Image style={styles.productImage} source={{uri: image}}/>

            <View style={styles.productInfo}>

                <Text style={styles.productTitle}>{name}</Text>

                <Text style={styles.others}>Marca: {brand}</Text>
                <Text style={styles.others}>descrição: {description}</Text>

                <Text style={styles.price}>{price}</Text>

                <TouchableOpacity>
                    <Text style={styles.evaluate}>Avaliar</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


export default function Products(){

    const [dataBase, setDataBase] = useState<Product[]>([])
    
    const [loading, setLoading] = useState(true)

    async function loadDataBase(){
        axios.get('http://localHost:3000/products').then( res => {
            setDataBase( res.data )
            setLoading( false )

        }).catch( err => {
            console.warn( err )
            Alert.alert('Erro ao pegar os pados')

            setLoading( false )

        })
    }

    useEffect(() => {
        loadDataBase()
    }, [])


    return (
        <View>
           <FlatList
                data={dataBase}
                renderItem={({item}) => loadProduct(item)}
                ListEmptyComponent={() => {
                    return (
                        <View>
                            {
                                loading ? <Text style={styles.text}>Carregando</Text> : <Text style={styles.text}>Nenhum item foi carregado KKKKK</Text>
                            }
                        </View>
                    )
                }}>
                    
           </FlatList>
        </View>
    )   
}

const styles = StyleSheet.create({

    text: {
        textAlign: 'center'
    },

    evaluate: {
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        textAlign: 'center',
        width: 100,
        marginTop: 7,
        borderRadius: 5
    },

    price: {
        color: 'red',
    },

    others: {
        color: 'gray',
    },

    productTitle: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    
    productInfo: {
        marginLeft: 20,
        flex: 1
    },

    productImage: {
        width: 100,
        height: 170,
    },

    productContainer: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginTop: 10
    }
})