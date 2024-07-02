import logo from './logo.svg';
import './App.css';
import React from 'react';
import Post from './components/Post.tsx';
import PostList from './components/PostList.tsx';


function App() {
  return (
    <div>
      <div className='navbar'>
        <img src={logo} className="App-logo" alt="logo" width={100} />
        <h1>Hacker News - Y Combinator</h1>
      </div>
      
      <div className="App">
        <PostList />
      </div>
    </div>
  );
}

export default App;
