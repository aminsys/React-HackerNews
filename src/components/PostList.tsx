import React, { useEffect, useState } from 'react'
import Post from './Post';
import '../App.css';


export default function PostList() {

    // https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty // 500 posts

    const [ids, setIds] = useState([]);
    const getPostIds = async (type: string) => {
        fetch('https://hacker-news.firebaseio.com/v0/' + type + '.json?print=pretty')
            .then((response) => response.json())
            .then((data) => setIds(data))
            .catch((err) => console.log("Error: " + err));
    };
    useEffect(() => {
        getPostIds("topstories");
        changeActiveTab();
    }, []);

    const postListStyle = {
        display: "flex",
        backgroundColor: 'gray'
    };

    function changeActiveTab(){
        const elements = document.getElementsByClassName("tab-link");
        for(let i = 0; i < elements.length; i++){
            elements[i].addEventListener('click', function (this : HTMLElement) {
                var current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace('active', '');
                this.className += ' active';
            })
        }
    }

    const postIds = ids.splice(0, 5); // get first five posts by id

    return (

        <div>
            <button className='tab-link active' onClick={() => {getPostIds("topstories"); changeActiveTab();}}>Top HN</button>
            <button className='tab-link' onClick={() => {getPostIds("newstories"); changeActiveTab();}}>New HN</button>
            <button className='tab-link' onClick={() => {getPostIds("beststories"); changeActiveTab();}}>Best HN</button>
            <button className='tab-link' onClick={() => {getPostIds("askstories"); changeActiveTab();}}>Ask HN</button>
            <button className='tab-link' onClick={() => {getPostIds("showstories"); changeActiveTab();}}>Show HN</button>
            <button className='tab-link' onClick={() => {getPostIds("jobstories"); changeActiveTab();}}>Jobs HN</button>
            {postIds.map((id, key) => (
                <div key={key} style={postListStyle}>
                    <Post id={id} />
                </div>
            ))}
        </div>
    );
}