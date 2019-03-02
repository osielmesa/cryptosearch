import React, {Component} from 'react'
import {ScrollView, FlatList, StyleSheet, View, Text} from 'react-native'
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable';

import theme from "../../common/theme";
import { SymbolListItem} from "../../common/components";
import {cleanNews} from "../../common/redux/actions/SymbolViewActions";
import {setSymbolWatchList} from "../../common/redux/actions/SearchActions";

class Search extends Component {

  limitAnimationDelayCount = 15

  onItemPressed = (item) => {
    this.props.dispatch(cleanNews())
    this.props.navigation.navigate('SymbolDetails',{symbol:item})
  }

  onItemIconPressed = (item) => {
    const {accounts, token, user} = this.props
    if(accounts.length > 0){
      this.props.dispatch(setSymbolWatchList({
        accountId:accounts[0].id,token,
        symbolId:item.id,
        following:false,
        symbolName:item.displayName,
        userId:user.id
      }))
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
        {this.props.watchList.length === 0 &&
        <View style={{margin:40}}>
          <Text style={{fontSize:16, color:theme.colors.secondaryTextColor}}>Your favourites crypto currencies will be shown here when they are available.</Text>
        </View>
        }
        {this.props.watchList.length > 0 &&
        <FlatList
          keyExtractor={(item, index) => index+''}
          data={this.props.watchList}
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
  watchList: state.login.watchList,
  accounts: state.login.accounts,
});

export default connect(mapStateToProps)(Search)
