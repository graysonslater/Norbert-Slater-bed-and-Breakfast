/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/


import { useDispatch, useSelector } from "react-redux";

import { OneSpot } from "../../store/spots";

import { reviewsBySpotId } from "../../store/reviews";

import { useEffect,useState } from "react";

import { useParams } from "react-router-dom";

import EditSpotModal from "./EditSpotModal";

import AddReviewModal from "./AddReviewModal"

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function GetOneSpot() { //function compnents should be in Pascal case!!
    const dispatch = useDispatch();
    const {spotId} = useParams();
    //loading state
    const [isLoading, setIsLoading] = useState(false);

/***********************************************************************************************************************************************/
//*                             Store params
/***********************************************************************************************************************************************/

    //Get the spot and reviews objects
    const spot = useSelector(state => state.spots.spot || {});

    const reviews = useSelector(state => state.reviews.reviewsById.Reviews || []);
    console.log("spot =", spot, "reviews =", reviews)

     //Load the specific spot
     useEffect(() => {
        dispatch(OneSpot(spotId));
        dispatch(reviewsBySpotId(spotId))
        setIsLoading(true);
    }, [dispatch, spotId])

    //Load reviews
    
        //     useEffect(() => {
        //         console.log("USE EFFECT GOS")
        //     dispatch(reviewsBySpotId(spotId));
        //     setIsLoading(true);
        // }, [reviews])
    
    
/***********************************************************************************************************************************************/
//*                             USER IS LOGGGED IN conditional
/***********************************************************************************************************************************************/

    //DETERMINE IF USER IS LOGGED IN
    const sessionUser = useSelector((state) => {
        return state.session.user});

    let userViewMod;
    //spot belongs to user
    if (sessionUser && sessionUser.id === spot.ownerId ) {
        userViewMod =(
            <div className="GOSuserLogged">
                <EditSpotModal />
            </div>
        )
    //spot does not belong to user 
    }else if (sessionUser && sessionUser.id !== spot.ownerId ){
        // console.log("SPOT ID 2 = ", spot.ownerId)
        userViewMod = (
            <div className="GOSNotLoggedAddReview">
                <AddReviewModal />
            </div>
        )
    }   

/***********************************************************************************************************************************************/
//*                             Reviews viewing conditional
/***********************************************************************************************************************************************/

    let reviewViewMod;
    if (sessionUser && reviews.length > 0 && sessionUser.id !== spot.ownerId){
        reviewViewMod = (
            <div className="singleSpotReviews">
                <h3>{reviews.length} Review{reviews.length !== 1 ? 's' : ''}</h3>
                    <ul className="singleSpotReviewsList">
                        {reviews.map((review) => (
                            <li key={review.id}>
                                <p>{review.ReviewUser.firstName}: {review.review}</p>
                                <p>Stars: {review.stars}/5</p>
                                <p>Date created: {new Date(review.createdAt).getMonth() + 1}/{new Date(review.createdAt).getFullYear()}</p>
                            </li>
                        ))}
                    </ul>
            </div>
        )
    } else {
        reviewViewMod =(
            <div>Be the first to post a review</div>
        )
    }

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    if(isLoading){
        return (
            <div className="singleSpotPAge">
                <div className="singleSpot">
                    <h2>{spot.name}</h2>
                        <img className="SingleSpotImage" src={spot.previewImage} alt="Preview Image" />
                        <p>Description: {spot.description}</p>
                        <p>Price: {spot.price}</p>
                        <p>Average Rating: {spot.avgRating}/5</p>
                        <p>Location: {spot.address}, {spot.city}, {spot.state}, {spot.country}</p>    
                </div>
                <div className="userViewMod">
                    {userViewMod}
                </div>
                <div>
                    {reviewViewMod}
                </div>
            </div>
        )
    }
}

export default GetOneSpot;