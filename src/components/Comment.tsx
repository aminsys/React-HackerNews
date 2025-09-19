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

    const [expandedId, setExpandedId] = useState<number | null>(null)

    return (<div>
        {
            comments.comments?.map((comment) =>
                <div key={comment.id} style={commentStyle}>
                    <div>{cleanHtml(comment.text)}</div>
                    <p style={posterInfoStyle}>By: {comment.author} - Posted: {new Date(comment.created_at).toUTCString()} {comment.children?.length && comment.children?.length > 0 ? "- Replies: " + comment.children?.length : ''}</p>
                    {expandedId === comment.id && comment.children?.length !== 0 ?
                        <div>
                            <div style={expandStyle} onClick={() => { setExpandedId(null) }}>[-]</div>
                            <div>
                                {comment.children && <Comment comments={comment.children} />}
                            </div>
                        </div>
                        : <div>{comment.children?.length !== 0 ? <div style={expandStyle} onClick={() => { setExpandedId(comment.id); }}>[+]</div> : ''}</div>
                    }
                </div>
            )
        }
    </div>)
}

