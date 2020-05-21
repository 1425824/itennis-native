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
} from 'react-native';
const DeviceWidth = Dimensions.get('window').height;
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import App from '../App';
import Icon from 'react-native-vector-icons/AntDesign';


export default class Draw extends React.Component{

  constructor(){
    super()
    this.setBG1 = this.setBG1.bind(this)
    this.setBG2 = this.setBG2.bind(this)
    this.setBG3 = this.setBG3.bind(this)
    this.goToMenu = this.goToMenu.bind(this)
  }
 

  state= {
    page:3,
    bg:1,
  }  
  goToMenu(){
    this.setState({page:0})
  }

  setBG1(){
    this.setState({bg:1})
    console.log(this.state.bg)
  }
  setBG2(){
    this.setState({bg:2})
    console.log(this.state.bg)
  }
  setBG3(){
    this.setState({bg:3})
    console.log(this.state.bg)
  }

  render(){
    return (
      <>
      {this.state.page === 3 &&
      <View style={{flexDirection:'row'}}>
          <View>         
              <TouchableOpacity onPress={this.goToMenu}>
                <Icon style={{marginLeft:10, marginTop:10}} size={35} color='#22e96b' name="arrowleft" ></Icon>
              </TouchableOpacity>
          </View>

          {this.state.bg === 1 &&
        <View style={{ alignItems:'center',  position:"relative"}}>
          <View >
            <RNSketchCanvas 
            localSourceImage={{ filename: 'pissarra1.jpg', directory: RNSketchCanvas.MAIN_BUNDLE, mode: 'AspectFit' }}
            
            containerStyle={{backgroundColor:'transparent',flex:1}} 
            canvasStyle={{backgroundColor:'transparent',flex:1, width: Dimensions.get('window').width-200}}
            strokeComponent={color => (
              <View style={[{backgroundColor:color}, styles.strokeColorButton]} />
            )}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
            onClearPressed={() => {
              // Alert.alert('do something') clearrrrr
            }}
            undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
              onUndoPressed={(id) => {
                // Alert.alert('do something') undooooo
            }}
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View  style={{
                backgroundColor: 'white', marginHorizontal: 2.5,
                width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
                </View>
              )}}
            />
          </View>
        </View>
        }
        {this.state.bg === 2 &&
        <View style={{ alignItems:'center',  position:"relative"}}>
          <View >
            <RNSketchCanvas 
            localSourceImage={{ filename: 'pissarra2.jpg', directory: RNSketchCanvas.MAIN_BUNDLE, mode: 'AspectFit' }}
            
            containerStyle={{backgroundColor:'transparent',flex:1}} 
            canvasStyle={{backgroundColor:'transparent',flex:1, width: Dimensions.get('window').width-200}}
            strokeComponent={color => (
              <View style={[{backgroundColor:color}, styles.strokeColorButton]} />
            )}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
            onClearPressed={() => {
              // Alert.alert('do something') clearrrrr
            }}
            undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
              onUndoPressed={(id) => {
                // Alert.alert('do something') undooooo
            }}
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View  style={{
                backgroundColor: 'white', marginHorizontal: 2.5,
                width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
                </View>
              )}}
            />
          </View>
        </View>
        }
        {this.state.bg === 3 &&
        <View style={{ alignItems:'center',  position:"relative"}}>
          <View >
            <RNSketchCanvas 
            localSourceImage={{ filename: 'pissarra3.jpg', directory: RNSketchCanvas.MAIN_BUNDLE, mode: 'AspectFit' }}
            
            containerStyle={{backgroundColor:'transparent',flex:1}} 
            canvasStyle={{backgroundColor:'transparent',flex:1, width: Dimensions.get('window').width-200}}
            strokeComponent={color => (
              <View style={[{backgroundColor:color}, styles.strokeColorButton]} />
            )}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
            onClearPressed={() => {
              // Alert.alert('do something') clearrrrr
            }}
            undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
              onUndoPressed={(id) => {
                // Alert.alert('do something') undooooo
            }}
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View  style={{
                backgroundColor: 'white', marginHorizontal: 2.5,
                width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
                </View>
              )}}
            />
          </View>
        </View>
        }
        
      
        <View style={{ justifyContent:'center', backgroundColor:'#eceff1', width:Dimensions.get('window').height / 2 -60, }}>
          <TouchableOpacity onPress={this.setBG1}>
            <Image source={require('../img/pissarra1.jpg')} style={{height:DeviceWidth*0.2,  width:DeviceWidth*0.3, margin:3}}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.setBG2}>
            <Image source={require('../img/pissarra2.jpg')} style={{height:DeviceWidth*0.2,  width:DeviceWidth*0.3, margin:3}}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.setBG3}>
            <Image source={require('../img/pissarra3.jpg')} style={{height:DeviceWidth*0.2,  width:DeviceWidth*0.3, margin:3}}></Image>
          </TouchableOpacity>
        </View>

        </View>
      }

      {this.state.page === 0 &&
        <App></App>
      }
       
      </>
    );
  }
}

const styles = StyleSheet.create({
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  box:{
    width: Dimensions.get('window').height / 2 -60,
    height:190,
    alignItems: 'center',
    backgroundColor:'#ffffff',
    justifyContent: 'center',
  },
 
});


