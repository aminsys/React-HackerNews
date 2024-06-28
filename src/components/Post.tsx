import React, { useEffect, useState } from 'react';
import { convert } from 'html-to-text';

type PostProps = {
    readonly id: number
    readonly created_at: string
    readonly title: string
    readonly author: string
    url: null
    text: null
    points: number
    parent_id: null
    children?: PostProps[]
}


export default function Post() {

    const [post, setPost] = useState<PostProps | null>({} as PostProps);

    const getPost = () => {
        fetch("http://hn.algolia.com/api/v1/items/40803536")
            .then((response) => response.json())
            .then((data) => { setPost(data); }) // Sets the result into post
            .catch((err) => console.log("An error occured: " + err))
    }

    useEffect(() => {
        getPost();
    }, []) // Only call the api once

        const postStyle = {
            backgroundColor: 'lightgray',
            padding: '10px',
            margin: '20px',
            textAlign: 'left',
            top: '10px'
        };

        const commentStyle = {
        backgroundColor: 'lightgray',
        padding: '10px',
        margin: '20px',
        border: '1px solid black',
        textAlign: 'left'
        };

    return (
        <div style={postStyle}>
            <h1>{post.title}</h1>
            <h4>{convert(post.text)}</h4>
            <div>
                <h4>{post?.children?.length !== 0 ? "Comments:" : ""}</h4>
                {post?.children?.map((comment, key) =>
                    <div key={key} style={commentStyle}>
                        <p>{convert(comment.text)}</p>
                        <p>{comment.author}</p>
                        <p>{new Date(comment.created_at).toUTCString()}</p>
                    </div>

                )}
            </div>
        </div>
    );
}