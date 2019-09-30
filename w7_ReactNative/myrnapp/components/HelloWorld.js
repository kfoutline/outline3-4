import React,{Component} from 'react';
import {View,Text,Button,Image} from 'react-native';

class HelloWorld extends Component{
    state = {
        num:1
    }
    change = ()=>{
        let {num} = this.state;
        num++;
        this.setState({
            num
        })
    }
    render(){
        return (
            <View>
                <Image source={require("../assets/img/mv2.jpg")}/>
                <Text>组件测试 {this.state.num}</Text>
                <Button
                onPress={this.change}
                title="世界十大美女"
                color="#58bc58"
                />
            </View>
        )
    }
}

export default HelloWorld;