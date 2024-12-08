/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/


import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpotsByUserId } from "../../store/spots";
import { Link,NavLink } from 'react-router-dom';

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function ManageSpots(){

    const dispatch = useDispatch();

    //get user info
    const sessionUser = useSelector((state) => {
        return state.session.user});

    //GET USERS SPOTS
    const spots = useSelector((state) => {
        return state.spots.spots}) 
        console.log("GUS TEST= ",spots.spots)
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
                    <li key={spot.id} title={spot.name}> {/* Tooltip added here */}
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
                                <button>Delete</button>
                                <button>Update</button>
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
};

export default ManageSpots;
