import React, { useState } from 'react';
import { cleanHtml } from './helpers/HtmlCleaner';


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

type Comments = {
    comments?: PostProps[]
}

const commentStyle = {
    backgroundColor: 'lightgray' as const,
    padding: '10px',
    margin: '20px',
    border: '1px solid black',
    textAlign: 'left' as 'left'
}

const expandStyle = {
    textAlign: 'right' as const,
    fontSize: '200%',
    fontWeight: 'bold',
    cursor: 'pointer'
}

const posterInfoStyle = {
    fontWeight: 'bold'
}

export default function Comment(comments: Comments) {

    const [toggle, isToggle] = useState(false)

    return (<div>
        {
            comments.comments?.map((comment, key) =>
                <div key={key} style={commentStyle}>
                    <p>{cleanHtml(comment.text)}</p>
                    <p style={posterInfoStyle}>By: {comment.author} - Posted: {new Date(comment.created_at).toUTCString()}</p>
                    {toggle && comment.children?.length !== 0 ?
                        <div>
                            <div style={expandStyle} onClick={() => { isToggle(!toggle); }}>[-]</div>
                            <div>
                                {comment.children && <Comment comments={comment.children} />}
                            </div>
                        </div>
                        : <div>{comment.children?.length !== 0 ? <div style={expandStyle} onClick={() => { isToggle(!toggle); }}>[+]</div> : ''}</div>
                    }
                </div>
            )
        }
    </div>)
}

