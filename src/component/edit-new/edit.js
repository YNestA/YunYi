import React,{Component} from 'react'
import {View,Text,FlatList,Image} from 'react-native'
import {connect} from 'react-redux'
import {HeaderButton} from "../../navigation/navi";

class Edit extends Component{
    static navigationOptions=({navigation,screenProps})=>{
        let {params}=navigation.state;
        return{
            headerTitle:'编辑',
            headerLeft:<HeaderButton text='返回' onPress={params?params.leftPress:()=>{}}/>,
            headerRight:<HeaderButton text='完成' onPress={params?params.rightPress:()=>{}}/>
        }
    }

    constructor(props){
        super(props);
    }
    _complete(){
        console.log(this.props);
    }
    _returnPre(){
        this.props.navigation.goBack();
    }
    componentDidMount(){
        let {params}=this.props.navigation.state;
        //新编辑文章处理
        if(params&&params.selected){
            this.props.navigation.setParams({selected:false});
            this.props.startImg(params.imgs);
        }
        //header事件处理
        this.props.navigation.setParams({
            leftPress:this._returnPre.bind(this),
            rightPress:this._complete.bind(this)
        });
    }
    render(){
        return(
                <FlatList
                    data={this.props.passage.sections}
                    renderItem={({item})=>{
                        return <Image style={{width:200,height:200}} source={{uri:item.img.path}}/>
                    }}
                />
        );
    }
}

let actions={
    startImg:function (imgs) {
        return {
            type:'START_IMG',
            payload:{
                coverImg:imgs[0],
                sections:imgs.map((item)=>{
                    return {img:item,content:''};
                })
            }
        };
    }
};

function mapStateToProps(state) {
    return {
        passage:state.edit
    }
}
function mapDispatchToProps(dispatch) {
    return{
        startImg:(imgs)=>{dispatch(actions.startImg(imgs))}
    }
}

export default Edit=connect(mapStateToProps,mapDispatchToProps)(Edit);
