import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, BackHandler,Picker, TextInput, ToastAndroid, RefreshControl, SafeAreaView, ScrollView } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Url_Clockin, Url_Fake} from '../config/URL'
import axios from 'axios';
import moment from 'moment';
import deviceStorage from '../services/deviceStorage';
import AsyncStorage from '@react-native-community/async-storage';

//Fromm sick
export default class DetailMedical extends Component {
constructor(props){
        super(props);
        this.state = {

            startDate: new Date(),
            dateStart: '',
            endDate: new Date(),
        
            show1: false,
            show2: false,
            backPressed: 0,   
            tanggal:'',
            desc:'',
        }
        this.showDatepicker1 = this.showDatepicker1.bind(this)
        this.onBack = this.onBack.bind(this);

        this.onBack = this.onBack.bind(this);

        this.submitAll = this.submitAll.bind(this);

  
      }

       onBack = () => {
         this.setState({
           backPressed: this.state.backPressed + 1
         })

         if (this.state.backPressed % 2 === 1) {
           this.props.navigation.goBack();
           return true;
         }
       };


        async submitAll() {
          const value = await AsyncStorage.getItem('clockin_state2');
          const location = await AsyncStorage.getItem('location');
          const sickValue = await AsyncStorage.getItem('sick_submit');

        if (this.state.dateStart === '' || this.state.desc === '') {
            alert('All form must be filled!');
          } else if (this.state.dateStart !== '' && this.state.desc !== '') {
            axios({
                method: 'POST',
                url: Url_Fake,
                headers: {
                  'accept': 'application/json',
                  'Authorization': 'Bearer ' + this.props.tokenJWT
                },
                data: {
            
                  Date:this.state.dateStart,
                  Desc:this.state.desc
                }
              }).then((response) => {
                console.log('Success: Submit sick data')
                // this.props.addClockin(false, ' ', this.state.idUser, this.state.status);
                // this.setState({
                //   idUser: response.data.Id,
                // });
                // deviceStorage.saveItem("sick_submit", "1");
                // deviceStorage.saveItem("sick_submit_day", moment().format('dddd'));

                // this.props.addLoad(true)
                // if (this.state.permission === 1) {
                //   this.props.navigation.dispatch(
                //     CommonActions.reset({
                //       index: 1,
                //       routes: [{
                //         name: 'HomeHD'
                //       }, ],
                //     })
                //   )
                // } else if (this.state.permission === 2) {
                //   this.props.navigation.dispatch(
                //     CommonActions.reset({
                //       index: 1,
                //       routes: [{
                //         name: 'Home'
                //       }, ],
                //     })
                //   )
                // }
                ToastAndroid.showWithGravity(
                  'Submit success!',
                  ToastAndroid.SHORT,                            
                  ToastAndroid.BOTTOM,
                );
              })
              .catch((errorr) => {
                console.log('Error: Submit sick data')
                ToastAndroid.showWithGravity(
                  'Submit fail!',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                );
              });
          }
        }
  






      showDatepicker1 = () => {
        this.setState({
            show1: true
        })
    };

     render() {
           const { show1, show2 } = this.state
                return (
        <SafeAreaView style={styles.container2}>
      <ScrollView>
        <View style={styles.textareaContainer}>
                    <Text style={styles.text2}>
                       Medical Reimbursement Request
                    </Text>
                </View>
                     <Text style={styles.textSM}>
                    Request
                </Text>
                      <Text
                      style={styles.TextDate}>
                        Division
                    </Text>  
                <View style={styles.viewPicker}>   
                         
                  <Picker
                    mode={"dropdown"}
                    selectedValue={this.state.headDivision}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({headDivision: itemValue})
                    }>
                    <Picker.Item label="" value="" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
                <View style={styles.viewDate1}>
                    <Text
                      style={styles.TextDate}>
                        Date Incurred
                    </Text> 
                    
                    <View style={styles.viewDate2}>
                      <View style={styles.viewDate3}>
                        <View style={{flex:4, justifyContent:'center',}}>
                          <Text style={{marginLeft:10, fontSize:15}}>{this.state.dateStart}</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center'}}>
                          <FontAwesome5 style={styles.iconDate} name='calendar' size={25} color='#1A446D' onPress={this.showDatepicker1}/>  
                        </View>              
                      </View>
                    </View>
                    {show1 && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.startDate}
                        mode={'date'}
                        display="calendar"
                        onChange={(event, selectedDate) => {
                            const date = selectedDate.toString()
                            this.setState({
                                startDate: selectedDate,
                                dateStart: date.substr(0, 15),
                                show1: false
                            })
                        }}    
                    />
                    )}
                </View>
                   <Text
                      style={styles.TextDate}>
                        Description Request
                    </Text> 
                   <TextInput
                    multiline={true}
                    placeholder="tell us about your health issue"
                    maxLength={200} 
                    style={styles.textInput}
                    onChangeText={text => this.setState({desc: text})}
                    value={this.state.desc}>
                </TextInput>

<Text
                  style={styles.textSM}>
                   Total Expense
                </Text>
                <TextInput
                    multiline={true}
                    maxLength={200}
                    placeholder="" 
                    style={styles.inputText}
                    onChangeText={text => this.setState({message: text})}
                    value={this.state.message}>
                </TextInput>  
               
                       <View style={{flex:1, marginTop:30}}>
                  <TouchableOpacity onPress={this.submitAll} style={styles.buttonSubmit}>
                      <Text style={styles.textbtnSubmit} >Submit</Text>
                  </TouchableOpacity>
                </View>

                  </ScrollView>    
                </SafeAreaView>
                )
                }
    }


const styles = StyleSheet.create({
  container2:{
    flex: 1,
    backgroundColor:'#F9FCFF',
  },
  textareaContainer: {fontSize:20, marginLeft:21, fontWeight:'600', fontFamily:'Nunito-SemiBold', color:'#505050', paddingTop:10},
   textSM:{
    marginTop: 16,
    marginBottom:10,
    paddingLeft:20,
    fontSize:16,
    fontWeight:'300', fontFamily:'Nunito-Light'
  },
  text1:{
    fontSize:16, fontWeight:'300', fontFamily:'Nunito', marginLeft:22, marginTop:10
  },
  text2:{
    fontSize:20, fontWeight:'300', fontFamily:'Nunito', marginLeft:5, marginTop:10
  },
  TextDate:{
    fontWeight:'300', fontFamily:'Nunito-Light',marginLeft:22, marginBottom:3
  },
  textInput:{
    paddingLeft:10, paddingRight:10,height:200, borderColor: '#505050', textAlignVertical: 'top', borderWidth: 1, marginLeft:20, borderColor:'#505050', width:'90%', borderRadius:5, backgroundColor:'white', fontSize:18
  },
  viewPicker:{
    width:'90%', flex:1.5, borderRadius:5, borderColor:'#505050', borderWidth:1, backgroundColor:'white', alignSelf:'center',marginTop:12
  },
  picker:{
    height: '100%', width: '100%', borderWidth:20, borderColor:'#505050'
  },
   Split:{
     flex: 0.3,
     flexDirection: 'row',
     marginTop: 16,
   },
   inputText:{
    textAlignVertical: 'top', borderWidth: 1, borderRadius:5, width:'90%', height:'9%',backgroundColor:'white', fontSize:18, borderColor:'#505050', alignSelf:'center', paddingLeft:10, paddingRight:10
  },
  buttonSubmit:{
    marginTop:40, backgroundColor:'#1A446D', height:50, width:'90%', borderRadius:5, alignSelf:'center'
  },
  textbtnSubmit:{
    color:'white', fontSize: 20, fontWeight:'600', textAlign:'center',textAlignVertical: "center", flex:1, fontFamily:'Nunito-SemiBold', marginBottom:7 
  },
  viewDate1:{
    flex:1,
  },
  viewDate2:{
    flexDirection:'row',flex:1, marginLeft:22, width:'80%',
  },
  viewDate22:{
    flexDirection:'row',flex:1, marginLeft:18, width:'80%',
  },
  viewDate3:{
    height:'100%', width:'100%', borderColor:'#505050', borderWidth:1, borderRadius:5, flexDirection:'row', backgroundColor:'#FFFFFF'
  },
  textinputDate:{
    height:'100%', borderWidth: 1, backgroundColor:'white',borderRadius:5, fontSize:18
  },
  iconDate:{
    alignSelf:'flex-end', marginRight:7, marginBottom:10, marginTop:8
  }
});