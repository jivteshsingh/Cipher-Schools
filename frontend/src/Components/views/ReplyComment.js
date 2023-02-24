import { VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';
import { Text } from '@chakra-ui/react';

function ReplyComment(props) {
    const [childComponentCount, setChildComponentCount] = useState(0)
    const [openReplyComments, setOpenReplyComments] = useState(false)
    
    useEffect(() => {

        let commentNumber = 0;
        props.commentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildComponentCount(commentNumber)
    }, [props.commentLists, props.parentCommentId])

    let renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId && 
                
                <div style={{marginLeft:"20px"}}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentLists={props.commentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                        </div>
                }
            </React.Fragment>
        ))

    const handleChange = () => {
        setOpenReplyComments(!openReplyComments)
    }


    return (
        <div>

            {childComponentCount > 0 &&
                <Text
                    onClick={handleChange} >
                    {!openReplyComments ? 
                        "View " + childComponentCount + (childComponentCount > 1 ? " more comments": " more comment") :
                        "Hide " + childComponentCount + (childComponentCount > 1 ? " comments": " comment")
                    }
            </Text>
            }

            {openReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment;