import { useState } from "react";
import { Link} from "react-router-dom";
import { ClearToken, GetRole } from "./JWTToken";

const Header = () => {
    const pathName = window.location.pathname;
    const [text, setText] = useState("");
    const getPath = () => {
        if (text) return "/search/" + text;
        return "";
    }
    const logout =()=>{
        ClearToken();
        window.location.reload();
    }
    if (pathName.includes("/admin/") ){
        if(GetRole()!=="ADMIN") return null;
        return (
            <header>
                <nav className="navbar container">
                    <div>
                        <Link to={"/admin/home"} className="btn bi bi-house-gear ">&nbsp;Trang chủ</Link>
                        <a href={"/admin/book/edit/new"} className="btn bi bi-database-add ">&nbsp;Thêm sách</a>
                    </div>
                    <abbr title="Đăng xuất"><button className="icon btn bi bi-box-arrow-right" onClick={logout}/></abbr>
                </nav>
            </header>
        );
    }
    return (
        <header >
            <nav className="navbar container">
                <abbr title="Trang chủ"><Link className="btn icon bi bi-house" to={"/"} /></abbr>
                <div className="search-bar">
                    <div className="d-flex">
                        <input onChange={(e) => setText(e.target.value)} type="search" className="form-control" placeholder="Tìm kiếm" />
                        <abbr title="Tìm kiếm">
                            <Link to={getPath()} className=" icon btn bi bi-search" />
                        </abbr>
                    </div>
                </div>
                <ul className="nav">
                    <li><abbr title="Lịch sử mua hàng"><Link to={"/history"} className="icon btn bi bi-cart3" /></abbr></li>
                    <li><abbr title="Đăng xuất"><button className="icon btn bi bi-box-arrow-right" onClick={logout}/></abbr></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;