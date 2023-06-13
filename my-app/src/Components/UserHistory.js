import { useState, useEffect, } from "react";
import { Link} from "react-router-dom";
import ConfirmMenu from "./ConfirmMenu";
import { GetToken } from "./JWTToken";

const UserHistory = () => {
    const [orders,setOrders] = useState([]);
    const [confirmObject, setConfirmObject] = useState({state:false});
    const [refreshData, setRefreshData] = useState(false);
    const confirmDelete=(order)=>{
        setConfirmObject({
            title: "Xóa đơn đặt hàng",
            str1: "Bạn có chắc chắn xóa đơn đặt hàng?",
            state: true,
            act: () => delOrder(order.id),
        });
    }
    const delOrder= async (id)=>{
        await fetch(`http://localhost:8080/user/history/delete/${id}`, { 
            method: 'DELETE' ,
            headers:{
                'Authorization' : `Bearer ${GetToken()}`,
            }
        });
        setRefreshData(!refreshData);
    }
    useEffect(() => {
        fetch(`http://localhost:8080/user/history`,{
            headers:{
                'Authorization' : `Bearer ${GetToken()}`,
            }
        })
            .then((res) => res.json())
            .then((data) => setOrders(data)
        );
        document.title = "Lịch sử đặt hàng";
    }, [refreshData]);
    return (
        <div>
            {confirmObject.state && <ConfirmMenu obj={confirmObject} setObj={setConfirmObject}/>}
            <h1 className="display-4">Đang đặt mua</h1>
            <ul className="list-item">
                {orders.map((order) => (
                    <li className="item-history" key={order.id}>
                        <div className="btn item-icon">
                            <Link to={'/book/' + order.book.id}>
                                <img src={order.book.imgPath?'http://localhost:8080/images/' +order.book.imgPath:""} alt="" style={{ width: 150, height: 150 }} />
                            </Link>
                            <div className="d-none">Xem chi tiết</div>
                        </div>
                        <div className="item-info" style={{width:"180px",height:"225px"}}>
                            <p>Sách: {order.book.title}</p>
                            <p>Tác giả: {order.book.author}</p>
                            <p>Số lượng: {order.amount}</p>
                            <p>Ngày đặt: {order.date.split("-").reverse().join("-")}</p>
                            <button className="btn btn-secondary btn-outline-danger" onClick={()=>confirmDelete(order)}>Hủy đặt hàng</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserHistory;