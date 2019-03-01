import React, {Component} from 'react'
import {ScrollView, FlatList, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable';

import theme from "../../common/theme";
import { SymbolListItem} from "../../common/components";
import {getSymbolSearch} from "../../common/redux/actions/SearchActions";
import {cleanNews} from "../../common/redux/actions/SymbolViewActions";
import {getUserAccounts} from "../../common/redux/actions/FavoritesActions";

class Search extends Component {

  limitAnimationDelayCount = 15

  componentDidMount(): void {
    const {user,token} = this.props
    this.props.dispatch(getUserAccounts({userId:user.id,token}))
  }

  onItemPressed = (item) => {
    this.props.dispatch(cleanNews())
    this.props.navigation.navigate('SymbolDetails',{symbol:item})
  }

  onItemIconPressed = (item) => {
    console.log(item)
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
        {this.props.symbols.length > 0 &&
        <FlatList
          keyExtractor={(item, index) => index+''}
          data={this.props.symbols}
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
  symbols: state.favorites.symbols
});

export default connect(mapStateToProps)(Search)
