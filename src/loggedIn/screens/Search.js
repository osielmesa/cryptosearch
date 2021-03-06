import React, {Component} from 'react'
import {ScrollView, FlatList, StyleSheet, View, Text} from 'react-native'
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable'

//Local
import theme from "../../common/theme";
import {SearchBar, showErrorToast, SymbolListItem} from "../../common/components";
import {getSymbolSearch, setSymbolWatchList} from "../../common/redux/actions/SearchActions";
import {cleanNews} from "../../common/redux/actions/SymbolViewActions";

class Search extends Component {

  constructor(){
    super()
    this.limitAnimationDelayCount = 15
    this.state = {
      filteredSymbolsArray:[],
      textFilter:''
    }
  }

  componentDidMount(): void {
    const {user,token} = this.props
    this.props.dispatch(getSymbolSearch({userId:user.id,token:token}))
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
    }else{
      showErrorToast('You do not have account to save followed crypto!')
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
        filteredSymbolsArray: newData,
        textFilter:text
      })
    }else{
      this.setState({
        filteredSymbolsArray: [],
        textFilter:''
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
          data={this.state.filteredSymbolsArray.length> 0 ? this.state.filteredSymbolsArray : this.state.textFilter === '' ? this.props.symbols : []}
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
