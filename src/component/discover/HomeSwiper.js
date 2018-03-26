import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import Swiper from 'react-native-swiper'
import {screenUtils} from '../../tools/ScreenUtils'

const styles=StyleSheet.create({
    warp:{
        height:screenUtils.autoSize(150)
    },
    slide:{
        flex:1,
    },
    slideImg:{
        width:'100%',
        height:'100%'
    }
});
export class HomeSwiper extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Swiper
                style={styles.warp}
                paginationStyle={{
                    bottom:screenUtils.autoSize(5)
                }}
                activeDotColor={'#209aaa'}
            >
                <TouchableWithoutFeedback onPress={()=>{console.log('slide1')}}>
                    <View style={[styles.slide]}>
                        <Image style={styles.slideImg} source={require('../../img/discover/slide1.jpg')}/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{console.log('slide2')}}>
                    <View style={[styles.slide]}>
                    <Image style={styles.slideImg} source={require('../../img/discover/slide2.jpg')}/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={()=>{console.log('slide3')}}>
                    <View style={[styles.slide]} >
                        <Image style={styles.slideImg} source={require('../../img/discover/slide3.jpg')}/>
                    </View>
                </TouchableWithoutFeedback>
            </Swiper>
        );
    }
}