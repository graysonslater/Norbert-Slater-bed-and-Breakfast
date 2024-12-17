/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import { createSpot } from "../../store/spots";

import { useDispatch } from "react-redux";

import {addImageBySpotId}  from "../../store/spotImage"

import "./CreateSpot.css";

/***********************************************************************************************************************************************/
//*                             INIT/State/Function declaration
/***********************************************************************************************************************************************/

function CreatSpot(){
    const dispatch = useDispatch();
    const navigate = useNavigate()

    //state for new spot
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [previewImage,setPreviewImage] = useState();
    const [errors, setErrors] = useState({});

    //state for spotImages 
    const[image1, setImage1] = useState();
    const[image2, setImage2] = useState();
    const[image3, setImage3] = useState();
    const[image4, setImage4] = useState();

/***********************************************************************************************************************************************/
//*                             FORM SUBMISSION HANDLER
/***********************************************************************************************************************************************/

const handleSubmit = async (e) => {

    //prevent auto submit
    e.preventDefault();

    setErrors({});

    // Validation logic
    let validationErrors = {};

    if (!address) {
        validationErrors.address = "Street address is required.";
    }
    if (!city) {
        validationErrors.city = "City is required.";
    }
    if (!country) {
        validationErrors.country = "country is required.";
    }
    if (!state) {
        validationErrors.state = "State is required.";
    }
    if (!description || description.length < 30) {
        validationErrors.description = "Description needs 30 or more characters.";
    }
    if (!title) {
        validationErrors.title = "Name is required.";
    }
    if (!price) {
        validationErrors.price = "Price per night is required.";
    }
    if (!previewImage) {
        validationErrors.previewImage = "Preview Image URL is required.";
    }

    // If there are validation errors, update the state and return
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }

    //dispatch new data for update
    const spot = await dispatch(createSpot({ 
        address, 
        city,
        state,
        country,
        lat, 
        lng,
        title, 
        description,
        price, 
        previewImage
    }))
    // console.log("add image pre spot check", spot.id)

    //creat urls obj
const urls = {
        image1: {
            image: image1,
            preview: 0
        },
        image2 :{
            image:image2,
            preview: 0
        },
        image3: {
            image:image3,
            preview: 0
        },
        image4: {
            image:image4,
            preview: 0
        },
        previewImage:{
            image:previewImage,
            preview: 1
        },
    }

    //add images to spotImage table and update state
    await dispatch(addImageBySpotId(spot.id,urls))
    
    //navigate to home
    navigate(`/spots/${spot.id}`)
};

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    return(
        <>
            <h2 className='CNStitle'>Create a new spot</h2>
                <h3 className='CNSsub-title'>Where is your Spot Located?</h3>
                    <p className='CNStitleP'>Guests will only get your exact address once they booked a reservation</p>
                    <form onSubmit={handleSubmit}>
                <label className="creatSpotLabel">
                    Street Address
                    <input
                        type="text"
                        placeholder="Enter your street address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                     {errors.address && <span className="error">{errors.address}</span>}
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        placeholder="city..."
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <span className="error">{errors.city}</span>}
                </label>
                <label>
                    State
                    <input
                        type="text"
                        placeholder="state..."
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    {errors.state && <span className="error">{errors.state}</span>}
                </label>
                <label>
                    Country
                    <input
                        type="text"
                        placeholder="country..."
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {errors.country && <span className="error">{errors.country}</span>}
                </label>
                <label>
                    Latitude
                    <input
                        type="number"
                        min={0}
                        placeholder="lattitude..."
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                <label>
                    Longitude
                    <input
                        type="number"
                        min={0}
                        placeholder="longitude..."
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>
            <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <label>
                    Description
                    <input
                        type="text"
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <span className="error">{errors.description}</span>}
                </label>
            <h3>Create a title for your spot</h3>
                <p>Catch guests attention with a spot title that highlights what makes your place special</p>
                <label>
                    Name
                    <input
                        type="text"
                        placeholder="Name of your spot..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {<errors className="title"></errors> && <span className="error">{errors.title}</span>}
                </label>
            <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <label>
                    Price
                    <input
                        type="number"
                        placeholder="Price per night (USD)"
                        value={price}
                        min={0}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <span className="error">{errors.price}</span>}
                </label>
            <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot</p>
                <label>
                    <input
                        type="text"
                        placeholder="PreviewImage Url"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                    />
                    {errors.previewImage && <span className="error">{errors.previewImage}</span>}
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image Url"
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image Url"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image Url"
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image Url"
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                    />
                </label>
                <button type="submit">Create Spot</button>
            </form>
        </>
    )
}

export default CreatSpot;