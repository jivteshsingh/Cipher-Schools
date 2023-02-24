import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BiLike,BiDislike} from "react-icons/bi";
import {AiFillLike,AiFillDislike} from "react-icons/ai";
import { HStack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';


function LikeDislike (props) {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(null);
    const [dislikes, setDislikes] = useState(0);
    const [isDisliked, setIsDisliked] = useState(null);

    let variable = {

    }

    if(props.video) {
        variable = {videoId: props.videoId, userId: props.userId}
    }

    useEffect(() => {
        axios.post('http://localhost:4000/api/video/fetch/likes', variable).then(response => {
            if(response.data.success) {
                setLikes(response.data.likes.length)
                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setIsLiked('liked')
                    }
                })
            } else {
                alert("Failed to get likes");
            }
        })

        axios.post('http://localhost:4000/api/video/fetch/dislikes', variable).then(response => {
            if(response.data.success) {
                setDislikes(response.data.dislikes.length)
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setIsDisliked('disliked')
                    }
                })
            } else {
                alert("Failed to get dislikes");
            }
        })
    })

    const onLike = () => {
        if (isLiked == null) {
            axios.post('http://localhost:4000/api/video/like', variable).then(response => {
                if(response.data.success) {
                    setLikes(likes + 1)
                    setIsLiked('liked')

                    if(isDisliked !== null){
                        setDislikes(dislikes - 1)
                        setIsDisliked(null)
                    }
                    
                } else {
                    alert("Failed to increase like count")
                }
            })
        } else {
            axios.post('http://localhost:4000/api/video/unlike', variable).then(response => {
                if(response.data.success) {
                    setLikes(likes - 1)
                    setIsLiked(null)
                } else {
                    alert("Failed to decrease like count")
                }
            })
        }
    }

    const onDislike = () => {
        if (isDisliked === null) {
            axios.post('http://localhost:4000/api/video/dislike', variable).then(response => {
                if(response.data.success) {
                    setDislikes(dislikes + 1)
                    setIsDisliked('disliked')

                    if(isLiked !== null){
                        setLikes(likes - 1)
                        setIsLiked(null)
                    }
                } else {
                    alert("Failed to increase dislike count")
                }
            })
        } else {
            axios.post('http://localhost:4000/api/video/undislike', variable).then(response => {
                if(response.data.success) {
                    setDislikes(dislikes - 1)
                    setIsDisliked(null)
                } else {
                    alert("Failed to decrease dislike count")
                }
            })
        }
    }

    return(
        <HStack>
            {isLiked === 'liked' ? <AiFillLike onClick={onLike} /> : <BiLike onClick={onLike} />}
            <Text>{likes}</Text>
            {isDisliked === "disliked" ? <AiFillDislike onClick={onDislike} /> : <BiDislike onClick={onDislike} />}
            <Text>{dislikes}</Text>
        </HStack>
    )
}

export default LikeDislike