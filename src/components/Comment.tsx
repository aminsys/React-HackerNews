import React from 'react';

type CommentProps = {
    text: string
    points: number
    childrenComments?: CommentProps[]
}

