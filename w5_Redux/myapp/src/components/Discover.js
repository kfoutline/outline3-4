import React,{Component} from 'react';

class Discover extends Component{
	render(){
		return <div className="Discover" onClick={()=>{console.log('Discover click')}}>
			发现
		</div>
	}
}

export default Discover;