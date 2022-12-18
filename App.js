import {Component} from "react";
import axios from "axios";
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Platform
} from "react-native";

export default class App extends Component {
    id='';
    name='';
    address='';
    salary=0;

    saveCustomer(){
        axios.post("http://localhost:3000/api/v1/customer/save",{
            id:this.id,
            name:this.name,
            address:this.address,
            salary:this.salary
        }).then((resp)=>{
            console.log(resp);
        }).catch(error=>{
            console.log(error);
        })
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.topOuter}>
                    <TextInput
                        onChangeText={(text)=>{this.id=text}}
                        defaultValue={this.id}
                        style={styles.input}
                        placeholder='Customer Id'
                    />
                    <TextInput
                        onChangeText={(text)=>{this.name=text}}
                        defaultValue={this.name}
                        style={styles.input}
                        placeholder='Name'
                    />
                    <TextInput
                        onChangeText={(text)=>{this.address=text}}
                        defaultValue={this.address}
                        style={styles.input}
                        placeholder='Address'
                    />
                    <TextInput
                        onChangeText={(text)=>{this.salary=Number.parseInt(text)}}
                        defaultValue={this.salary.toString()}
                        style={styles.input}
                        placeholder='Salary'
                    />

                    <View style={styles.buttonBar}>
                        <TouchableOpacity style={styles.button} onPress={()=>{this.saveCustomer()}}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Find</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Load All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        paddingTop: Platform.OS === 'ios' ? 25 : 20,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    topOuter: {
        flex: 1,
        padding: 10,
    },
    input: {
        width: '100%',
        height: 35,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 3,
        paddingLeft: 10,
        marginBottom: 10
    },
    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        padding: 10,
        borderRadius: 3,
        backgroundColor: '#2980b9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    }
})