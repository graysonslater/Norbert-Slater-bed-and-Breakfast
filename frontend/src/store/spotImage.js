/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { csrfFetch } from './csrf';


/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const GET_ALL_IMAGES = "spotIamges/GetAllSpotImages";

const getImagesBySpotAO = (images) => {
    return{
        type: GET_ALL_IMAGES,
        payload: images
    }
}

/***********************************************************************************************************************************************/
//*                            THUNKS
/***********************************************************************************************************************************************/

//get images by spot id
export const getImagesBySpot = (spotId) => async (dispatch) => {
    const spotResponse = await csrfFetch((`/api/spots/spotImages/${spotId}`), {
        method: "GET"
    });

    const response = await spotResponse.json();
    dispatch(getImagesBySpotAO(response));

    return response;
};

//add images by spot id - used in create spot
export const addImageBySpotId = (spotId,urls) => async (dispatch) => {
    
       Object.entries(urls).forEach(async ([key, value]) => {
            //if image url exists
            if(value.image){
                //post image to spotImage table
                console.log("ADD IMAGE THUNK = ",value.image)
                await csrfFetch((`/api/spots/${spotId}/images`), {
                    method: "POST",
                    body: JSON.stringify({
                        url:value.image,
                        preview: value.preview
                    })
                })
            }
       });
    dispatch(getImagesBySpot(spotId))
    
}

/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {images:[]}; //Note that spots is plural and spot is singular!!!

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_IMAGES:
            return {...state, images: action.payload};
        default:
            return state;
    }
};

export default imageReducer;