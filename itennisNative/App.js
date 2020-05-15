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
import Proves from './components/Proves';
import Expage from './components/Expage';
import Draw from './components/Draw';
import Reports from './components/Reports';

export default class App extends React.Component{

  state={
    page:0,
  }
  constructor(){
    super()
    this.goToExs = this.goToExs.bind(this)
    this.goToReports = this.goToReports.bind(this)
    this.goToDraw = this.goToDraw.bind(this)
    this.goToTests = this.goToTests.bind(this)
 
  }
  
  goToExs() {
    this.setState({page: 1}) 
    console.log(this.state.page)
  }
  goToReports() {
    this.setState({page: 2}) 
    console.log(this.state.page)
  }
  goToDraw() {
    this.setState({page: 3}) 
    console.log(this.state.page)
  }
  goToTests() {
    this.setState({page: 4}) 
    console.log(this.state.page)
  }


  render(){
    return (
      <>
      {this.state.page === 0 &&
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}> 
        <View>
          <View style={styles.box} >
            <TouchableOpacity onPress={this.goToExs}>
              <Image source={require('./img/ejicon.png')} style={{height:DeviceWidth*0.25,  width:DeviceWidth*0.25,alignSelf:'center'}}></Image>
              <Text style={{alignSelf:'center',fontSize:18}}>Consulta exercicis</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.box} >
            <TouchableOpacity onPress={this.goToDraw}>
              <Image source={require('./img/draw.png')} style={{height:DeviceWidth*0.25,  width:DeviceWidth*0.25,alignSelf:'center'}}></Image>
              <Text style={{alignSelf:'center',fontSize:18}} >Mode pissarra</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.box} >
            <TouchableOpacity onPress={this.goToReports} >
              <Image source={require('./img/informes.png')} style={{height:DeviceWidth*0.25,  width:DeviceWidth*0.25,alignSelf:'center'}}></Image>
              <Text style={{alignSelf:'center',fontSize:18}} >Generar informes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.box} >
            <TouchableOpacity onPress={this.goToTests}>
              <Image source={require('./img/test.png')} style={{height:DeviceWidth*0.25,  width:DeviceWidth*0.25,alignSelf:'center'}}></Image>
              <Text style={{alignSelf:'center',fontSize:18}}>Proves de nivell</Text>
            </TouchableOpacity>
          </View>
        </View>

        </View>
      </ScrollView>}

      {this.state.page === 1 &&
      <View>
        <Expage></Expage>
      </View>}

      {this.state.page === 2 &&
      <View>
        <Reports></Reports>
      </View>}

      {this.state.page === 3 &&
      <View>
        <Draw></Draw>
      </View>}

      {this.state.page === 4 &&
      <View>
        <Proves></Proves>
      </View>}
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer:{
    alignContent:'center'
  },
  container:{
    margin:4,
    marginTop:14,
    flex:1,
    flexDirection:'row',
    flexWrap: 'wrap',
    backgroundColor:'grey',
    alignSelf:'center',
  },
  box:{
    width: Dimensions.get('window').height / 2 +80,
    height:190,
    alignItems: 'center',
    backgroundColor:'#ffffff',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },

});


