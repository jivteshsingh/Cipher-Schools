import React, { useState } from 'react';
import axios from 'axios';
import { Text, VStack, Button, FormControl, Input } from '@chakra-ui/react';

import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';


function Comments(props) {
    const [comment, setComment] = useState("")
    const user = JSON.parse(localStorage.getItem("userInfo"))

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: comment,
            writer: user._id,
            postId: props.postId
        }

        axios.post('http://localhost:4000/api/video/comment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    return (
        <div>
            <br />
            <Text> Comments</Text>
            <hr style={{borderColor: 'rgb(40,40,40)'}}/>

            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentLists={props.commentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                        </React.Fragment>
                )
            ))}

            <VStack>
            <FormControl>
             <Input placeholder="Leave a Comment" onChange={handleChange} value={comment} />
              </FormControl>
            <Button onClick={onSubmit}>Submit</Button>
            </VStack>

        </div>
    )
}

export default Comments;