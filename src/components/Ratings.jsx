import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Ratings = ({ rating, onClick }) => {
    return (
        <>
            {[...Array(5)].map((_, ind) => {
                return (
                    <span onClick={() => onClick(ind)} key={ind} >
                        {rating > ind ? (<AiFillStar fontSize="15px" />) : (<AiOutlineStar fontSize="15px" />)}
                    </span>
                )
            })}
        </>
    )
}

export default Ratings