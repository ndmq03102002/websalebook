import Modal from 'react-bootstrap/Modal';

const ConfirmMenu = ({ obj, setObj }) => {
    const handleClose = () => setObj({ state: false });
    return (
        <div >
            <Modal className='submenu' centered show={obj.state} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >{obj.title || ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{obj.str1 || ""}</h5>
                    <p>{obj.str2 || ""}</p>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "space-between" }}>
                    <button className='btn btn-success' style={{ width: "25%" }} onClick={handleClose}>Hủy</button>
                    <button className='btn btn-danger' style={{ width: "25%" }} onClick={() => { handleClose(); obj.act() }}>Đồng ý</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ConfirmMenu;