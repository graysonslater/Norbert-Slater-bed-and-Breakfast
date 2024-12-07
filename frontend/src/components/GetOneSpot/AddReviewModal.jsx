/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState } from 'react';

import { useDispatch} from 'react-redux';

import { createReview } from '../../store/reviews'; 

import { useParams } from "react-router-dom";

import { OneSpot } from '../../store/spots';

import CustomModal from '../../context/CustomModal';

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function AddReviewModal() {
    const dispatch = useDispatch();
    //grab spotId from url
    const {spotId} = useParams();

/***********************************************************************************************************************************************/
//*                             form submission
/***********************************************************************************************************************************************/

    // const reviewEvent = (e) => {
    //     e.preventDefault();
    //     setShowsubmit(!showSubmit)

    // }

    const toggleModal = () => setShowSubmit(!showSubmit);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("REVIEW COMP =", review)
        
        //dispatch new review
        dispatch(createReview({
            id: spotId,
            review: review,
            stars: stars
        }));
        //update spot info
        dispatch(OneSpot(spotId));

        //reset state
        setReview("");
        setStars("");
        toggleModal();
    };

/***********************************************************************************************************************************************/
//*                             setting state
/***********************************************************************************************************************************************/

const [review, setReview] = useState("");
const [stars, setStars] = useState();
const [showSubmit, setShowSubmit] = useState(false)

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    return(
        <>
            <button type="button" onClick={toggleModal}>Add Review</button>
            <>{showSubmit &&
                <CustomModal onClose={toggleModal}>
                    <h2>How was your stay?</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Review
                            <input
                                type="text"
                                placeholder="Leave your review here..."
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
                        <button type="submit">Submit Your Review</button>
                    </form>
                </CustomModal>}
            </>
        </>
    )
}

export default AddReviewModal;