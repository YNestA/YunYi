import React,{Component} from "react";
import {View,Image,TouchableWithoutFeedback,Text,StyleSheet} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";
import {connect} from "react-redux";

const styles=StyleSheet.create({
    sectionDelete:{
        position:'absolute',
        left:screenUtils.autoSize(3),
        top:screenUtils.autoSize(3),
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20),
        alignItems:'center',
        justifyContent:'center'
    },
    sectionUp:{
        position:'absolute',
        right:screenUtils.autoSize(3),
        top:screenUtils.autoSize(3),
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20),
        alignItems:'center',
        justifyContent:'center'
    },
    sectionDown:{
        position:'absolute',
        right:screenUtils.autoSize(3),
        bottom:screenUtils.autoSize(3),
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20),
        alignItems:'center',
        justifyContent:'center'
    },
    sectionUpImg:{
        width:screenUtils.autoSize(15),
        height:screenUtils.autoSize(15)
    },
    sectionDownImg:{
        width:screenUtils.autoSize(15),
        height:screenUtils.autoSize(15)
    },
    sectionDeleteImg:{
        width:screenUtils.autoSize(15),
        height:screenUtils.autoSize(15)
    },
    sectionContainer:{
        height:screenUtils.autoSize(100),
        backgroundColor:'#fff',
        marginLeft:screenUtils.autoSize(15),
        marginRight:screenUtils.autoSize(15),
        borderRadius:screenUtils.autoSize(10)
    },
    sectionImg:{
        position:'absolute',
        top:screenUtils.autoSize(15),
        left:screenUtils.autoSize(20),
        width:screenUtils.autoSize(70),
        height:screenUtils.autoSize(70)
    },
    contentContainer:{
        height:screenUtils.autoSize(70),
        marginLeft:screenUtils.autoSize(100),
        marginRight:screenUtils.autoSize(20),
        marginTop:screenUtils.autoSize(15),
        marginBottom:screenUtils.autoSize(15),
        paddingLeft:screenUtils.autoFontSize(5),
        paddingRight:screenUtils.autoFontSize(5),
    },
    contentText:{
        color:'#888',
        fontSize:screenUtils.autoFontSize(17)
    }
});

class Section extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {section,sections,index,navigation}=this.props;
        return(
            <View style={styles.sectionContainer}>
                <Image style={styles.sectionImg} source={section.type=='img'?{uri:section.img.path}:require('../../img/text.png')}/>
                <TouchableWithoutFeedback  onPress={()=>{this.props.deleteSection(index,sections)}}>
                    <View style={styles.sectionDelete}><Image style={styles.sectionDeleteImg} source={require('../../img/edit/delete-section.png')}/></View>
                </TouchableWithoutFeedback>
                <View style={styles.contentContainer}>
                    <TouchableWithoutFeedback onPress={()=>{
                        navigation.navigate('EditText',{sectionIndex:index,content:section.content});
                    }}>
                        <View><Text numberOfLines={3} style={[styles.contentText,section.text?{color:'#444'}:{}]}>{section.text?section.text:'点击添加文字'}</Text></View>
                    </TouchableWithoutFeedback>
                </View>
                {index!=0&&
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.upSection(index, sections)
                    }}>
                        <View style={styles.sectionUp}><Image style={styles.sectionUpImg} source={require('../../img/edit/up-arrow.png')}/></View>
                    </TouchableWithoutFeedback>
                }
                {index!=sections.length-1&&
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.downSection(index, sections)
                    }}>
                        <View style={styles.sectionDown}><Image style={styles.sectionDownImg} source={require('../../img/edit/down-arrow.png')}/></View>
                    </TouchableWithoutFeedback>
                }
            </View>
        );
    }
}

let actions={
    deleteSection:function (index,sections) {
        let newSections=sections.slice();
        newSections.splice(index,1);
        return {
            type:'DELETE_SECTION',
            payload:{
                sections:newSections
            }
        };
    },
    upSection:function (index,sections) {
        let newSections=sections.slice();
        if(index!=0){
            [newSections[index-1],newSections[index]]=[newSections[index],newSections[index-1]];
        }
        return{
            type:'UP_SECTION',
            payload:{
                sections:newSections
            }
        }
    },
    downSection:function (index,sections) {
        let newSections=sections.slice();
        if(index!=sections.length-1){
            [newSections[index],newSections[index+1]]=[newSections[index+1],newSections[index]];
        }
        return{
            type:'DOWN_SECTION',
            payload:{
                sections:newSections
            }
        }
    }
};

function mapStateToProps(state) {
    return {
        sections:state.edit.sections
    }
}
function mapDispatchToProps(dispatch) {
    return{
        deleteSection:(index,sections)=>{dispatch(actions.deleteSection(index,sections))},
        upSection:(index,sections)=>{dispatch(actions.upSection(index,sections))},
        downSection:(index,sections)=>{dispatch(actions.downSection(index,sections ))}
    }
}

export default Section=connect(mapStateToProps,mapDispatchToProps)(Section);
