/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/


import { useDispatch, useSelector } from "react-redux";

import { OneSpot } from "../../store/spots";

import { useEffect,useState } from "react";

import { useParams } from "react-router-dom";

import EditSpotModal from "./EditSpotModal";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function GetOneSpot() { //function compnents should be in Pascal case!!

    const dispatch = useDispatch();
    const {spotId} = useParams();

    //loading state
    const [isLoading, setIsLoading] = useState(false);

    //Load the specific spot
    useEffect(() => {
        
        dispatch(OneSpot(spotId))
        setIsLoading(true);
    }, [dispatch, spotId])

    //Get the spot and reviews objects
    const { spot, reviews } = useSelector((state) => {
        // console.log("TEST COMP" , "spots = ", state.spots.spot, "REVIEW OBJ = ", state.spots.reviews.Reviews) //prints value of spot and review obj in browser console
        return { spot: state.spots.spot || {}, reviews: state.spots.reviews.Reviews ||{}}; //Reviews is plural!!!
    });

/***********************************************************************************************************************************************/
//*                             USER IS LOGGGED IN 
/***********************************************************************************************************************************************/

    //DETERMINE IF USER IS LOGGED IN
    const sessionUser = useSelector((state) => {
        // console.log("COMP SESSION",state.session.user, "OWNER ID =", spot.ownerId)
        return state.session.user});
    
    let userViewMod;
    if (sessionUser && sessionUser.id === spot.ownerId ) {
        userViewMod =(
            <div className="GOSuserLogged">
                <EditSpotModal />
            </div>
        )
    }else {
        userViewMod = (<>USER DOESNT OWN SPOT</>)
    }   

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    //mapping review
    // const reviewMap = reviews.map((review)=>{
    //     console.log("TEST MAP =", review)
    // })

    console.log("TEST LOG OF REVIEW= ",reviews)
    console.log("isLoading LOG= ",isLoading)
    if(isLoading){return (
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
    )}
}

export default GetOneSpot;