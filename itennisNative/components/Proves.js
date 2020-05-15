import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
const DeviceWidth = Dimensions.get('window').height;
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import App from '../App'
import StepIndicator from 'react-native-step-indicator';
import NumericInput from 'react-native-numeric-input';

const labels = ["Fase 1","Fase 2","Fase 3"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#22e96b',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#22e96b',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#22e96b',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#9999',
  labelSize: 13,
  currentStepLabelColor: '#22e96b'
}

const B = (props) => <Text style={{fontWeight:'bold'}}>{props.children}</Text>
export default class Proves extends React.Component{

  constructor(){
    super()
    this.goToMenu = this.goToMenu.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  

  state= {
    page:4,
    currentPosition: 0,
    total: new Array(20).fill(0),
    tecnica: new Array(20).fill(0),
    control:new Array(20).fill(0),
    finish: false,
  }  

  suma(a,b){
    return a+b; 
  }

  goToMenu(){
    this.setState({page:0})
  }
  onPageChange(position){
    this.setState({currentPosition: position})
  }

  handleChange(event, i ) {
        
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    //console.warn(value);

    var arrayTecnica = this.state.tecnica;
    arrayTecnica[i]= parseInt(value);
    this.setState({ tecnica: arrayTecnica });

    var arrayTotal2 = this.state.total;
    arrayTotal2[i] = this.suma(this.state.tecnica[i], this.state.control[i]);
    this.setState({total: arrayTotal2 })

    console.warn("tecnica:", this.state.tecnica);
    //console.warn("total:" , this.state.total);
    return true;
  }

  handleSelect(event, i) {
    //console.warn(event);
    var arrayControl = this.state.control;
    arrayControl[i] = event.value;

    this.setState({ control: arrayControl });

    var arrayTotal1 = this.state.total;
    arrayTotal1[i] = this.suma(this.state.tecnica[i], this.state.control[i]);
    this.setState({total: arrayTotal1 })


    console.warn("control:", this.state.control);
    return true;
  }

  render(){
    return (
      <>
        {this.state.page === 4 &&
        <ScrollView  >
          <View>         
              <TouchableOpacity>
                <Button title="Torna" onPress={this.goToMenu}></Button>
              </TouchableOpacity>
            </View>

          
          <Text style={styles.title}>Prova de nivell 1 (FET)</Text>
          <Text style={{marginTop:18, width: Dimensions.get('window').width -60, marginLeft:30}}>
            La prova consisteix en executar un seguit de cops dirigits a diferents zones de la pista. A excepció del servei, la pilota la posarà en joc l'examinador / tècnic. 
            Es realitzaran 4 repeticions de cada cop. Cada encert afegirà 1pt a la nota tècnica (1-10) basada en la apreciació del tècnic. Per superar la prova es necessitarà obtenir una valoració TÈCNICA superior a 80pts i una puntuació total superior a 120pts.
          </Text>

          {this.state.currentPosition === 0 &&
          <View style={{alignSelf:'center'}}>
            <View style={{flexDirection:'row', marginTop:20}}>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height-50, marginRight:2}}>Moviment</Text>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height/2-60,marginRight:2}}>Tècnica</Text>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height/2-60,marginRight:2}}>Control</Text>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height/2-60,marginRight:2}}>Sub-Total</Text>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={styles.box1}>
                <Text>SERVEI</Text>
              </View>
              <View style={{flexDirection:'column'}}>
                <View style={styles.box2}>
                  <Text>Esquerre</Text>
                </View>
                <View style={styles.box2}>
                  <Text>Dreta</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>1er servei</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>2on servei</Text>
                </View>
                <View style={styles.box3}>
                  <Text>1er servei</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>2on servei</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 0)} value={this.state.tecnica[0]} ></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 1)} value={this.state.tecnica[1]}></TextInput>
                </View>
                <View style={styles.box3}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 2)} value={this.state.tecnica[2]}></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 3)} value={this.state.tecnica[3]}></TextInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus'totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>{this.state.total[0]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[1]}</Text>
                </View>
                <View style={styles.box3}>
                  <Text>{this.state.total[2]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[3]}</Text>
                </View>
              </View>
            </View>


            <View style={{flexDirection:'row', marginTop:10, marginBottom:20}}>
              <View style={styles.box1}>
                <Text>DRETA</Text>
              </View>
              <View style={{flexDirection:'column'}}>
                <View style={styles.box2}>
                  <Text>Creuada</Text>
                </View>
                <View style={styles.box2}>
                  <Text>Paral·lela</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>Llarga</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>Curta</Text>
                </View>
                <View style={styles.box3}>
                  <Text>Llarga</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>Curta</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 4)} value={this.state.tecnica[4]}></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 5)} value={this.state.tecnica[5]}></TextInput>
                </View>
                <View style={styles.box3}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 6)} value={this.state.tecnica[6]}></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 7)} value={this.state.tecnica[7]}></TextInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus'totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>{this.state.total[4]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[5]}</Text>
                </View>
                <View style={styles.box3}>
                  <Text>{this.state.total[6]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[7]}</Text>
                </View>
              </View>
            </View>
            
          </View>
          }



        {this.state.currentPosition === 1 &&
          <View style={{alignSelf:'center'}}>
            <View style={{flexDirection:'row', marginTop:20}}>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height-50, marginRight:2}}>Moviment</Text>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height/2-60,marginRight:2}}>Tècnica</Text>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height/2-60,marginRight:2}}>Control</Text>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height/2-60,marginRight:2}}>Sub-Total</Text>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={styles.box1}>
                <Text>REVÉS</Text>
              </View>
              <View style={{flexDirection:'column'}}>
                <View style={styles.box2}>
                  <Text>Creuat</Text>
                </View>
                <View style={styles.box2}>
                  <Text>Paral·lel</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>Llarg</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>Curt</Text>
                </View>
                <View style={styles.box3}>
                  <Text>Llarg</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>Curt</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 8)} value={this.state.tecnica[8]}></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 9)} value={this.state.tecnica[9]}></TextInput>
                </View>
                <View style={styles.box3}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 10)} value={this.state.tecnica[10]}></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 11)} value={this.state.tecnica[11]}></TextInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus'totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>{this.state.total[8]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[9]}</Text>
                </View>
                <View style={styles.box3}>
                  <Text>{this.state.total[10]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[11]}</Text>
                </View>
              </View>
            </View>


            <View style={{flexDirection:'row', marginTop:10, marginBottom:20}}>
              <View style={styles.box1}>
                <Text>VOLEES</Text>
              </View>
              <View style={{flexDirection:'column'}}>
                <View style={styles.box2}>
                  <Text>Dreta</Text>
                </View>
                <View style={styles.box2}>
                  <Text>Revés</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>Llarga</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>Curta</Text>
                </View>
                <View style={styles.box3}>
                  <Text>Llarga</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>Curta</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 12)} value={this.state.tecnica[12]}></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 13)} value={this.state.tecnica[13]}></TextInput>
                </View>
                <View style={styles.box3}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 14)} value={this.state.tecnica[14]}></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 15)} value={this.state.tecnica[15]}></TextInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus'totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>{this.state.total[13]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[14]}</Text>
                </View>
                <View style={styles.box3}>
                  <Text>{this.state.total[15]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[16]}</Text>
                </View>
              </View>
            </View>
            
          </View>
          }
          
          
          {this.state.currentPosition === 2 &&
          <View style={{alignSelf:'center'}}>
            <View style={{flexDirection:'row', marginTop:20}}>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height-50, marginRight:2}}>Moviment</Text>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height/2-60,marginRight:2}}>Tècnica</Text>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height/2-60,marginRight:2}}>Control</Text>
              <Text style={{backgroundColor:'#22e96b',padding:4, color:'white', fontWeight:'bold', width:Dimensions.get('window').height/2-60,marginRight:2}}>Sub-Total</Text>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={styles.box1}>
                <Text>ESMAIXADA</Text>
              </View>
              <View style={{flexDirection:'column'}}>
                <View style={styles.box2}>
                  <Text>Amb bot</Text>
                </View>
                <View style={styles.box2}>
                  <Text>Sense bot</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>Llarga</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>Curta</Text>
                </View>
                <View style={styles.box3}>
                  <Text>Llarga</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>Curta</Text>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 16)} value={this.state.tecnica[16]}></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 17)} value={this.state.tecnica[17]}></TextInput>
                </View>
                <View style={styles.box3}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 18)} value={this.state.tecnica[18]}></TextInput>
                </View>
                <View style={styles.box3l}>
                <TextInput style={styles.input} keyboardType='numeric' maxLength={10} onChange= {(e) => this.handleChange(e, 19)} value={this.state.tecnica[19]}></TextInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus'totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
                <View style={styles.box3l}>
                  <NumericInput type='plus-minus' totalHeight={30} maxValue={4} minValue={0}></NumericInput>
                </View>
              </View>

              <View style={{flexDirection:'column'}}>
                <View style={styles.box3}>
                  <Text>{this.state.total[17]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[18]}</Text>
                </View>
                <View style={styles.box3}>
                  <Text>{this.state.total[19]}</Text>
                </View>
                <View style={styles.box3l}>
                  <Text>{this.state.total[20]}</Text>
                </View>
              </View>
            </View>
            
          </View>
          }

          { this.state.total < 0 ? 0:this.state.total &&
            <Text style={{alignSelf:'center'}}><B>Tècnica (min. 80pts): {this.state.tecnica.reduce(function(a,b) {return a+b;}) }  </B> </Text>
          }

          { this.state.total < 0 ? 0:this.state.total &&
            <Text style={{alignSelf:'center', marginBottom:20}}><B>Total: {this.state.total.reduce(function(a,b) {return a+b;}) } /240 </B> </Text>
          }


          <View style={styles.container,{marginBottom:20}}>
            <StepIndicator 
              stepCount={3}
              direction='horizontal'
              customStyles={customStyles}
              currentPosition={this.state.currentPosition}
              labels={labels}
               />
          </View>
        </ScrollView>
        }

        {this.state.page === 0 &&
          <App></App>
        }
        
      </>
    );
  }
}

const styles = StyleSheet.create({

  input:{
    height:30,
    borderColor:'gray',
    borderWidth:1,
    width: Dimensions.get('window').height / 2 -80,
  },
  box1:{
    backgroundColor: '#f2f2f2',
    width: Dimensions.get('window').height / 2 -100,
    alignItems:'center',
    height: Dimensions.get('window').height / 3,
    justifyContent:'center'
  },
  box2:{
    backgroundColor: '#f2f2f2',
    width: Dimensions.get('window').height / 2 -100,
    alignItems:'center',
    height: Dimensions.get('window').height / 6,
    justifyContent:'center',
    marginLeft:2,
    marginBottom:1,
  },
  box3:{
    backgroundColor: '#f2f2f2',
    width: Dimensions.get('window').height / 2 -60,
    alignItems:'center',
    height: Dimensions.get('window').height /12,
    justifyContent:'center',
    marginLeft:2,
    marginBottom:1,
  },
  box3l:{
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').height / 2 -60,
    alignItems:'center',
    height: Dimensions.get('window').height /12,
    justifyContent:'center',
    marginLeft:2,
    marginBottom:1,
  },
  scrollContainer:{
    flex:1,
  },
  title:{
    fontSize:16,
    fontWeight:'bold',
    alignSelf:'center'
  },
  container:{
    backgroundColor:'transparent',
    justifyContent:'center'
  },
  box:{
    
    width: Dimensions.get('window').height / 2 -60,
    height:190,
    alignItems: 'center',
    backgroundColor:'#ffffff',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


