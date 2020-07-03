import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import Time from '../../assets/icons/time.svg'
import Medical from '../../assets/icons/medical.svg'
import Travel from '../../assets/icons/airplane.svg'
import Other from '../../assets/icons/checklist.svg'

export default class RequestReimbursement extends Component {
    constructor(props){
        super(props);
          this.moveToDayOff = this.moveToDayOff.bind(this);
          this.moveToOvertime = this.moveToOvertime.bind(this);
          this.moveToRequestEmbursement = this.moveToRequestEmbursement.bind(this)
        }
    moveToDayOff(){
      this.props.navigation.navigate('DayOff')
    }

    moveToRequestEmbursement() {
      this.props.navigation.navigate('MedicalReimbursement')
    }

    moveToOvertime() {
      this.props.navigation.navigate('Overtime')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1, marginLeft:25}}>
                    <Text style={styles.text2}>
                        Reimbursement
                    </Text>
                </View>
                <View style={{flex:7, flexDirection:'row',alignSelf:'center',padding: 10}}>
                    <Card containerStyle={styles.card}>
                    <TouchableOpacity style={styles.Button} onPress={this.moveToRequestEmbursement}>
                        <Medical width={70} height={70} />
                        <Text style={styles.text}>Medical</Text>
                    </TouchableOpacity>
                    </Card>
                    <Card containerStyle={styles.card}>
                    <TouchableOpacity style={styles.Button} >
                        <Travel width={70} height={70}/>
                        <Text style={styles.text}>Travel</Text>
                    </TouchableOpacity>
                    </Card>
                     
                </View>
                <View style={{flex:11, flexDirection:'row',alignSelf:'center'}}>
                    <Card containerStyle={styles.card}>
                    <TouchableOpacity style={styles.Button} onPress={this.moveToOvertime} >
                        <Time width={70} height={70} />
                        <Text style={styles.text}>Overtime</Text>
                    </TouchableOpacity>
                    </Card>
                    <Card containerStyle={styles.card}>
                    <TouchableOpacity style={styles.Button} >
                        <Other width={70} height={70}/>
                        <Text style={styles.text}>Other</Text>
                    </TouchableOpacity>
                    </Card>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F9FCFF',
    },
    card:{
        width:160, height:160, justifyContent:'center', alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius:7,
    },
    Button:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
    },
    text:{
        fontFamily:'Nunito-Bold', fontSize:16, fontWeight:'600', marginLeft:5,  color:'#505050', paddingTop:13
    },
    text2:{
        fontFamily:'Nunito-Bold', fontSize:20, fontWeight:'600', marginLeft:5,  color:'#505050', paddingTop:13
    }
})