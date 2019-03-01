import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native'
import * as Animatable from "react-native-animatable";
import LineChart from "react-native-responsive-linechart";

import {headerStyle, headerTitleStyle} from "../../common/utils";
import theme from "../../common/theme";
import {NewsListItem} from "../../common/components";

const data = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
const config = {
  line: {
    strokeWidth: 1,
    strokeColor: "#216D99"
  },
  area: {
    gradientFrom: "#2e86de",
    gradientFromOpacity: 1,
    gradientTo: "#87D3FF",
    gradientToOpacity: 1
  },
  yAxis: {
    labelColor: "#c8d6e5"
  },
  grid: {
    strokeColor: "#c8d6e5",
    stepSize: 30
  },
  insetY: 10,
  insetX: 10,
  interpolation: "spline",
  backgroundColor: "#fff"
};

class SymbolDetails extends Component {
  limitPerPage = 30
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:navigation.getParam('title', 'Details'),
      headerStyle: headerStyle,
      headerTintColor: theme.colors.headerTintColor,
      headerTitleStyle: headerTitleStyle,
    }
  }

  _renderItem = ({item,index}) =>{
    if(this.animationDelayFactor === undefined){
      this.animationDelayFactor = 0
    }else{
      this.animationDelayFactor += 1
    }
    if(this.animationDelayFactor >= this.limitPerPage){
      this.animationDelayFactor = 0
    }
    return (
      <Animatable.View animation={'bounceIn'} delay={this.animationDelayFactor*100} key={index}>
        <NewsListItem
          description={item.description}
          date={item.date}
        />
      </Animatable.View>
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.elementsView}>
          <Text style={styles.priceText}>Details</Text>
          <View style={styles.viewChart}>
            <LineChart style={{flex:1, backgroundColor: 'transparent'}} config={config} data={data} />
          </View>
          <Text style={styles.aboutTitle}>ABOUT</Text>
          <Text style={styles.aboutText}>Esta es una descripcions grande la moneda en cuestion espero que se aprecie su contenido y el de las demas moneds</Text>
          <Text style={styles.newsTitle}>NEWS</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index+''}
          data={[{id:'1',description: 'etherum',date:'128.30$'}, {id:'2',description: 'bitcoin',date:'1000.30$'}]}
          renderItem={item => this._renderItem(item)}
          style={styles.newsList}
        />
        <Text style={styles.showMoreText}>SHOW MORE</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  elementsView:{
    alignSelf:'center',
    width: '95%',
  },
  viewChart:{
    height:180,
    alignSelf:'stretch'
  },
  priceText:{
    alignSelf:'center',
    marginTop:25,
    fontWeight: 'bold',
    fontSize:16
  },
  aboutTitle:{
    color:theme.colors.primary,
    fontWeight: 'bold',
    marginTop:15
  },
  aboutText:{
    color:theme.colors.textColor,
    fontSize: 13,
    marginTop:15
  },
  newsTitle:{
    color:theme.colors.primary,
    fontWeight: 'bold',
    marginTop:15
  },
  showMoreText:{
    alignSelf:'center',
    color:theme.colors.primary,
    fontWeight: 'bold',
    marginTop:40
  },
  newsList:{
    marginTop:5
  }
})

export default SymbolDetails
