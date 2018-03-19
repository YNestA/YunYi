import React,{Component} from "react";
import {View,StyleSheet,TouchableOpacity,Image,Text} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-crop-picker'

const styles=StyleSheet.create({
    addSectionContainer:{
        alignItems:'center',
//        backgroundColor:'#aaa',
        marginTop:screenUtils.autoSize(8),
        marginBottom:screenUtils.autoSize(8)
    },
    addSectionSimple:{
        backgroundColor:'#d1d1d1',
        borderWidth:screenUtils.autoSize(1),
        borderColor:'#eaeaea',
        borderRadius:screenUtils.autoSize(6),
        paddingTop:screenUtils.autoSize(1),
        paddingBottom:screenUtils.autoSize(1),
        paddingLeft:screenUtils.autoSize(8),
        paddingRight:screenUtils.autoSize(8)
    },
    addSectionImg:{
        width:screenUtils.autoSize(18),
        height:screenUtils.autoSize(14)
    },
    addSectionComplex:{
        paddingLeft:screenUtils.autoSize(15),
        paddingRight:screenUtils.autoSize(15),
        width:screenUtils.autoSize(100),
        height:screenUtils.autoSize(30),
        backgroundColor:'#fff',
        borderRadius:screenUtils.autoSize(10),
        flexDirection:'row'
    },
    addSectionComplexContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    addSectionComplexImage:{
        width:screenUtils.autoSize(23),
        height:screenUtils.autoSize(17)
    }
});
class AddSectionBtn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {sections,index}=this.props;
        let simple=<View style={{}}>
                <TouchableOpacity onPress={()=>{this.props.openComplexCb()}}>
                    <View style={styles.addSectionSimple}><Image style={styles.addSectionImg} source={require('../../img/edit/add-section.png')}/></View>
                </TouchableOpacity>
            </View>,
            complex=<View style={styles.addSectionComplex}>
                <View style={styles.addSectionComplexContainer}>
                    <TouchableOpacity onPress={()=>{this.props.addTextSection(index,sections)}}>
                        <View><Image style={styles.addSectionComplexImage} source={require('../../img/edit/text-icon.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.addSectionComplexContainer}>
                    <TouchableOpacity onPress={()=>{this.props.addImgSection(index,sections)}}>
                        <View><Image style={styles.addSectionComplexImage} source={require('../../img/edit/img-icon.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>;
        return(
            <View style={styles.addSectionContainer}>
                {this.props.showComplex[this.props.index]? complex:simple}
            </View>
        );
    }
}

let actions={
    addTextSection:function (index,sections) {
        let newSections=sections.slice();
        newSections.splice(index,0,{
            type:'text',
            img:null,
            content:'',
            text:''
        });
        return {
            type:'ADD_TEXT_SECTION',
            payload:{
                sections:newSections
            }
        };
    },
    addImgSection:function (index,sections) {
        return ImagePicker.openPicker({
            mediaType:'photo',
        }).then((image)=>{
            let newSections= sections.slice();
            newSections.splice(index,0,{
                type:'img',
                text:'',
                content:'',
                img:image
            });
            return {
                type:'ADD_IMG_SECTION',
                payload:{
                    sections:newSections
                }
            };
        });
    }
};

function mapStateToProps(state) {
    return {
        sections:state.edit.sections
    }
}
function mapDispatchToProps(dispatch) {
    return{
        addTextSection:(index,sections)=>{dispatch(actions.addTextSection(index,sections))},
        addImgSection:(index,sections)=>{dispatch(actions.addImgSection(index,sections))}
    }
}

export default AddSectionBtn=connect(mapStateToProps,mapDispatchToProps)(AddSectionBtn);
