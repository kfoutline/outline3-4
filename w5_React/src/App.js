import React from 'react';

import Home from './pages/Home.jsx';

import TodoList from './pages/TodoList';

function App(){
    return <div>
        App,
        {/* <input value={null} /> */}
        <Home username="lemon">
            <div>
                <h1>321</h1>
            </div>
            <p>666</p>
        </Home>
        <TodoList/>
    </div>
}

export default App;