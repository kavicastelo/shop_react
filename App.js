import {Component} from "react";
import axios from "axios";
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Modal, Image
} from "react-native";

export default class App extends Component {

    state={
        loading:false
}
    id='';
    name='';
    address='';
    salary=0;

    saveCustomer(){

        this.setLoadingState();
        axios.post("http://127.0.0.1:3000/api/v1/customer/save", {
            id: this.id,
            name: this.name,
            address: this.address,
            salary: this.salary
        }).then((resp) => {
            console.log(resp);
            this.clearTextFields();
            this.setLoadingState();
        }).catch(error => {
            console.log(error);
            this.setLoadingState();
        })
    }

    findCustomer(){

        this.setLoadingState();
        axios.get("http://127.0.0.1:3000/api/v1/customer/find", {
            params:{
                id:this.id
            }
        }).then((resp) => {
            console.log(resp);
            this.clearTextFields();
            this.setLoadingState();
        }).catch(error => {
            console.log(error);
            this.setLoadingState();
        })
    }

    updateCustomer(){

        this.setLoadingState();
        axios.put("http://127.0.0.1:3000/api/v1/customer/update", {
            name: this.name,
            address: this.address,
            salary: this.salary

        },{
            headers: {
                id: this.id
            }
        }).then((resp) => {
            console.log(resp);
            this.clearTextFields();
            this.setLoadingState();
        }).catch(error => {
            console.log(error);
            this.setLoadingState();
        })
    }

    deleteCustomer(){

        this.setLoadingState();
        axios.delete("http://127.0.0.1:3000/api/v1/customer/delete", {
            params:{
                id:this.id
            }
        }).then((resp) => {
            console.log(resp);
            this.clearTextFields();
            this.setLoadingState();
        }).catch(error => {
            console.log(error);
            this.setLoadingState();
        })
    }

    setLoadingState(){
        this.setState({loading:!this.state.loading})
    }

    clearTextFields(){
        this.id = '';
        this.name = '';
        this.address = '';
        this.salary = 0;
    }

    render() {

        const loading = this.state.loading;

        return (
            <View style={styles.body}>
                <Modal
                    transparent={true}
                    visible={loading}
                    animationType="fade"
                >
                    <View style={styles.modal}>
                        <View style={styles.loading}>
                            <Image
                                style={styles.loadingImg}
                                source='https://wpamelia.com/wp-content/uploads/2018/11/loading-hourglass.gif'/>
                        </View>
                    </View>
                </Modal>
                <View style={styles.topOuter}>
                    <TextInput
                        onChangeText={(text)=>{this.id=text}}
                        style={styles.input}
                        placeholder='Customer Id'
                    />
                    <TextInput
                        onChangeText={(text)=>{this.name=text}}
                        style={styles.input}
                        placeholder='Name'
                    />
                    <TextInput
                        onChangeText={(text)=>{this.address=text}}
                        style={styles.input}
                        placeholder='Address'
                    />
                    <TextInput
                        onChangeText={(text)=>{this.salary=Number.parseInt(text)}}
                        style={styles.input}
                        placeholder='Salary'
                    />

                    <View style={styles.buttonBar}>
                        <TouchableOpacity style={styles.button} onPress={()=>{this.saveCustomer()}}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{this.findCustomer()}}>
                            <Text style={styles.buttonText}>Find</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{this.updateCustomer()}}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{this.deleteCustomer()}}>
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
    },
    modal: {
        flex:1,
        backgroundColor:'rgba(44, 62, 80,0.3)',
        alignItems:'center',
        justifyContent:'center'
    },
    loading: {
        height:200,
        width:'80%',
        backgroundColor:'white',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    loadingImg: {
        width: 150,
        height:'100%'
    }
})