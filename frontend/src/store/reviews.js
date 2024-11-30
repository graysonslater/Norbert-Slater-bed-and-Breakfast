/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { csrfFetch } from './csrf';

/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/
const GET_REVIEWS_SPOTID ="review/getReviewsBySpotId"
const CREATE_REVIEW = "review/createReview"

//Get reviews by spotId
const reviewsBySpotIdAO = (reviews) => {
    return {
        type: GET_REVIEWS_SPOTID,
        payload: reviews
    }
}

//create a review
const createReviewAO = (review) => {
    console.log('createreviewAO printout')
    return{
        type: CREATE_REVIEW,
        payload: review
    }
}

/***********************************************************************************************************************************************/
//*                            THUNKS
/***********************************************************************************************************************************************/

//Get reviews by spot Id
export const reviewsBySpotId = (spotId) => async (dispatch) => {
    const reviewResponse = await csrfFetch((`/api/spots/${spotId}/reviews`), {
        method: "GET"
    });

    const reviewData = await reviewResponse.json();
    dispatch(getOneSpot(reviewData));
    console.log("REV STORE =",reviewData)
    return {reviewData}
}
//create a review
export const createReview = (reviews) => async (dispatch) => {
    
    const {id, review, stars} = reviews;
    console.log("REVIEW STORE =", reviews)
    const newReview = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars
        })
    });
    const response = await newReview.json();
    dispatch(createReviewAO(response))
    console.log("STORE CREATE SPOT = ", response);
    return response;
};

/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {review: [], reviewsById: []}

const reveiwReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_REVIEW:
            return {...state, review: action.payload};
        case GET_REVIEWS_SPOTID:
            return {...state, reviewsById: action.payload};
        default: 
            return state;
    }
};

export default reveiwReducer;