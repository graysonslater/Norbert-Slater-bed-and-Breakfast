//IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { OneSpot } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function GetOneSpot() { //function compnents should be in Pascal case!!

    //INIT
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const { spot, reviews } = useSelector((state) => {
        console.log("TEST COMP" , state.spots.reviews )
        return { spot: state.spots.spot, reviews: state.spots.reviews.Reviews };
    });

    const reviewObj = reviews.reduce((acc,rev)=> { //Example of flattening data!!!
        acc[rev.id] = rev;
        return acc;
    },{})

    //Load the specific spot
    useEffect(() =>{
        dispatch(OneSpot(spotId))
    }, [dispatch,spotId]) //page will update if spotId changes

    //HTML
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