import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Comment = styled.div`
>strong{
    font-size: 80%;
    color: #666;  
}
border-bottom: 1px solid #ddd;
padding: 4px 0;
`;

export const Comments = ({ firebase, albumId }) => {

    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        
        const unsubscribe = firebase.getComments({ albumId, onSnapshot: (snap) => { 
         const snapComments = [];
         snap.forEach( doc => {
             snapComments.push({
                 id: doc.id,
                ...doc.data()    
             })
         })
            setComments(snapComments) }});
        return () => {
            if(unsubscribe) unsubscribe();

        }
    }, [])

    return (
    <div>
        {comments.map( (comment) => 
    <Comment key = {comment.id}>
        <strong>{comment.username}</strong>
        <div>{comment.content}</div>
    </Comment> )}
    </div>
    );
}