import { Link } from "react-router-dom";

const BookNotFound = ({homePagePath}) => {
    document.title = "Error: 404";
    return (
        <div>
            <div className="display-4 error">404: Không tìm thấy sách</div>
            <br />
            <p>Sách đã bị xóa hoặc không tồn tại</p>
            <Link to={homePagePath || "/"} className="display-5 link-opacity-100-hover">Trang chủ</Link>
        </div>
    );
}

export default BookNotFound;