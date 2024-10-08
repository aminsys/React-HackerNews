import React, { useEffect, useState } from 'react';
import UrlPreview from './helpers/UrlPreview';
import Comment from './Comment';
import {cleanHtml} from './helpers/HtmlCleaner'

interface PostProps {
    readonly id: number
    readonly created_at: string
    readonly title: string
    readonly author: string
    url: string
    text: string
    points: number
    parent_id: null
    children?: PostProps[]
}

type postId = {
    id: number
}

function commentCounter(post: PostProps) : number {
    let totalComments = 0

    post.children?.forEach(c => {
        if(Array.isArray(c.children)){
            totalComments = totalComments + c.children.length + commentCounter(c)
        } 
    });
    return totalComments
}


export default function Post(id: postId) {

    const [toggle, isToggle] = useState(false)
    const [post, setPost] = useState<PostProps>({} as PostProps)
    let totalComments = 0

    useEffect(() => {
        const getPost = async () => {
            fetch("https://hn.algolia.com/api/v1/items/" + id.id)
                .then((response) => response.json())
                .then((data) => { setPost(data); }) // Sets the result into post
                .catch((err) => console.log("An error occured: " + err))
        }
        getPost()
    }, [id.id]) // Only call the api once
    
    if(post.children){
        totalComments += post.children?.length + commentCounter(post)
    }

    const postStyle = {
        backgroundColor: 'lightgray' as const,
        padding: '10px',
        textAlign: 'left' as const,
        width: '100%',
        whiteSpace: 'pre-wrap',
        border: '5px solid darkgray' 
    };

    const expandStyle = {
        textAlign: 'right' as const,
        fontSize: '200%',
        fontWeight: 'bold',
        cursor: 'pointer'
    }

    return (
        <div style={postStyle}>

            <h1>{post.title}</h1>
            <>{post.text !== null && post.text !== undefined ?
                cleanHtml(post.text) :
                // <a href={post.url}>{post.url}</a>
                <UrlPreview url={post.url} />
            }
            </>
            <p>By: {post.author} - Posted: {new Date(post.created_at).toUTCString()} - Comments: {totalComments} - Points: {post.points}</p>
            {toggle ?
                <div>
                    <div style={expandStyle} onClick={() => { isToggle(!toggle); }}>[-]</div>
                    <h5>{post.children?.length !== 0 ? "Comments:" : ""}</h5>
                    <Comment comments={post.children}></Comment>
                </div>
                : <div>{post?.children?.length !== 0 ? <div style={expandStyle} onClick={() => { isToggle(!toggle); }}>[+]</div> : ''}</div>
            }
        </div>
    );
}