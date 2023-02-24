import React, { useState } from 'react'
import Axios from 'axios';
import LikeDislike from './LikeDislike'
import { Text, VStack, Button, FormControl, Input, HStack } from '@chakra-ui/react';

function SingleComment(props) {
    const [commentValue, setCommentValue] = useState("")
    const [openReplyPrompt, setOpenReplyPrompt] = useState(false)
    const user = JSON.parse(localStorage.getItem("userInfo"))

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReplyPrompt(!openReplyPrompt)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: commentValue
        }


        Axios.post('http://localhost:4000/api/video/comment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReplyPrompt(!openReplyPrompt)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    return (
        <div>
            

              <Text fontSize="2xl">{props.comment.writer.name}</Text>
              <Text as="b">
                        {props.comment.content}
               </Text>
            <Text style={{color: 'rgb(37, 141, 252)'}} onClick={openReply} key="comment-basic-reply-to">{!openReplyPrompt ? "Reply to " + props.comment.writer.name : "Cancel"}</Text>


            {openReplyPrompt &&

            <VStack>
            <FormControl>
             <Input placeholder={"Reply to " + props.comment.writer.name} onChange={handleChange} value={commentValue} />
              </FormControl>
            <Button onClick={onSubmit}>Submit</Button>
            </VStack>
            
            }
        </div>
    )
}

export default SingleComment;