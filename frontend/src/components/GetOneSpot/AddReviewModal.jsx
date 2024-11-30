/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
//Important to note useNavigate and Navigate are different functions!!!!
import { useNavigate } from 'react-router-dom'; //!NEED TO NAVIGATE BACK TO SPOT PAGE!!!!

import { createReview } from '../../store/reviews'; 

import { useParams } from "react-router-dom";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function AddReviewModal() {
    const dispatch = useDispatch();
    //grab spotId from url
    const {spotId} = useParams();
    const navigate = useNavigate();
    console.log('ARM spotID =', spotId)



/***********************************************************************************************************************************************/
//*                             form submission
/***********************************************************************************************************************************************/

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("REVIEW COMP =", review)
    //dispatch new review
    dispatch(createReview({
        id: spotId,
        review: review,
        stars: stars
    }))
    // navigate(`/spots/${spotId}`)
};

/***********************************************************************************************************************************************/
//*                             setting state
/***********************************************************************************************************************************************/

const [review, setReview] = useState("");
const [stars, setStars] = useState();

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    return(
        <>
            <h2>Add Review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Review
                    <input
                        type="text"
                        placeholder="Write review here"
                        value= {review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>
                <label>
                    Stars
                    <input
                        type="number"
                        placeholder="0 to 5"
                        min="0"
                        max="5"
                        value= {stars}
                        onChange={(e) => setStars(Number(e.target.value))}
                    />
                </label>
                <button type="submit">Submit Review</button>
            </form>
        </>
    )
}

export default AddReviewModal;