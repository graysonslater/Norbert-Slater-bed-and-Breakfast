/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/
/* eslint-disable */

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpotsByUserId } from "../../store/spots";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import DeleteSpot from '../EditSpot/DeleteSpot'

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function ManageSpots(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //get user info
    const sessionUser = useSelector((state) => {
        return state.session.user});

    //GET USERS SPOTS
    const spots = useSelector((state) => {
        return state.spots.spots}) 
        // console.log("GUS TEST= ",spots.spots)
    //load all USERS spots
    useEffect(() => {
        dispatch(getSpotsByUserId(sessionUser.id))
    },[dispatch])

/***********************************************************************************************************************************************/
//*                             USER has spots conditional
/***********************************************************************************************************************************************/

    let userViewMod;
    if (spots.length > 0){
        userViewMod =(
            <ul className="allSpots">
                {spots.map((spot) => (
                    <li key={spot.id} title={spot.name}> 
                        <Link to={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img className="SingleSpotImage" src={spot.previewImage} alt="Preview Image" />
                            <p>
                                {spot.name}
                                <img src="/favicon-16x16.png" alt="Star Rating" />
                                : {spot.avgRating !== null ? (
                                    Number(spot.avgRating).toFixed(1)
                                ) : (
                                    "New"
                                )}
                            </p>
                            <p>{spot.address}, {spot.city}, {spot.state}, {spot.country}</p>
                            <p>${spot.price} night</p>
                            <div className="MUSButtons">
                                <DeleteSpot spotId={spot.id}/>
                                <button onClick={(e) => {
                                    e.preventDefault(); 
                                    e.stopPropagation(); 
                                    navigate(`/spots/edit/${spot.id}`);
                                }}>Update</button>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    } else {
        userViewMod= (
            <NavLink to="/spots/new"><button>Create a New Spot</button></NavLink>
        )
    }

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    return(
        <>
            <h1>Manage Spots</h1>
            <>
                {userViewMod}
            </>
        </>
    )
}

export default ManageSpots;
