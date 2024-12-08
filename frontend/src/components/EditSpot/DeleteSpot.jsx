/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector} from 'react-redux';

import { getSpotsByUserId, deleteSpot } from "../../store/spots";

import { useState } from 'react';

import CustomModal from "../../context/CustomModal"

import "./DeleteSpot.css" 

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function DeleteSpot({spotId}) {
    
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false)

    //get user info
    const sessionUser = useSelector((state) => {
        return state.session.user});

/***********************************************************************************************************************************************/
//*                             form submission
/**********************************************************************************************************************************************/
    console.log("DS TEST= ", spotId)
const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId,sessionUser.id))
    dispatch(getSpotsByUserId(sessionUser.id));
    };

    const deleteEvent = (e) => {
        e.preventDefault();
        setShowConfirm(!showConfirm)

    }

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
return (
    <>
        <button type="button" onClick={deleteEvent}>Delete</button>
            <>{showConfirm && 
                <CustomModal onClose={deleteEvent}>
                    <div className='deleteTitle'>Confirm Delete</div>
                    <div className="deleteMessage">Are you sure you want to remove this spot?</div>
                    <div className='deleteButtons'>
                        <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Yes (Delete Review)</button>
                        <button type="button" onClick={deleteEvent} style={{ backgroundColor: 'grey', color: 'white' }}>No (Keep Review)</button>
                    </div>
                </CustomModal>}
            </>
        </>  
    )
}

export default DeleteSpot;