import Modal from "./Modal";
const OrderModal = ({onClose}) =>{
    return(
        <>
            <Modal  onClose={onClose} >
                <h1>Order Successful</h1>
            </Modal>
        </>
    )
}

export default OrderModal;