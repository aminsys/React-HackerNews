import React from 'react';
import { convert } from 'html-to-text';


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
};

export default function Comment(comments: Comments) {
    return (<div>
        {
            comments.comments?.map((comment, key) =>
                <div key={key} style={commentStyle}>
                    <p>{convert(comment.text, { selectors: [{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } }] })}</p>
                    <br />
                    <p>By: {comment.author} - Posted: {new Date(comment.created_at).toUTCString()}</p>

                    <div>
                        {comment.children && <Comment comments={comment.children} />}
                    </div>
                </div>
            )
        }
    </div>)
}

