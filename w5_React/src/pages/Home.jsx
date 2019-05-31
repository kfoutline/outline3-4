import React,{Component} from 'react';

class Home extends Component{
    static defaultProps = {
        username:'laoxie'
    }
    render(){
        console.log(this.props)
        return <div>
            Home,{this.props.username}
        </div>
    }
}

export default Home;