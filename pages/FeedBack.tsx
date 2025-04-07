import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, ViewStyle, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState, useSyncExternalStore } from "react";
import axios from "axios";


type CheckBoxProps = {
    state?: boolean
    size: number
    onPress?: React.Dispatch<React.SetStateAction<boolean>>
}

function CheckBox({state = false, size, onPress}:CheckBoxProps){

    function handlePress () {
        onPress?.( !state )
    }

    return (
        <TouchableOpacity style={[styles.checkBox, {width:size, height: size}]} onPress={handlePress}>
            {
                (state && <MaterialCommunityIcons 
                    name="check"
                    size={size-5}
                />)
            }
        </TouchableOpacity>
    )
}

type ChoiceItemProps = {
    value: string
    label: string
    state?: boolean
    Alert?: ( name:string ) => void
    index?: number
}

function ChoiceItem({label: name, state = false, Alert = () => {}, value}:ChoiceItemProps) {
    
    const style = state? {backgroundColor:'rgb(221, 221, 250)'} : {backgroundColor: '#ddd'}

    return (
        <TouchableOpacity onPress={() => Alert( value )}>
            <Text style={[styles.selectBtn, style]}>{name}</Text>
        </TouchableOpacity>
    )
}

type OptionPickerProps = {
    defaultValue: number
    value: string
    style?: ViewStyle
    children: React.ReactElement<ChoiceItemProps>[]
    onSelectionChange: React.Dispatch<React.SetStateAction<string>>
}

const OptionPicker:React.FC<OptionPickerProps> = (
    { children, style, onSelectionChange, value}: OptionPickerProps) => {

    const Alert = ( name:string ) => {
        onSelectionChange( name )
    }

    return (
        <View style={style}>
            {React.Children.map(children, (child, index) => {

                return React.cloneElement(child, {
                    state: child.props.label === value,
                    index,
                    Alert
                })
            })}
        </View>
    )
    
}

// type EvaluationProps = {
//     id?: number
//     name: string
//     email: string
//     feedback: string
//     experience: string
//     recommend: boolean
//     productId: number
// }

export default function Evaluate(){

    const [ state, setState ] = useState( false )
    const [ option, setOption ] = useState('')

    const [ userName, setUserName ] = useState('')
    const [ email, setEmail ] = useState('')

    const [userExperience, setUserExperience] = useState('')

    const [saving, setSaving] = useState( false )

    // useEffect( () => console.warn( option ), [option])

    function clearData(){
        setState(false)
        setOption('')
        setUserName('')
        setEmail('')
        setUserExperience('')
    }

    function saveUserFeedBack(){
        setSaving( true )

        axios.post('http://localHost:3000/evaluations', {
            name: userName,
            email: email,
            feedBack: userExperience,
            experience: option,
            recomend: state,
            productId: Date.now()
        }).then( () => {

            Alert.alert('Feedback salvo')

            clearData()
            
            setSaving( false )

        }).catch( err => {

            setSaving( false )

            Alert.alert('Erro ao salvar')
            console.error(err)
        })
    }

    function validateData(){

        if( userName.trim() == '' ){
            Alert.alert('Nome inválido')
        } else 

        if( email.trim() == '' ){
            Alert.alert('Email inválido')
        } else 

        if( userExperience.trim() == ''){
            Alert.alert('Nos diga sobre sua experiência com o produto.')
        } else
        
        if( option == '') {
            Alert.alert('Nos dia se sua experiência foi feliz, boa, média ou ruim')
        } else {

            saveUserFeedBack()
        }

    }

    return (
        <View>
            {
                saving ? <Text style={{textAlign:'center', fontSize: 20}}>Salvando...</Text> :<>

            <View style={styles.header}>
                <Text style={styles.title}>Nos dê seu FeedBack</Text>
                <Text style={styles.subtitle}>Sua opinião é importante para nós. Por favor, compartilhe sua experiência</Text>
            </View>

            <View style={styles.inputsContainer}>
                <TextInput style={styles.textInput} placeholder="Seu nome" value={userName} onChangeText={setUserName}></TextInput>
                <TextInput style={styles.textInput} placeholder="Seu email" value={email} onChangeText={setEmail}></TextInput>

                <TextInput style={[styles.textInput, {height: 120}]} placeholder="Descreva sua experiência" onChangeText={setUserExperience}></TextInput>
            </View>

            <View style={styles.inputsContainer}>
                <Text style={styles.subtitle}>Compartilhe sua experiência</Text>

                <OptionPicker style={styles.experiences} onSelectionChange={setOption} value={option} defaultValue={0}>
                    
                    {['Feliz', 'Bom', 'Médio', 'Ruim'].map( 

                        (item, i) => <ChoiceItem label={item} value={item} key={i}/>

                    )}

                </OptionPicker>

                <View style={styles.checkBoxContainer}>
                    <CheckBox size={25} state={state} onPress={setState} />
                    <Text>Recomenda para outras pessoas?</Text>
                </View>

                <TouchableOpacity style={styles.btnContainer} onPress={validateData}>
                    <Text style={styles.btn}>Enviar FeedBack</Text>
                </TouchableOpacity>

                </View>
                </>}
        </View>
    )

}

const styles = StyleSheet.create({
    // : {},

    btn: {
        marginHorizontal: 50,
        color: 'white',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center'
    },

    btnContainer: {
        margin: 40,
        backgroundColor: "#67aeff",
    },

    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 20
    },

    checkBox: {
        borderWidth: 2,
        borderBlockColor: 'gray',
        borderRadius: 3
    },

    desactived: {
        color: 'red'
    },

    actived: {
        color: 'lime'
    },

    selectBtn: {
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 10,
        color: ''
    },

    experiences: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    inputsContainer: {
        padding: 20
    },

    footer: {
        backgroundColor: 'red',
        padding: 10 
    },

    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 10
    },

    subtitle: {
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
        color: 'gray'
    },

    title: {
        fontSize: 25,
        textAlign: 'center'
    },

    header: {
        width: "100%",
    },
})