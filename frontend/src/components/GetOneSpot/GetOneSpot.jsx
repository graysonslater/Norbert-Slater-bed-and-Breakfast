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
    //Get the spot and reviews objects
    const { spot, reviews } = useSelector((state) => {
        // console.log("TEST COMP" , state.spots.spot) //prints value of spot and review obj in browser console
        return { spot: state.spots.spot || {}, reviews: state.spots.reviews.Reviews ||{}}; //Reviews is plural!!!
    });

    //loading state
    // const [isLoading, setIsLoading] = useState(true); //!adding a loading state to solve load issue???
    
    //flatten review object
    const reviewObj =  reviews.reduce((acc, rev) => {
        acc[rev.id] = rev;
        return acc;
    }, {});

    //Load the specific spot
    useEffect(() => {
        dispatch(OneSpot(spotId)).then(() => setIsLoading(false));
    }, [dispatch, spotId])

/***********************************************************************************************************************************************/
//*                             USER IS LOGGGED IN 
/***********************************************************************************************************************************************/

    //DETERMINE IF USER IS LOGGED IN
    const sessionUser = useSelector((state) => {
        console.log("COMP SESSION",state.session.user, "OWNER ID =", spot.ownerId)
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
                        {Object.values(reviewObj).map((review) => (
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

export default GetOneSpot;