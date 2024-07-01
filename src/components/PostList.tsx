import React, { useEffect, useState } from 'react'
import Post from './Post.tsx';


export default function PostList() {

    // https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty // 500 posts

    const [ids, setIds] = useState([]);

    useEffect(() => {
        const getPostIds = async (type) => {
            fetch('https://hacker-news.firebaseio.com/v0/' + type + '.json?print=pretty')
                .then((response) => response.json())
                .then((data) => setIds(data))
                .catch((err) => console.log("Error: " + err));
        };

        getPostIds("topstories");
    }, []);

    const postListStyle = {
        display: "flex",
        backgroundColor: 'gray'
    };

    const firstIds = ids.splice(0, 10);

    return (
        
        <div>
            {firstIds.map((id, key) => (
                <div key={key} style={postListStyle}>
                    <Post id={id} />
                </div>
            ))}
        </div>
    );
}