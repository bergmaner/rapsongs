import React, { useEffect, useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import styled from "styled-components"

const CommentsForm = styled.form`
  display: flex;
  justify-content: space-around;
  margin-top: 32px;
  ${Input} {
    width: 75%;
    margin-top: auto;
    margin-bottom: auto;
  }
  ${Button} {
    margin: auto 0;
  }
`

const Comment = styled.div`
  > strong {
    font-size: 80%;
    color: #666;
  }
  border-bottom: 1px solid #ddd;
  padding: 4px 0;
`

export const Comments = ({ firebase, albumId }) => {
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    const unsubscribe = firebase.getComments({
      albumId,
      onSnapshot: snap => {
        const snapComments = []
        snap.forEach(doc => {
          snapComments.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setComments(snapComments)
      },
    })
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const handlePostCommentSubmit = e => {
    e.preventDefault()
    console.log(text)
    firebase.postComment({
        content: text,
        albumId
    })
  }

  return (
    <div>
      <CommentsForm onSubmit={handlePostCommentSubmit}>
        <Input
          placeholder="Type your comment"
          value={text}
          onChange={e => {
            e.persist()
            setText(e.target.value)
          }}
        />
        <Button>Post comment</Button>
      </CommentsForm>
      {comments.map(comment => (
        <Comment key={comment.id}>
          <strong>{comment.username}</strong>
          <div>{comment.content}</div>
        </Comment>
      ))}
    </div>
  )
}
