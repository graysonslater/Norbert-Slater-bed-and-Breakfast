/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
//Important to note useNavigate and Navigate are different functions!!!!
import { useNavigate } from 'react-router-dom'; //!NEED TO NAVIGATE BACK TO SPOT PAGE!!!!

import { editSpot } from '../../store/spots';

import { OneSpot } from '../../store/spots';

import { useParams } from "react-router-dom";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function EditSpotModal() {
    const dispatch = useDispatch();
    //grab spotId from url
    const {spotId} = useParams();
    const navigate = useNavigate();

/***********************************************************************************************************************************************/
//*                             Get Spot
/***********************************************************************************************************************************************/

    useEffect(() =>{
        dispatch(OneSpot(spotId))
    }, [dispatch,spotId]) 
    
    const { spot } = useSelector((state) => { 
        // console.log("TEST COMP" , state.spots.spot)
        return { spot: state.spots.spot}; //Reviews is plural!!!
    });

/***********************************************************************************************************************************************/
//*                             form submission
/***********************************************************************************************************************************************/

    const handleSubmit = (e) => {
        //prevent auto submit
        e.preventDefault();
        
        // dispatch(OneSpot(spotId)) //!STORE IS UPDATING STATE AT editSpotAO!!!!!!

        //dispatch new data for update
        dispatch(editSpot({
            id: spotId, 
            address, 
            city,
            state,
            country,
            lat, 
            lng,
            name, 
            description,
            price, 
            //!previewImage
        }))
        navigate(`/spots/${spotId}`)

    };

/***********************************************************************************************************************************************/
//*                             setting state
/***********************************************************************************************************************************************/

const [address, setAddress] = useState(spot.address);
const [city, setCity] = useState(spot.city);
const [state, setState] = useState(spot.state);
const [country, setCountry] = useState(spot.country);
const [lat, setLat] = useState(spot.lat);
const [lng, setLng] = useState(spot.lng);
const [name, setName] = useState(spot.name);
const [description, setDescription] = useState(spot.description);
const [price, setPrice] = useState(spot.price);
// const [previewImage, setPreviewImage] = useState(spot.previewImage); //!UNSURE HOW TO UPDATE ARRAY OF URLS

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    return(
        <>
            <h2>Update Your Spot</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <label>
                    country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Latitude
                    <input
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                <label>
                    Longitude
                    <input
                        type="text"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <button type="submit">Update your Spot</button>
            </form>
        </>
    )
}

export default EditSpotModal;