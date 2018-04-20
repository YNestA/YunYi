import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import {screenUtils} from '../../tools/MyTools'
import {connect} from 'react-redux'

const styles=StyleSheet.create({
    container:{
        position:'absolute',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        left:0,
        right:0,
        bottom:0,
        zIndex:2000,
        borderWidth:0,
        borderTopWidth:1,
        borderColor:'#eee'
    },
    commentInput:{
        flex:1,
        color:'#333',
        backgroundColor:'#efefef',
        marginVertical:screenUtils.autoSize(8),
        maxHeight:screenUtils.autoSize(100),
        lineHeight:screenUtils.autoSize(32),
        padding:screenUtils.autoSize(8),
        fontSize:screenUtils.autoFontSize(17),
        textAlignVertical:'center',
        marginLeft:screenUtils.autoSize(5),
        borderRadius:screenUtils.autoSize(8),
    },
    infoContainer:{
        width:screenUtils.autoSize(180),
        flexDirection:'row',
        justifyContent:'space-around'
    },
    sendView:{
        padding:screenUtils.autoSize(5),
        marginHorizontal:screenUtils.autoSize(10)
    },
    sendText:{
        fontSize:screenUtils.autoFontSize(18),
        color:'#3f81c1'
    },
    infoBox:{
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(50),
   //     backgroundColor:'blue'
    },
    infoImg:{
        width:screenUtils.autoSize(26),
        height:screenUtils.autoSize(26),
        marginVertical:screenUtils.autoSize(2),
        marginHorizontal:screenUtils.autoSize(7)
    },
    infoText:{
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(20),
        fontSize:screenUtils.autoSize(15),
        color:'#555',
        lineHeight:screenUtils.autoSize(20),
        textAlign:'center',
    },
    thumbText:{
        color:'#d4237a'
    }
});

class PassageFooter extends Component{
    constructor(props){
        super(props);
        this.state={
            inputFocused:false
        }
    }
    render(){
        let passage=this.props.passage;
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.commentInput}
                    placeholder={'写下你的感受...'}
                    ref={'textInput'}
                    multiline={true}
                    maxLength={250}
                    onBlur={()=>{this.setState({inputFocused:false})}}
                    onFocus={()=>{this.setState({inputFocused:true})}}
                    underlineColorAndroid={'transparent'}
                />
                {   this.state.inputFocused?
                    <TouchableOpacity
                        onPress={()=>{console.log('go author')}}
                    >
                        <View style={styles.sendView}><Text style={styles.sendText}>发送</Text></View>
                    </TouchableOpacity>
                    :
                    <View style={styles.infoContainer}>
                        <TouchableOpacity>
                            <View style={styles.infoBox}>
                                <Image style={styles.infoImg} source={require('../../img/common/y_comment.png')}/>
                                <Text style={styles.infoText}>{passage.commentCount>0?passage.commentCount:'评论'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.infoBox}>
                                {(passage.ifThumb)?
                                    <Image style={styles.infoImg}  source={require('../../img/common/thumb-fill.png')}/>
                                    :
                                    <Image style={styles.infoImg}  source={require('../../img/common/y_thumb.png')}/>
                                }
                                <Text style={[styles.infoText,(passage.ifThumb)?styles.thumbText:{}]}>{
                                    passage.thumbCount>0?passage.thumbCount:'点赞'
                                }</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.infoBox}>
                                <Image style={styles.infoImg} source={require('../../img/common/y_share.png')}/>
                                <Text style={styles.infoText}>{passage.shareCount>0?passage.shareCount:'分享'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

let actions={

}

function mapStateToProps(state) {
    return {
        passage:state.passage
    }
}
function mapDispatchToProps(dispatch) {
    return {};
}

export default PassageFooter=connect(mapStateToProps,mapDispatchToProps)(PassageFooter);