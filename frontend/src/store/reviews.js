/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/
/* eslint-disable */
import { csrfFetch } from './csrf'; 

import { OneSpot } from './spots';

/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const GET_REVIEWS_SPOTID ="review/getReviewsBySpotId";
const CREATE_REVIEW = "review/createReview";
const GET_REVIEW_BY_USERID = "review/getReviewByUserId";
const EDIT_REVIEW = "review/editReview";
const GET_ONE_REVIEW = "review/getOneReview";

//Get reviews by spotId
const reviewsBySpotIdAO = (reviews) => {
    return {
        type: GET_REVIEWS_SPOTID,
        payload: reviews
    }
};

//Get review by user id
const reviewByUserIdAO = (review) => {
    return {
        type: GET_REVIEW_BY_USERID,
        payload: review
    }
}

//edit review
const editReviewAO = (review) => {
    return{
        type: EDIT_REVIEW,
        payload: review
    }
}

//get one review by review id
const getOneReviewAO = (review) => {
    return {
        type: GET_ONE_REVIEW,
        payload: review
    }
};

/***********************************************************************************************************************************************/
//*                            THUNKS
/***********************************************************************************************************************************************/

//Get reviews by spot Id
export const reviewsBySpotId = (spotId) => async (dispatch) => {
    const reviewResponse = await csrfFetch((`/api/spots/${spotId}/reviews`), {
        method: "GET"
    });
    const reviewData = await reviewResponse.json();
    dispatch(reviewsBySpotIdAO(reviewData));
    // console.log("REV STORE RBSI =",reviewData)
    return reviewData
}

//create a review
export const createReview = (reviews) => async (dispatch) => {
    
    const {id, review, stars} = reviews;
    console.log("STORE= ", typeof stars)
    const newReview = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars
        })
    });

    

    //update review state
    const reviewResponse = await csrfFetch((`/api/spots/${id}/reviews`), {
        method: "GET"
    });
    const response = await reviewResponse.json();
    dispatch(reviewsBySpotIdAO(response));
    //update spot state 
    dispatch(OneSpot(id))
    return response;
};

//delete a review
export const deleteReview = ({reviewId, spotId}) => async(dispatch) => { //owner Id auto passed in with req???

    //send delete request to back end
    const deleteReq = await csrfFetch((`/api/reviews/${reviewId}`), {
        method: "DELETE",
    })

    //update spot state 
    dispatch(OneSpot(spotId))

    //update review state
    const reviewResponse = await csrfFetch((`/api/spots/${spotId}/reviews`), {
        method: "GET"
    });
    const reviewData = await reviewResponse.json();
    dispatch(reviewsBySpotIdAO(reviewData));
    return reviewData
}

//Edit review
export const editReview = (reviewUpdate) => async (dispatch) => {
    
    const {reviewId} = reviewUpdate.reviewId;
    
    const {stars, reviewState} = reviewUpdate;
    console.lgo
    const updatedReview = await csrfFetch((`/api/reviews/${reviewId}`), {
        method: "PATCH",
        body: JSON.stringify({
            stars,
            reviewState
        })
    })
    const response = await updatedReview.json();
    dispatch(editReviewAO(response));
    return response;
}

//get review by userId
export const getOneReview = (reviewId) => async (dispatch) => {
    const request = await csrfFetch((`/${reviewId}`),{
        method: "GET"
    });
    const response = await request.json();
    dispatch(getOneReviewAO(response));
    return response;
}

/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {review: [], reviewsById: [], oneReview: []}

const reveiwReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_REVIEW:
            return {...state, reviewsById:[...state.reviewsById, action.payload]};
        case GET_REVIEWS_SPOTID:
            return {...state, reviewsById: action.payload};
        case EDIT_REVIEW:
            return {...state, reveiwsById: action.payload};
        case GET_ONE_REVIEW:
            return{...state, oneReview: action.payload}
        default: 
            return state;
    }
};

export default reveiwReducer;