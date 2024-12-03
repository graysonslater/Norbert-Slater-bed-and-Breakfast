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
    console.log("FUNC COMP START")
    const dispatch = useDispatch();

    const {spotId} = useParams();

    //loading state
    const [isLoading, setIsLoading] = useState(false);

  
    //Get the spot and reviews objects
    const { spot, reviews } = useSelector((state) => {
        console.log("TEST COMP" ,"spot ID =", spotId, "spots = ", state.spots.spot, "REVIEW OBJ = ", state.reviews) //prints value of spot and review obj in browser console
        return { spot: state.spots.spot || {}, reviews: state.reviews.Reviews || []}; //Reviews is plural!!!
    });
    console.log("GOS REVIEW  =", reviews)

     //Load the specific spot
     useEffect(() => {
        console.log("USE EFFECT 1 spotId ABOVE",spotId)
        dispatch(OneSpot(spotId));
        setIsLoading(true);
        console.log("USE EFFECT 1 spotId BELOW",spotId)
    }, [dispatch, spotId])

    //Load reviews
    
        //     useEffect(() => {
        //         console.log("USE EFFECT GOS")
        //     dispatch(reviewsBySpotId(spotId));
        //     setIsLoading(true);
        // }, [reviews])
    
    
/***********************************************************************************************************************************************/
//*                             USER IS LOGGGED IN 
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
                <div className="singleSpotReviews">
                    <h3>{spot.numReviews} Reviews</h3>
                        <ul className="singleSpotReviewsList">
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    <p>User {review.userId}: {review.review}</p>
                                    <p>Stars: {review.stars}/5</p>
                                </li>
                            ))}
                        </ul>
                </div>
            </div>
        )
    }
}

export default GetOneSpot;