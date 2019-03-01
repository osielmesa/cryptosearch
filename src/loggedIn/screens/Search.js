import React, {Component} from 'react'
import {ScrollView, FlatList, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable';

import theme from "../../common/theme";
import {SearchBar, SymbolListItem} from "../../common/components";
import {getSymbolSearch} from "../../common/redux/actions/SearchActions";
import {cleanNews} from "../../common/redux/actions/SymbolViewActions";
import {setFavorite} from "../../common/redux/actions/FavoritesActions";

class Search extends Component {
  state = {
    filteredSymbolsArray:[]
  }
  limitAnimationDelayCount = 15

  componentDidMount(): void {
    this.props.dispatch(getSymbolSearch({userId:this.props.user.id,token:this.props.token}))
  }

  onItemPressed = (item) => {
    this.props.dispatch(cleanNews())
    this.props.navigation.navigate('SymbolDetails',{symbol:item})
  }

  onItemIconPressed = (item) => {
    const {user,token,} = this.props
    this.props.dispatch(setFavorite(user.id,token,item.id,true))
  }

  onSearchTextChanged = (text) => {
    if(text !== ''){
      const newData = this.props.symbols.filter(item => {
        const itemData = item.displayName.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      });
      this.setState({
        filteredSymbolsArray: newData
      })
    }else{
      this.setState({
        filteredSymbolsArray: []
      })
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
    return (
      <Animatable.View animation={'bounceIn'} delay={this.animationDelayFactor*50} key={index}>
        <SymbolListItem
          title={item.displayName}
          secondaryText={'$'+item.price.ask}
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
            onSearchChange={(text) => this.onSearchTextChanged(text)}
            onClose={() => this.onSearchTextChanged('')}
            height={50}
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
        {this.props.symbols.length > 0 &&
        <FlatList
          keyExtractor={(item, index) => index+''}
          data={this.state.filteredSymbolsArray.length> 0 ? this.state.filteredSymbolsArray : this.props.symbols}
          renderItem={item => this._renderItem(item)}
          style={styles.symbolList}
        />}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  symbolList:{
    marginTop:20
  }
})

const mapStateToProps = state => ({
  user: state.login.user,
  token: state.login.token,
  symbols: state.search.symbols
});

export default connect(mapStateToProps)(Search)
