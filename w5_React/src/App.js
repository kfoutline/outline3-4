import React from 'react';

import Home from './pages/Home.jsx';

import TodoList from './pages/TodoList';

// import Cart from './pages/Cart.tsx';

// function App(){
//     return <div>
//         App,
//         {/* <input value={null} /> */}
//         <Home username="lemon">
//             <div>
//                 <h1>321</h1>
//             </div>
//             <p>666</p>
//         </Home>
//         {/* <Cart/> */}
//         {/* <TodoList/> */}
//     </div>
// }

class App extends React.Component{
    state = {
        username:'laoxie'
    }
    static myage = 18;
    show = ()=>{
        
    }
    render(){
        console.log(this)
        console.dir(App)
        return <div>
        <Home username="lemon">
            <div>
                <h1>321</h1>
            </div>
            <p>666</p>
        </Home>
        {this.state.username}
    </div>
    }
}

export default App;