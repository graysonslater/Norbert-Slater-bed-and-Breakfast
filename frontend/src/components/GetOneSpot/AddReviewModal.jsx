/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState } from 'react';

import { useDispatch} from 'react-redux';

import { createReview } from '../../store/reviews'; 

import { useParams } from "react-router-dom";

import { OneSpot } from '../../store/spots';

import CustomModal from '../../context/CustomModal';

import "./AddReviewModal.css";

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

    const toggleModal = () => {
        if (showSubmit) {
            setReview(""); 
            setStars("");  
            setServerErrors([]); 
        }
        setShowSubmit(!showSubmit);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerErrors([]);

        try {

            //dispatch new review
            await dispatch(createReview({
                id: spotId,
                review: review,
                stars: stars
            }));
            await dispatch(OneSpot(spotId));
            
            //reset state
            setReview("");
            setStars("");
            toggleModal(); 

        //ERROR HANDLING
        } catch (error) {
            console.log("error Print out ",error.status)
            if (error.status) {
                setServerErrors({text:error.statusText, code:error.status})
                console.log("server err assign =", Object.keys(serverErrors).length)
            }
        }
    }
/***********************************************************************************************************************************************/
//*                             setting state
/***********************************************************************************************************************************************/

const [review, setReview] = useState("");
const [stars, setStars] = useState();
const [showSubmit, setShowSubmit] = useState(false)
const [serverErrors, setServerErrors] = useState([]); 

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    return(
        <>
            <button type="button" onClick={toggleModal}>Add Review</button>
            {showSubmit && (
                <CustomModal onClose={toggleModal}>
                    <h2>How was your stay?</h2>
                    {Object.keys(serverErrors).length > 0 && (
                        <div className="error-messages">
                            <p>Error:</p>
                            <ul> 
                                <li>{serverErrors.code}</li>
                                <li>{serverErrors.text}</li>                              
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="button-container">
                        <label>
                            Review
                            <input
                                type="text"
                                placeholder="Leave your review here..."
                                value={review}
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
                                value={stars}
                                onChange={(e) => setStars(Number(e.target.value))}
                            />
                        </label>
                        <div className="button-container">
                            <button 
                                type="submit" 
                                disabled={review === '' || stars === undefined}
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

export default AddReviewModal;