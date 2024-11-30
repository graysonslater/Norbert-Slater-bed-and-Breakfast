/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { csrfFetch } from './csrf';

/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_ONE_SPOT = 'spots/getOneSpot';
const EDIT_SPOT = "spots/editSpot"

//get all spots
const getAllSpotsAO = (spots) => { //Note that spots is plural!!!
    return{
        type: GET_ALL_SPOTS,
        payload: spots
    }
};

//get one spot
const getOneSpot = (spot, reviews) => { //Note that spot is singular!!!
    return {
        type: GET_ONE_SPOT,
        payload: {spot, reviews}
    }
};

//edit a spot
const editSpotAO = (spot) => {
    return {
        type: EDIT_SPOT,
        payload: spot
    }
}

/***********************************************************************************************************************************************/
//*                            THUNKS
/***********************************************************************************************************************************************/

//get all spots
export const getSpots = () => async (dispatch) => {
    //get all the spots
    const response = await csrfFetch("/api/spots", {
        method: "GET"
    });

    const spots = await response.json();
    // console.log("TEST STORE", spots) 
    dispatch(getAllSpotsAO(spots.Spots));
    return spots.Spots;
};

//get one spot based off URL params
export const OneSpot = (spotId) => async (dispatch) => {
    // console.log("STORE Fetching data for spot ID:", spotId); 
    const spotResponse = await csrfFetch((`/api/spots/${spotId}`), {
        method: "GET"
    });
    const reviewResponse = await csrfFetch((`/api/spots/${spotId}/reviews`), {
        method: "GET"
    });
    // console.log("STORE TEST", spotResponse)
    const spotData = await spotResponse.json();
    const reviewData = await reviewResponse.json();

    dispatch(getOneSpot(spotData, reviewData));//the order is very important! it determines how the args are passed to the Action object!!!
    return {spotData,reviewData};
};

//Edit Spot
export const editSpot = (spot) => async (dispatch) => {
    //console.log('STORE EDIT TEST', spot)
    const {id, address, city, state, country, lat,lng, name, description, price, previewImage} = spot;
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            address, 
            city,
            state,
            country,
            lat, 
            lng,
            name, 
            description,
            price, 
            previewImage 
        })
    });
    const update = await response.json();
    dispatch(editSpotAO(update));
    // console.log("STORE UPDATE SPOT= ", update)
    return update;
};

/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {spots: [], spot: [], reviews: []}; //Note that spots is plural and spot is singular!!!

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return {...state, spots: action.payload};
        case GET_ONE_SPOT: 
            return {...state, spot: action.payload.spot, reviews: action.payload.reviews};
        case EDIT_SPOT:
            return {...state, spot: action.payload}
        default:
            return state;
    }
};

export default spotsReducer;