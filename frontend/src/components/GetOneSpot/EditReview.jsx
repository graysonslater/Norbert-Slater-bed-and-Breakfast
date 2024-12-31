/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
//Important to note useNavigate and Navigate are different functions!!!!

import { OneSpot } from "../../store/spots";

import { editReview, reviewsBySpotId } from '../../store/reviews';

import { useParams } from 'react-router-dom';

import CustomModal from '../../context/CustomModal';

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/
//reviewId must be inherited from getonespot
function EditReviewModal(reviewId) {
    const dispatch = useDispatch();

    //used to help navigate back  to spot page
    let {spotId} = useParams();
    spotId = Number(spotId)

/***********************************************************************************************************************************************/
//*                             Get Review
/***********************************************************************************************************************************************/

    //get user
    const sessionUser = useSelector((state) => {
        return state.session.user});
    
    //get one review
    const reviews = useSelector(state => state.reviews.reviewsById.Reviews || []);
    const userReview = reviews.find(review => review.userId === sessionUser.id)
        
    // useEffect(() => {
    //     dispatch(reviewsBySpotId(sessionUser.id))   
    //    }, [dispatch]);

/***********************************************************************************************************************************************/
//*                             setting state
/***********************************************************************************************************************************************/

        const [stars, setStars] = useState(userReview.stars);
        const [reviewState, setReview] = useState(userReview.review);
        const [showSubmit, setShowSubmit] = useState(false);

/***********************************************************************************************************************************************/
//*                             form submission
/***********************************************************************************************************************************************/

    const toggleModal = () => {
        if (showSubmit) {
            setReview(userReview.review); 
            setStars(userReview.stars);  
        }
        setShowSubmit(!showSubmit);
    };

    const handleSubmit =  async(e) => {
        //prevent auto submit
        e.preventDefault();

        //dispatch new data for update
        await dispatch(editReview({
            reviewId,
            stars,
            reviewState
        }))

        await dispatch(reviewsBySpotId(spotId))
        await dispatch(OneSpot(spotId))
        //close modal
        toggleModal(); 
    };

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    return (
        <>
            <button type="button" className='editReviewButton' onClick={toggleModal}>edit Review</button>
            {showSubmit && (
                <CustomModal onClose={toggleModal}>
                    <form className='revEditForm' onSubmit={handleSubmit}>
                        <label>
                            Review
                            <input 
                                type="text"
                                value={reviewState}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </label>
                        <label>
                            Stars
                            <input 
                                type="integer"
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                            />
                        </label>
                        <div className="button-container">
                            <button 
                                type="submit" 
                                className="submit-button"
                            >
                                Submit Your Review
                            </button>
                            <button 
                                type="button" 
                                onClick={toggleModal} 
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </CustomModal>
            )}
        </>
    )

}

export default EditReviewModal;