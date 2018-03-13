import React,{Component} from 'react'
import {View,Text,Button,TextInput} from 'react-native'
import {HeaderButton} from "../../navigation/navi";
import {connect} from 'react-redux'
import {screenUtils} from '../../tools/ScreenUtils'

class EditTitle extends Component{
    static navigationOptions=({navigation,screenProps})=>{
        let {params}=navigation.state;
        return{
            headerTitle:'编辑标题',
            headerLeft:<HeaderButton text='返回' onPress={params?params.leftPress:()=>{}}/>,
            headerRight:<HeaderButton text='保存' onPress={params?params.rightPress:()=>{}}/>
        }
    }
    componentDidMount(){
        this.refs.titleInput.focus();
        //header事件处理
        this.props.navigation.setParams({
            leftPress:this._returnPre.bind(this),
            rightPress:this._complete.bind(this)
        });
    }

    _complete(){
        this.props.changeTitle(this.titleValue.replace(/\r|\n|\\s/,''));
        this.props.navigation.navigate('EditMain');
    }
    _returnPre(){
        this.props.navigation.navigate('EditMain');
    }
    constructor(props){
        super(props);
    }
    render(){
        this.titleValue=this.props.title;
        return(
            <View style={{
                flex:1,
            }}>
                <TextInput
                    style={{
                        flex:1,
                        backgroundColor:'#fefefe',
                        textAlignVertical:'top',
                        paddingTop:20,
                        paddingLeft:10,
                        paddingRight:10,
                        color:'#666',
                        fontSize:screenUtils.autoFontSize(18)
                    }}
                    underlineColorAndroid="transparent"
                    ref={'titleInput'}
                    multiline = {true}
                    defaultValue={this.titleValue}
                    placeholder={'不超过50个字'}
                    maxLength={50}
                    onChangeText={(text)=>{this.titleValue=text;}}
                />
            </View>
        );
    }
}

let actions={
    changeTitle:function (title) {
        return {
            type:'CHANGE_TITLE',
            payload:{
                title:title
            }
        };
    }
}
function mapStateToProps(state) {
    return {
        title:state.edit.title
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeTitle:(title)=>{dispatch(actions.changeTitle(title))}
    }
}

export default EditTitle=connect(mapStateToProps,mapDispatchToProps)(EditTitle);