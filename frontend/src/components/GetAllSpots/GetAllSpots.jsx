//IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function GetAllSpots (){

    //INIT
    const dispatch = useDispatch();
    const {spots} = useSelector((state) => {
        // console.log("test COMPONENT",state.spots) //shows what the AO is bringing into the function!!!
        return state.spots}) //spots contains a list of all spots
    
    // console.log("Function TEST 2",spots)
    //load all spots
    useEffect(() => {
        dispatch(getSpots())
    },[dispatch])

    //HTML
    return(
        <ul className="allSpots">
            {spots.map((spot) => (
                <li key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`}>{spot.name}</NavLink>
                    <p>{spot.description}</p>
                    <p>{spot.address}, {spot.city}, {spot.state}, {spot.country}</p>
                </li>
            ))}
        </ul>    
    )      
}

export default GetAllSpots;