/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/


/***********************************************************************************************************************************************/
//*                             INIT/function declaration
/***********************************************************************************************************************************************/

function CustomModal ({children, onClose=()=>{return}}){


/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    return(
        <div
    onClick={onClose}    
    style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    }}
>
    <div
        onClick={(e) => e.stopPropagation()}
        style={{
            background: "white",
            maxHeight: "90vh", // Maximum height of 90% of the viewport height
            maxWidth: "90vw", // Maximum width of 90% of the viewport width
            margin: "auto",
            padding: "2%",
            border: "2px solid #000",
            borderRadius: "10px",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            zIndex: 10000,
            overflow: "auto", // Add scrollbars if content exceeds max dimensions
        }}
    >
        {children}
    </div>
</div>
    )


}

export default CustomModal