import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, BackHandler,Picker, TextInput, ToastAndroid, RefreshControl, SafeAreaView, ScrollView } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import MonthSelectorCalendar from 'react-native-month-selector';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default class MedicalReimbursement extends Component {
constructor(props){
        super(props);
        this.state = {
          tableHead: ['Submmited', 'Category', 'Status', 'Action'],
          tableData: [
            ['June  ', 'Mecal', 'Approved', 'Tools'],
            ['April 25 2020', 'Medical', 'Rejected', 'Tools'],
            
          ],
      startDate: new Date(),
        dateStart: '',
        endDate: new Date(),

        show1: false,
        }
           this.showDatepicker1 = this.showDatepicker1.bind(this)
   



        this.moveToForm = this.moveToForm.bind(this)
         this.onButtonPress = this.onButtonPress.bind(this);
        }


        showDatepicker1 = () => {
          this.setState({
            show1: true
          })
        };

         moveToForm() {
             this.props.navigation.navigate('FormMedical')
           }
           onButtonPress = () => {
             this.props.navigator.push({
               name: 'DetailMedical',
               title: 'Home',
             });
           }
       _alertIndex(index) {
        Alert.alert(
  'Tools',
  'Silahkan Pilih Aksi',
  [
  
    
    {
      text: 'Detail',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel'
    },
    { text: 'Print', onPress: () => console.log('OK Pressed') }
  ],
  { cancelable: false }
);
   
   
        }
     render() {
       const state = this.state;
       const { show1, show2 } = this.state
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Tools</Text>
        </View>
      </TouchableOpacity>
    );
        return (
        <SafeAreaView style={styles.container2}>
      <ScrollView>
        <View style={styles.textareaContainer}>
                    <Text style={styles.text2}>
                        Medical Reimbursement
                    </Text>
                </View>
                     <Text style={styles.textSM}>
                    Status
                </Text>
                <View style={styles.viewPicker}>            
                  <Picker
                    mode={"dropdown"}
               
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({reason: itemValue})
                    }>
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="Approved" value="Approved" />
                    <Picker.Item label="Declined " value="Declined" />
                    
                  </Picker>
                </View>     
                    <Text style={styles.textSM}>
                    Sort by
                </Text>
                <View style={styles.viewPicker}>            
                  <Picker
                    mode={"dropdown"}
               
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({reason: itemValue})
                    }>
                    <Picker.Item label="Newest To Oldest" value="Newest To Oldest" />
                    <Picker.Item label="Oldest To Newest" value="Oldest To Newest" />
                 
                    
                  </Picker>

                
                </View> 
                        <View style={styles.viewDate1}>
                    <Text
                      style={styles.TextDate}>
                        Date Searching
                    </Text> 
                    
                    <View style={styles.viewDate2}>
                      <View style={styles.viewDate3}>
                        <View style={{flex:4, justifyContent:'center',}}>
                          <Text style={{marginLeft:10, fontSize:15}}>{this.state.dateStart}</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center'}}>
                          <FontAwesome5 style={styles.iconDate} name='spinner' size={25} color='#1A446D' onPress={this.showDatepicker1}/>  
                        </View>              
                      </View>
                    </View>
                    {show1 && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.startDate}
                        mode={'date'}
                        display="calendar"
                                format = "MM-YYYY"
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
            
                <View style={styles.containers}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.heads} textStyle={styles.texts}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.rows}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.texts}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
                 <TouchableOpacity onPress={this.moveToForm} style={styles.buttonSubmit}>
                    <Text style={styles.textbtnSubmit} >Request</Text>
                </TouchableOpacity>
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
  //table style
  containers: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  heads: { height: 40, backgroundColor: '#808B97' },
  texts: { margin: 6 },
  rows: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btns: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnTexts: { textAlign: 'center', color: '#fff' },
//end style table
  textareaContainer: {fontSize:20, marginLeft:21, fontWeight:'600', fontFamily:'Nunito-SemiBold', color:'#505050', paddingTop:10},
   textSM:{
    marginTop: 16,
    marginBottom:10,
    paddingLeft:20,
    fontSize:16,
    fontWeight:'300', fontFamily:'Nunito-Light'
  },
    viewDate1:{
    flex:1,
  },
  viewDate2:{
    flexDirection:'row',flex:1, marginLeft:22, width:'100%',
  },
  viewDate22:{
    flexDirection:'row',flex:1, marginLeft:18, width:'80%',
  },
  viewDate3:{
    height:'100%', width:'100%', borderColor:'#505050', borderWidth:1, borderRadius:5, flexDirection:'row', backgroundColor:'#FFFFFF'
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
    marginTop:40, backgroundColor:'#1A446D', height:50, width:'50%', borderRadius:5, alignSelf:'center'
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