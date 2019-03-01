import React, {Component} from 'react'
import {ScrollView, FlatList, StyleSheet, View} from 'react-native'
import * as Animatable from 'react-native-animatable';

import theme from "../../common/theme";
import {SymbolListItem} from "../../common/components";

class Favorites extends Component {
  limitPerPage = 30

  onItemPressed = (item) => {
    this.props.navigation.navigate('SymbolDetails',{itemId:item.id,title:item.name})
  }
  onItemIconPressed = (item) => {
    console.log(item.name)
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
        <SymbolListItem
          title={item.name}
          secondaryText={item.balance}
          iconName={'favorite'}
          iconColor={theme.colors.favColor}
          onPress={() => this.onItemPressed(item)}
          onIconPress={() => this.onItemIconPressed(item)}
        />
      </Animatable.View>
    )
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          keyExtractor={(item, index) => index+''}
          data={[{id:'1',name: 'etherum',balance:'128.30$',fav:false}, {id:'2',name: 'bitcoin',balance:'1000.30$',fav:true}]}
          renderItem={item => this._renderItem(item)}
          style={styles.symbolList}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  symbolList:{
    marginTop:15
  }
})

export default Favorites
