import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetRole, IsLogged, SetToken } from "./JWTToken";

const LoginForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const onUpdate = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const login = () => {
        if (!validate()) return;
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                if (res.ok) return res.json();
                document.getElementById("login-err").style.display = "block";
            })
            .then(data => {
                if (!data) return;
                console.log(data)
                SetToken(data);
                navigate((data.role==="ADMIN"?"/admin/home":"/"), { replace: true });
                window.location.reload();
            });
    }
    const validate = () => {
        var ok = true;
        document.getElementById("login-err").style.display = "none";
        if (!user.account) {
            document.getElementById("email-err").style.display = "block";
            ok = false;
        }
        else document.getElementById("email-err").style.display = "none";
        if (!user.password) {
            document.getElementById("password-err").style.display = "block";
            ok = false;
        }
        else document.getElementById("password-err").style.display = "none";
        return ok;
    }
    useEffect(() => {
        if (IsLogged()) window.location.href=(GetRole()==="ADMIN"?"/admin/home":"/");
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <form className="form log-form">
                <h1 className="display-4">Đăng nhập thư viện</h1>
                <p className="err-text" id="login-err">Tài khoản hoặc mật khẩu không chính xác</p>
                <br />
                <div className="form-floating form-group">
                    <input onChange={onUpdate} required type="text" name="account" id="email" className="form-control needs-validation" placeholder=" " />
                    <label htmlFor="email">Email</label>
                    <p className="err-text" id="email-err">Email không được để trống</p>
                </div>
                <div className="form-floating form-group">
                    <input onChange={onUpdate} type="password" name="password" id="password" className="form-control" placeholder=" " />
                    <label htmlFor="password">Mật khẩu</label>
                    <p className="err-text" id="password-err">Mật khẩu không được để trống</p>
                </div>
                <button onClick={login} type="button" className="btn btn-primary w-100">Đăng nhập</button>
                <Link className="link-primary" to={"/register"}>Đăng ký</Link>
            </form>
        </div>
    );
}

export default LoginForm;