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
  Navigator,
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
import App from '../App';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
/*
const CONTENT =[
  {title: 'hola',
  content: 'nosecom hacer esto',
  }
 ];*/
 const routeIm =[];
 const B = (props) => <Text style={{fontWeight:'bold'}}>{props.children}</Text>
export default class Expage extends React.Component{

  constructor(){
    super()

    this.goToMenu = this.goToMenu.bind(this)
    this.formatContent = this.formatContent.bind(this)
  }
 
  state= {
    prova: false,
    page:1, 
    activeSections:[0],
    aux:[],
    title: "",
    descriptions:[] ,
    materials: [],
    observacions:[] ,
    duracio: [],
    imgs: ["init"],
    cont:[],
  }  

  goToMenu(){
    this.setState({page:0})
  }
  async componentDidMount(){
    await axios.get('http://localhost:8000/exs')
      .then(res => {
        const aux = res.data;
        this.setState({aux: res.data.map((item) => item.label)})
        //console.log(this.stateaux)
      })

      await axios.get('http://localhost:8000/exlist')
      .then(res => {
          this.setState({
              descriptions: res.data.map((item) => item.exDescription),
              materials: res.data.map((item) => item.exMaterials),
              observacions: res.data.map((item) => item.exObservations),
              duracio: res.data.map((item) => item.exEstimatedTime),
              imgs: res.data.map((item) => item.exImage),
          });
      })
      console.log(this.state.descriptions)
      
      setTimeout(()=> this.formatContent() , 100)
}

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };
 
  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };
 
  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Image style={{height:175, width:325, marginLeft:12}} source={{uri:section.im}}></Image>
        <View style={{width:Dimensions.get('window').height-10, marginLeft:12, marginRight:12 }}>
          <Text style={styles.exdetails}><B>Duració: </B>{section.dur}min.</Text>
          <Text style={styles.exdetails}><B>Descripció: </B>{section.des}</Text>
          <Text style={styles.exdetails}><B>Materials: </B>{section.mat}</Text>
          <Text style={styles.exdetails}><B>Observacions: </B>{section.obs}</Text> 
        </View>
      </View>
    );
  };

  formatContent(){
    var contenido=[];
    for (var i =0; i<this.state.aux.length; i++){
      contenido.push({title: this.state.aux[i],
                      des: this.state.descriptions[i],
                      mat: this.state.materials[i],
                      obs: this.state.observacions[i],
                      im:  this.state.imgs[i],
                      dur: this.state.duracio[i]});
      
    }
    this.setState({cont: contenido})
  }
 
  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render(){
    const {aux} = this.state.aux;
    return (
      <>
      {this.state.page === 1 &&
          <ScrollView>         
            <TouchableOpacity>
              <Button title="Torna" onPress={this.goToMenu}></Button>
            </TouchableOpacity>
          
            <View style={styles.colapsible}>
              <Accordion
                sections={this.state.cont}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
                align={'center'}
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
  exdetails:{
    fontSize:16,
  },
  headerText:{
    fontSize:16,
    fontWeight:'bold',
    margin:8,
  },
  header:{
    backgroundColor:'#eceff1',
  },
  colapsible:{
    alignSelf:'center',
    marginLeft: Dimensions.get('window').height-380,
    marginRight: Dimensions.get('window').height-380,
  },
  content:{
    backgroundColor:'#eceff1',
    flexDirection:'row'
  },
  scrollContainer:{
    flex:1,
  },
  container:{
    margin:4,
    marginTop:14,
    flex:1,
    flexDirection:'row',
    flexWrap: 'wrap',
    backgroundColor:'grey',
    alignItems:'center',
    alignSelf:'center',
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
});


