import { Link } from "react-router-dom";

const PageNotFound = () => {
    document.title = "Error: 404"
    return (
        <div>
            <div className="display-4 error">404: Không tìm thấy trang web</div>
            <Link to={"/"} className="display-5">Trang chủ</Link>
        </div>
    );
}
export default PageNotFound;