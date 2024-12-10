/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";

import { OneSpot } from "../../store/spots";

import { reviewsBySpotId } from "../../store/reviews";

import { useEffect,useState } from "react";

import { useParams } from "react-router-dom";

import AddReviewModal from "./AddReviewModal"

import DeleteReview from "./DeleteReview";

import { getImagesBySpot } from "../../store/spotImage";

import "./GetOneSpot.css"

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
    // console.log("spot =", spot, "reviews =", reviews)

     //Load the specific spot
     useEffect(() => {
        dispatch(OneSpot(spotId));
        dispatch(reviewsBySpotId(spotId))
        dispatch(getImagesBySpot(spotId))
        setIsLoading(true);
    }, [dispatch, spotId]);

    
/***********************************************************************************************************************************************/
//*                             USER IS LOGGGED IN conditional
/***********************************************************************************************************************************************/

    //DETERMINE IF USER IS LOGGED IN
    const sessionUser = useSelector((state) => {
        return state.session.user});

    //load spots images
    const loadedImages = useSelector((state) => {
        return state.images.images
    })
    
    let userViewMod;
    //spot belongs to user
    if (sessionUser && sessionUser.id !== spot.ownerId ){
        const userHasReviewed = reviews.some(review => review.userId === sessionUser.id);
        userViewMod = (
            <>
                <div className="GOSNotLoggedAddReview">
                    {!userHasReviewed && <AddReviewModal />}
                </div>
                <div className="calloutBox">
                <p>Price: ${spot.price} per night</p>
                <button className="reserveButton" onClick={() => alert("Feature coming soon")}>Reserve</button>
                </div>
            </>
        )
    }   

/***********************************************************************************************************************************************/
//*                             Reviews viewing conditional
/***********************************************************************************************************************************************/

    let reviewViewMod;
    if (sessionUser && reviews.length > 0){
        reviewViewMod = (
            <div className="singleSpotReviews">
                <h3>{reviews.length} Review{reviews.length !== 1 ? 's' : ''}</h3>
                    <ul className="singleSpotReviewsList">
                        {reviews.map((review) => (
                            <li className="SingleReview" key={review.id}>
                                <p>{review.ReviewUser.firstName}: {review.review}</p>
                                <p>Stars <img src="/favicon-16x16.png" alt="Star Rating" />: {Number(review.stars).toFixed(1)}/5</p>
                                <p>Date created: {new Date(review.createdAt).getMonth() + 1}/{new Date(review.createdAt).getFullYear()}</p>
                                <p>
                                    {review.userId === sessionUser.id && <DeleteReview reviewId={review.id}/> }
                                </p>
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
    console.log(spot)
//NOTE this contains INLINE STYLING!!!
    if(isLoading){
        return (
            <div className="singleSpotGrid">
                <div className="singleSpot">
                    <h2>{spot.name}</h2>
                    <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
                    <div className="ImageBlock">
                        
                        <div className="smallImages">
                            {loadedImages.length > 0 ? (
                                loadedImages.slice(0, 4).map((image, index) => (
                                    <>
                                    {/* <p>{console.log("map test= ", image.url)} </p> */}
                                    <img key={index} className="SmallImage" src={image.url} alt={`Thumbnail ${index + 1}`} />
                                    </>
                                ))
                            ) : (
                                <p>No additional images available.</p>
                            )}
                    </div>
                    <img className="MainImage" src={spot.previewImage} alt="Preview Image" />
                </div>
                <p>Hosted by {spot.hostFirstName} {spot.hostLastName}</p>
                <p>Description: {spot.description}</p>
                <p>
                    Average Rating
                    <img src="/favicon-16x16.png" alt="Star Rating" />
                    : {spot.numReviews > 0 ? (
                        <>
                            {Number(spot.avgRating).toFixed(1)}
                            <span style={{ margin: '0 5px' }}>&middot;</span>
                            {spot.numReviews} review{spot.numReviews !== 1 ? 's' : ''}
                        </>
                    ) : (
                        "New"
                    )}
                </p>

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