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
const getOneSpot = (spot) => { //Note that spot is singular!!!
    return {
        type: GET_ONE_SPOT,
        payload: spot//review removed
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
    const spotData = await spotResponse.json();
    
    dispatch(getOneSpot(spotData));//the order is very important! it determines how the args are passed to the Action object!!!
    return spotData;
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

//Create new spot
export const createSpot = (spot) => async (dispatch) => {
    const {address, city, state, country, lat,lng, title, description, price} = spot; //! PReviewImage removed!!!!
    const response = await csrfFetch( '/api/spots', {
        method: "POST",
        body: JSON.stringify({
            address, 
            city,
            state,
            country,
            lat, 
            lng,
            title, 
            description,
            price 
        })
    });
    const newSpot = await response.json();

     //get all the spots
     const spotResponse = await csrfFetch("/api/spots", {
        method: "GET"
    });
    const spots = await spotResponse.json();
    dispatch(getAllSpotsAO(spots.Spots));

    return newSpot;
}

//Get spots by userId
export const getSpotsByUserId = (userId) => async (dispatch) => {
    const usersSpots = await csrfFetch(`/api/users/${userId}/spots`, {
        method: "GET"
    })
    const returnedSpots = await usersSpots.json();
    // console.log("MUS STORE = ", returnedSpots)
    dispatch(getAllSpotsAO(returnedSpots))
    return returnedSpots;
};

//Delete spot
export const deleteSpot = (spotId,userId) => async (dispatch) => { 
    //send delete request to back end
    const deleteReq = await csrfFetch((`/api/spots/${spotId}`), {
        method: "DELETE",
    })

    dispatch(getSpotsByUserId(userId));
    const deleteRes = await deleteReq.json();
    return deleteRes;
}
/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {spots: [], spot: []}; //Note that spots is plural and spot is singular!!!

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: //also used for find spot by userID!!!!
            return {...state, spots: action.payload};
        case GET_ONE_SPOT: 
            return {...state, spot: action.payload};
        case EDIT_SPOT:
            return {...state, spot: action.payload};
        default:
            return state;
    }
};

export default spotsReducer;