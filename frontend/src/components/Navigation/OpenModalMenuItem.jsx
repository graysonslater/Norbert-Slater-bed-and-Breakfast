//IMPORTS
// import React from 'react'; //! React is never used ????
import { useModal } from '../../context/Modal';

//FUNCTION COMPONENT
function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  
  //HOOKS
  const { setModalContent, setOnModalClose } = useModal();

  //RENDER METHOD (html)
  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <li onClick={onClick}>{itemText}</li>
  );
}

export default OpenModalMenuItem;