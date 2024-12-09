//IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import './GetAllSpots.Css'

function GetAllSpots (){

    //INIT
    const dispatch = useDispatch();
    const {spots} = useSelector((state) => {
        // console.log("test COMPONENT",state.spots) //shows what the AO is bringing into the function!!!
        return state.spots}) //spots contains a list of all spots
    

    //load all spots
    useEffect(() => {
        dispatch(getSpots())
    },[dispatch])

    //HTML
    return(
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
                <p>{spot.city}, {spot.state}, {spot.country}</p>
            </Link>
        </li>
    ))}
</ul>
    )      
}

export default GetAllSpots;