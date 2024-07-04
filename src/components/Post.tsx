import React, { useEffect, useState } from 'react';
import { convert } from 'html-to-text';
import UrlPreview from './helpers/UrlPreview.tsx';

interface PostProps {
    readonly id: number
    readonly created_at: string
    readonly title: string
    readonly author: string
    url: string
    text: null
    points: number
    parent_id: null
    children?: PostProps[]
}

type postId = {
    id: number
}
const regexUrl = "/([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm";
const replaceTextWithUrl = (text) => {
    // var convertedText = convert(text, { selectors: [{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } }] })
    // var newText = convertedText.replace(regexUrl, "<a href='$1'>$1</a>");
    // var newText2 = newText.replace("/\n/g", "<br>");
    // console.log(newText2.toString());
    // return newText2.toString();
    return convert(text, { selectors: [{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } }] });
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
        backgroundColor: 'lightgray' as const,
        padding: '10px',
        margin: '20px',
        textAlign: 'left' as const,
        width: '100%',
        whiteSpace: 'pre'
    };

    const commentStyle = {
        backgroundColor: 'lightgray' as const,
        padding: '10px',
        margin: '20px',
        border: '1px solid black',
        textAlign: 'left' as 'left'
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
            <p>{post.text !== null ?
                replaceTextWithUrl(post?.text) :
                <a href={post?.url}>{post?.url}</a>
            }
            </p>
            <p>By: {post.author} - Posted: {new Date(post.created_at).toUTCString()} - Comments: {post.children?.length} - Points: {post.points}</p>
            {toggle ?
                <div>
                    <div style={expandStyle} onClick={() => { isToggle(!toggle); }}>[-]</div>
                    <h5>{post?.children?.length !== 0 ? "Comments:" : ""}</h5>
                    {post?.children?.map((comment, key) =>
                        <div key={key} style={commentStyle}>
                            <p>{convert(comment.text, { selectors: [{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } }] })}</p>
                            <br />
                            <p>By: {comment.author} - Posted: {new Date(comment.created_at).toUTCString()}</p>
                        </div>

                    )}
                </div>
                : <div>{post?.children?.length !== 0 ? <div style={expandStyle} onClick={() => { isToggle(!toggle); }}>[+]</div> : ''}</div>
            }
        </div>
    );
}