/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,Image,TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {getNews} from '../../store/actions/news_actions'
import Moment from 'moment'

 class NewsComponent extends Component{


componentDidMount(){
  this.props.dispatch(getNews());
}

renderArticle=(news)=>(
  news.articles ?

  news.articles.map((item,i)=>(
    <TouchableOpacity
    onPress={()=>this.props.navigation.navigate('Article',{
      ...item
    })}
    key={i}>
     <View style={styles.cardContainer}>
       <View>
         <Image
          style={{height:150,justifyContent:'space-around'}}
          source={{uri:`${item.image}`}}
          resizeMode='cover'
         />
       </View>
       <View style={styles.contentCard}>
         <Text style={styles.titleCard}>{item.title}</Text>
         <View style={styles.bottomCard}>
           <Text style={styles.bottomCardTeam}>{item.team} -</Text>
          <Text style={styles.bottomCardText}>Posted at {Moment(item.date).format('d MMM')}</Text>
         </View>

       </View>

     </View>
    </TouchableOpacity>
  ))
  
  :null
)


  render() {

    return (
      <ScrollView style={{backgroundColor:'#F0F0F0'}}>
        {this.renderArticle(this.props.News)}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
   margin: 10,
    backgroundColor: '#eaeaea',
    shadowColor: '#dddddd',
    shadowOffset: {width:0,height:2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation:1,
    borderRadius: 2,
  },
  contentCard:{
    borderWidth:1,
    borderColor: '#dddddd',
  },
  titleCard:{
    color:"#323232",
    fontSize:16,
    fontFamily: 'Roboto-Bold',
    padding: 10,
    
  },
  bottomCard:{
    flex:1,
    flexDirection: 'row',
    borderTopWidth: 1,
    width:'80%',
    alignSelf: 'center',
    borderTopColor: '#a6a6a6',
    padding:10
    
  },
  bottomCardTeam:{
    color:'#828282',
    fontFamily: 'Roboto-Bold',
    fontSize:12,
  },
  bottomCardText:{
    color:'#828282',
    fontSize:12,
    fontFamily:'Roboto-Light'
  }
});


function mapStateToProps(state){
  console.log(state)
  return{
    News:state.News
  }
}
export default connect(mapStateToProps)(NewsComponent);
