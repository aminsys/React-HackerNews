import logo from './logo.svg';
import './App.css';
import React from 'react';
import PostList from './components/PostList';
import BurgerMenu from './components/BurgerMenu';

function App() {
  return (
    <div>
      <div className='navbar'>
        <img src={logo} className="App-logo" alt="logo" width={100} />
        <h1>Reactified Hacker News</h1>
        <div>
          <BurgerMenu />
        </div>
      </div>
      
      <div className="App">
        <PostList />
      </div>
    </div>
  );
}

export default App;
