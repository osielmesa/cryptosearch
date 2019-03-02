import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Linking} from 'react-native'
import {connect} from 'react-redux'
import * as Animatable from "react-native-animatable";
import LineChart from "react-native-responsive-linechart";

import {headerStyle, headerTitleStyle} from "../../common/utils";
import theme from "../../common/theme";
import {NewsListItem} from "../../common/components";
import {getApplicationNews, getSymbolChart} from "../../common/redux/actions/SymbolViewActions";

class SymbolDetails extends Component {
  limitAnimationDelayCount = 15
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:navigation.getParam('symbol', {displayName:'Details'}).displayName,
      headerStyle: headerStyle,
      headerTintColor: theme.colors.headerTintColor,
      headerTitleStyle: headerTitleStyle,
    }
  }

  componentDidMount(): void {
    const symbol = this.props.navigation.getParam('symbol', {})
    const symbolId = symbol.id
    const userId = this.props.user.id
    const token = this.props.token
    this.props.dispatch(getSymbolChart({userId,symbolId,token}))
    this.props.dispatch(getApplicationNews(token,0))
  }

  showMorePressed = () => {
    const {token,offset} = this.props
    this.props.dispatch(getApplicationNews(token, offset))
  }

  produceDataForChart = (chartData) => {
    const formattedData = []
    for(let i=0; i<chartData.length;i++){
      if(chartData[i].ask_high){
        const value = chartData[i].ask_high
        formattedData.push(value)
      }
    }
    return formattedData
  }

  newsItemPressed = (item) => {
    console.log(item)
    if(item.news_url && item.news_url !== ''){
      Linking.openURL(item.news_url)
    }
  }

  _renderItem = ({item,index}) =>{
    if(this.animationDelayFactor === undefined){
      this.animationDelayFactor = 0
    }else{
      this.animationDelayFactor += 1
    }
    if(this.animationDelayFactor >= this.limitAnimationDelayCount){
      this.animationDelayFactor = 0
    }
    const date = new Date(item.published)
    return (
      <Animatable.View animation={'bounceIn'} delay={this.animationDelayFactor*50} key={index}>
        <NewsListItem
          description={item.title}
          date={date.toLocaleString()}
          onPress={() => {this.newsItemPressed(item)}}
        />
      </Animatable.View>
    )
  }

  render() {
    const symbol = this.props.navigation.getParam('symbol', {})
    const {chartData, news} = this.props
    const formattedData = this.produceDataForChart(chartData)
    return (
      <ScrollView contentContainerStyle={{paddingVertical:40}}>
        <View style={styles.elementsView}>
          <Text style={styles.priceText}>{symbol.price.ask ? '$'+symbol.price.ask : ''}</Text>

          {formattedData && formattedData.length > 0 &&
          <View style={styles.viewChart}>
            <LineChart style={{flex:1, backgroundColor: 'transparent'}} config={chartConfig} data={formattedData} />
          </View>
          }

          <Text style={styles.aboutTitle}>ABOUT</Text>
          {symbol.baseInstrument.description &&
          <Text style={styles.aboutText}>{symbol.baseInstrument.description}</Text>
          }

          {news && news.length > 0 &&<Text style={styles.newsTitle}>NEWS</Text>}
        </View>
        {news && news.length > 0 &&
        <FlatList
          keyExtractor={(item, index) => index + ''}
          data={news}
          renderItem={item => this._renderItem(item)}
          style={styles.newsList}
        />
        }
        <TouchableOpacity onPress={() => this.showMorePressed()}>
          <Text style={styles.showMoreText}>SHOW MORE</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const chartConfig = {
  line: {
    visible: true,
    strokeWidth: 2,
    strokeColor: theme.colors.strokeColorChart
  },
  area: {
    gradientFrom: theme.colors.gradientChartTop,
    gradientFromOpacity: 1,
    gradientTo: theme.colors.gradientChartBottom,
    gradientToOpacity: 1
  },
  yAxis: {
    visible: true,
    labelFormatter: v => v.toFixed(4)
  },
  xAxis: {
    visible: false
  },
  insetY: 5,
  insetX: 5
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
    marginTop:20
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

const mapStateToProps = state => ({
  user: state.login.user,
  token: state.login.token,
  chartData: state.symbolView.chartData,
  news: state.symbolView.news,
  offset: state.symbolView.offset
});

export default connect(mapStateToProps)(SymbolDetails)
