/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch} from 'react-redux';

import { useParams } from "react-router-dom";

import { deleteReview } from '../../store/reviews';

import { OneSpot } from '../../store/spots';

import { useState } from 'react';

import CustomModal from "../../context/CustomModal"

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function DeleteReview({reviewId}) {
    const dispatch = useDispatch();
    let {spotId} = useParams();
    spotId = Number(spotId)
    const [showConfirm, setShowConfirm] = useState(false)
    
/***********************************************************************************************************************************************/
//*                             form submission
/**********************************************************************************************************************************************/
    
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReview({
            reviewId: reviewId,
            spotId: spotId
        }))
        dispatch(OneSpot(spotId));
        
    };
    

    const deleteEvent = (e) => { //opens and closes modal
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
                    <div className="deleteMessage">Are you sure you want to delete this review?</div>
                    <div className='deleteButtons'>
                        <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Yes (Delete Review)</button>
                        <button type="button" onClick={deleteEvent} style={{ backgroundColor: 'grey', color: 'white' }}>No (Keep Review)</button>
                    </div>
                </CustomModal>}
            </>
        </>  
    )
}

export default DeleteReview;