import React, { useEffect, useState } from 'react';
import { convert } from 'html-to-text';
import Microlink from '@microlink/react';

interface PostProps {
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

type postId = {
    id: number
}


export default function Post(id: postId) {

    const [toggle, isToggle] = useState(false);
    const [post, setPost] = useState<PostProps>({} as PostProps);

    useEffect(() => {
        const getPost = async () => {
            fetch("http://hn.algolia.com/api/v1/items/" + id.id)
                .then((response) => response.json())
                .then((data) => { setPost(data); }) // Sets the result into post
                .catch((err) => console.log("An error occured: " + err))
        }
        getPost();
    }, []) // Only call the api once

    const postStyle = {
        backgroundColor: 'lightgray',
        padding: '10px',
        margin: '20px',
        textAlign: 'left' as const,
        width: '100%'
    };

    const commentStyle = {
        backgroundColor: 'lightgray',
        padding: '10px',
        margin: '20px',
        border: '1px solid black',
        textAlign: 'left' as 'left'
    };

    const urlPreviewStyle = {
        textAlign: 'center' as const
    }

    return (
        <div style={postStyle} onClick={() => { isToggle(!toggle); }}>

            <h1>{post.title}</h1>
            <h5>{post.text !== null ? convert(post.text) : <span><Microlink url={post.url} size='normal' media='logo' contrast></Microlink></span>}</h5>
            { toggle ? 
                <div>
                    <h5>{post?.children?.length !== 0 ? "Comments:" : ""}</h5>
                    {post?.children?.map((comment, key) =>
                        <div key={key} style={commentStyle}>
                            <p>{convert(comment.text)}</p>
                            <p>{comment.author}</p>
                            <p>{new Date(comment.created_at).toUTCString()}</p>
                        </div>

                    )}
                </div>
                :
                <div></div>
            }
        </div>
    );
}