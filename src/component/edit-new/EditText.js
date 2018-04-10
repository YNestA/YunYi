import React,{Component} from 'react'
import {View,Text,StyleSheet,Image,TouchableNativeFeedback,TouchableOpacity,BackHandler,Keyboard} from 'react-native'
import {RichTextEditor,RichTextToolbar,actions} from 'react-native-zss-rich-text-editor'
import {HeaderButton} from "../../navigation/navi";
import {screenUtils} from '../../tools/ScreenUtils'
import Picker from 'react-native-picker'
import {connect} from "react-redux";

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:screenUtils.autoSize(10)
    },
    editor:{
    },
    toolBar:{
        height:screenUtils.autoSize(45),
        backgroundColor:'#fff',
        borderTopWidth:screenUtils.autoSize(1),
        borderColor:'#aaa'
    }
});

class EditText extends Component{
    static navigationOptions=({navigation,screenProps})=>{
        let {params}=navigation.state;
        return{
            headerTitle:'编辑段落',
            headerLeft:<HeaderButton text='返回' onPress={params?params.leftPress:()=>{}}/>,
            headerRight:<HeaderButton text='保存' onPress={params?params.rightPress:()=>{}}/>
        }
    };
    componentDidMount(){
        //header事件处理
        this.props.navigation.setParams({
            leftPress:this._returnPre.bind(this),
            rightPress:this._complete.bind(this)
        });
        //安卓返回键
        BackHandler.addEventListener('hardwareBackPress',this._onBackHandler);

    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._onBackHandler);
    }
    _onBackHandler(){
        Picker.hide();
        this.props.navigation.goBack();
        return true;
    }
    _renderBarAction(action,selected){
        let icon=this._getBarIcon(action,selected),
            _onPress=null;
        switch (action) {
            case actions.fontSize:
                _onPress = () => {
                    Picker.init({
                        pickerTitleText:'字体大小',
                        pickerConfirmBtnText:'确认',
                        pickerCancelBtnText:'取消',
                        pickerTitleColor:[50,50,50,1],
                        pickerToolBarBg:[245,245,245,1],
                        pickerBg:[235,235,235,1],
                        pickerData:[1,2,3,4,5,6,7],
                        selectedValue:[this.fontSize?this.fontSize:3],
                        onPickerConfirm: (data) => {
                            this.fontSize=data[0];
                            this.richTextEditor._sendAction(actions.fontSize,data[0]);
                        },
                    });
                    Picker.show();

                };
                break;
            default:
                _onPress = () => {
                    this.richTextEditor._sendAction(action);
                }
        }
        return (
            <TouchableOpacity
                key={action}
                style={[{
                    width:screenUtils.autoSize(45),
                    height:screenUtils.autoSize(45),
                    justifyContent:'center',
                    alignItems:'center',
                },selected?{backgroundColor:'#3f81c1'}:{}]}
                onPress={_onPress}>
                {icon?<Image source={icon} style={{
                    width:screenUtils.autoSize(25),
                    height:screenUtils.autoSize(25),
                }}/>:null}
                </TouchableOpacity>
        );
    }
    _complete(){
        this.richTextEditor.getContentHtml().then((data)=>{
            Picker.hide();
            this.richTextEditor.blurContentEditor();
            this.props.editSectionText(this.props.sections,this.sectionIndex,data);
            this.props.navigation.goBack();
        });
    }
    _returnPre(){
        Picker.hide();
        this.richTextEditor.blurContentEditor();
        this.props.navigation.goBack();
    }

    _getBarIcon(action,selected){
        const icons={
            'fontSize':[require('../../img/rich-editor/font-dark.png'),require('../../img/rich-editor/font-light.png')],
            'justifyLeft':[require('../../img/rich-editor/leftAlign-dark.png'),require('../../img/rich-editor/leftAlign-light.png')],
            'justifyCenter':[require('../../img/rich-editor/centerAlign-dark.png'),require('../../img/rich-editor/centerAlign-light.png')],
            'justifyRight':[require('../../img/rich-editor/rightAlign-dark.png'),require('../../img/rich-editor/rightAlign-light.png')],
            'bold':[require('../../img/rich-editor/bold-dark.png'),require('../../img/rich-editor/bold-light.png')],
            'italic':[require('../../img/rich-editor/italic-dark.png'),require('../../img/rich-editor/italic-light.png')]
        };
        return (action in icons)?icons[action][+selected]:null;
    }

    constructor(props){
        super(props);
        this._onBackHandler=this._onBackHandler.bind(this);
        this._renderBarAction=this._renderBarAction.bind(this);
    }
    render(){
        let {sectionIndex,content}=this.props.navigation.state.params;
        this.sectionIndex=sectionIndex;
        return(
            <View style={styles.container}>
                <RichTextEditor
                    contentPlaceholder={'不能超过5000字'}
                    hiddenTitle={true}
                    customCSS={"#zss_editor_content{box-sizing:border-box;}"}
                    style={styles.editor}
                    initialContentHTML={content}
                    ref={(r) =>{this.richTextEditor=r;}}
                    editorInitializedCallback={()=>{
                    }}
                />
                <RichTextToolbar
                    ref={(r)=>{this.richTextBar=r;}}
                    style={styles.toolBar}
                    iconTint={'green'}
                    selectedIconTint={'red'}
                    actions={[
                        actions.fontSize,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.setBold,
                        actions.setItalic
                    ]}
                    renderAction={this._renderBarAction}
                    getEditor={()=>this.richTextEditor}
                />
            </View>
        );
    }
}

let reduxActions={
    editSectionText:function (sections,index,content) {
        let newSections=sections.slice();
        newSections[index].content=content;
        newSections[index].text=content.replace(/<[^<>]*>/g,' ').replace(/\s+/g,' ');
        return {
            type:'EDIT_SECTION_TEXT',
            payload:{
                sections:newSections
            }
        };
    }
};

function mapStateToProps(state) {
    return {
        sections:state.edit.sections
    }
}
function mapDispatchToProps(dispatch) {
    return{
        editSectionText:(sections,index,content)=>{dispatch(reduxActions.editSectionText(sections,index,content))}
    }
}

export default EditText=connect(mapStateToProps,mapDispatchToProps)(EditText);