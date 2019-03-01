import React, {Component} from 'react'
import {ScrollView, FlatList, StyleSheet, View} from 'react-native'
import * as Animatable from 'react-native-animatable';

import theme from "../../common/theme";
import {SearchBar, SymbolListItem} from "../../common/components";

class Search extends Component {
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
          iconName={item.fav ? 'favorite' : 'favorite-border'}
          iconColor={item.fav ? theme.colors.favColor : theme.colors.secondaryTextColor}
          onPress={() => this.onItemPressed(item)}
          onIconPress={() => this.onItemIconPressed(item)}
        />
      </Animatable.View>
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={{marginTop: 15}}>
          <SearchBar
            onSearchChange={() => console.log('On Search Change')}
            height={50}
            onFocus={() => console.log('On Focus')}
            onBlur={() => console.log('On Blur')}
            placeholder={'Search here'}
            autoCorrect={false}
            padding={5}
            returnKeyType={'search'}
            iconBackName={'magnify'}
            iconSearchName={'magnify'}
            iconCloseName={'close'}
            textStyle={{fontSize:15,fontWeight: 'bold'}}
          />
        </View>
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
    marginTop:20
  }
})

export default Search
