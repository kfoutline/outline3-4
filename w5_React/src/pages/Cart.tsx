import React,{Component} from 'react';

class Cart extends Component{
    static defaultProps = {
        username:'laoxie'
    }
    render(){
        return <div>
            Cart,{this.props.username}
        </div>
    }
}

export default Cart;