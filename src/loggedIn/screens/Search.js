import React, {Component} from 'react'
import {ScrollView, FlatList, StyleSheet, View, Text} from 'react-native'
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable';

import theme from "../../common/theme";
import {SearchBar, SymbolListItem} from "../../common/components";
import {getSymbolSearch, setSymbolWatchList} from "../../common/redux/actions/SearchActions";
import {cleanNews} from "../../common/redux/actions/SymbolViewActions";

class Search extends Component {

  state = {
    filteredSymbolsArray:[]
  }
  limitAnimationDelayCount = 15

  componentDidMount(): void {
    this.props.navigation.setParams({
      logout: this.logout()
    })
    this.props.dispatch(getSymbolSearch({userId:this.props.user.id,token:this.props.token}))
  }
  logout = () => {
    console.log('siii')
  }
  onItemPressed = (item) => {
    this.props.dispatch(cleanNews())
    this.props.navigation.navigate('SymbolDetails',{symbol:item})
  }

  onItemIconPressed = (item) => {
    const {accounts, token, watchList, user} = this.props
    if(accounts.length > 0){
      const following = !this.isFavorite(item.id,watchList)
      this.props.dispatch(setSymbolWatchList({
        accountId:accounts[0].id,
        token,
        symbolId:item.id,
        following:following,
        symbolName:item.displayName,
        userId: user.id
      }))
    }
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

  isFavorite = (symbolId,watchList) => {
    for(let i = 0; i < watchList.length;i++){
      if(watchList[i].id === symbolId){
        return true
      }
    }
    return false
  }

  _renderItem = ({item,index}) =>{
    const {watchList} = this.props
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
          iconName={this.isFavorite(item.id,watchList) ? 'favorite' : 'favorite-border'}
          iconColor={this.isFavorite(item.id,watchList) ? theme.colors.favColor : theme.colors.secondaryTextColor}
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
        {this.props.symbols.length === 0 &&
          <View style={{margin:40}}>
            <Text style={{fontSize:16, color:theme.colors.secondaryTextColor}}>The crypto currencies will be shown here when they are available.</Text>
          </View>
        }
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
  accounts: state.login.accounts,
  watchList: state.login.watchList,
  symbols: state.search.symbols
});

export default connect(mapStateToProps)(Search)
