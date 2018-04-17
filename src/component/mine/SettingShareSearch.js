import React, {Component} from 'react'
import {View, Text, Image, StyleSheet,TouchableWithoutFeedback,StatusBar} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'

export class SettingShareSearch extends Component{
    constructor(props){
        super(props);
        //this.goSetting=this.goSetting.bind(this);
    }

    static navigationOptions=()=>{
        return{
            headerTitle:'编辑',
        }
    }

    render(){
        return(
            <View style={styles.topBarSetting}>
                <TouchableWithoutFeedback style={styles.settingContainer} onPress={()=>{this.props.nav.navigate('AllSetting')}}>
                    <Image source={require('../../img/setting.png')} style={styles.setting}/>
                </TouchableWithoutFeedback>
                <View style={styles.shareSearchContainer}>
                    <TouchableWithoutFeedback>
                        <Image source={require('../../img/share.png')} style={styles.share}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Image source={require('../../img/search.png')} style={styles.search}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    topBarSetting:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:StatusBar.currentHeight+screenUtils.autoSize(8),
        marginBottom:screenUtils.autoSize(25),
        alignItems:'center',
    },
    settingContainer:{
        flex:1,
    },
    setting:{
        width:screenUtils.autoSize(24),
        height:screenUtils.autoSize(24),
        marginLeft:screenUtils.autoSize(20),
    },
    shareSearchContainer:{
        flex:1,
        justifyContent:'flex-end',
        flexDirection:'row',
    },
    share:{
        width:screenUtils.autoSize(24),
        height:screenUtils.autoSize(24),
        marginRight:screenUtils.autoSize(20),
    },
    search:{
        width:screenUtils.autoSize(24),
        height:screenUtils.autoSize(24),
        marginRight:screenUtils.autoSize(20),
    }
});