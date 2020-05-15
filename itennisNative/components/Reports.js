import React, { Children } from 'react';
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
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Button from 'apsl-react-native-button';

export default class Proves extends React.Component{

  constructor(){
    super()
    this.goToMenu = this.goToMenu.bind(this)
    this.formatContent = this.formatContent.bind(this)
    this.sendSelectedItems = this.sendSelectedItems.bind(this)
  }
 
  state= {
    page:2,
    selectedItems:[],
    exercicis: [],
    cont:[],
    tipologies:[],
    ids:[],
    tips:[],
  }  

  goToMenu(){
    this.setState({page:0})
  }

  onSelectedItemsChange = (selectedItems) =>{
      this.setState({selectedItems});
      //console.warn(selectedItems)
  };

  async componentDidMount() {
    await axios.get('http://localhost:8000/exs')
      .then(res => {
        this.setState({ exercicis: res.data.map((item) => item.label),
                        ids: res.data.map((item) => item.id),
                        tips: res.data.map((item) => item.group) });
        //console.log(this.state.exercicis)
      }),
    await axios.get('http://localhost:8000/tipologies')
      .then(res => {
        this.setState({ tipologies: res.data});
        //console.log(this.state.tipologies)
      })
      setTimeout(()=> this.formatContent() , 100)
      //console.log('contenido', this.state.cont)
  }

  sendSelectedItems() {

    const sItems = this.state.selectedItems 
    var ids = "";
    //console.warn(sItems)
    for (var i = 0; i < sItems.length; i++) {
      ids = ids.concat(sItems[i], "_");
    }
    //console.log(ids);

    var path = 'http://localhost:8000/selected';

    axios.get(path, {
      params: { ids }
    })
      .then(res => {
        //console.warn(res.params);
        //console.warn(res.data);
        //this.setState({ output: res.data });
        this.createPDF(res.data)
        //topdf();
      })
      .catch(function (response) {
        console.log(response);
      });

     
  }

  async createPDF(data){
      let options ={
          html: data,
          fileName: 'training_report',
          directory: 'Documents',
      };
      let file= await RNHTMLtoPDF.convert(options)
      //alert(file.filePath)
      RNFetchBlob.ios.openDocument(file.filePath);
  }

  formatContent(){
    var contenido=[];
    var ex;
    var exlist=[];
    for (var i = 0; i < this.state.tipologies.length; i++){
        for(var j = 0; j < this.state.exercicis.length; j++){
            if(this.state.tipologies[i] == this.state.tips[j]){
                exlist.push( {name:this.state.exercicis[j], id:this.state.ids[j]})
            }
        }
        
        contenido.push({name: this.state.tipologies[i],
                    id: i+1000,
                    children: exlist,
        });
        exlist=[];
    }
    this.setState({cont: contenido})
    
  }

  render(){
    return (
      <>
        {this.state.page === 2 &&
        <ScrollView style={{flexDirection:'column'}} >
          <View>         
              <TouchableOpacity>
                <Button onPress={this.goToMenu}><Text>Torna</Text></Button>
              </TouchableOpacity>
              
            </View>
            <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:22}}>Generador d'informes</Text>
            <Image style={{resizeMode: 'contain',alignSelf:'center', height:Dimensions.get('window').width *0.3 , width:Dimensions.get('window').width-100}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/itennistfg.appspot.com/o/native%20sources.png?alt=media&token=6bc3c0d3-0646-4530-bbab-86f68d01c940'}}></Image>

          <View style={styles.container}>
            <SectionedMultiSelect
            items={this.state.cont}
            uniqueKey="id"
            subKey="children"
            selectedText="choose algo"
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedItems}
            showCancelButton={true}
            alwaysShowSelectText={true}
            modalWithSafeAreaView={true}
            modalWithTouchable={true}
            searchPlaceholderText='Filtra per tipologies...'
            selectText='Selecciona els exercicis' 
            confirmText='Confirmar'
            colors= {{chipColor:'#22e96b', primary:'#22e96b'} }
            />

            
          </View>
          <Button style={styles.green_btn}  onPress={this.sendSelectedItems}><Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Generar PDF</Text></Button>
            
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
    green_btn:{
    marginTop: 30,
    backgroundColor: '#22e96b',
    borderRadius: 8,
    padding:6,
    fontSize: 14,
    width: Dimensions.get('window').width /2 -60,
    alignSelf:'center',
    borderWidth:0,
    },
    container:{
    width: Dimensions.get('window').width -60,
    backgroundColor: '#f7f9fb',
    marginLeft:30
    },
    scrollView: {
    backgroundColor: Colors.lighter,
    },

  
});


