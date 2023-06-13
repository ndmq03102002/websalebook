import { useState ,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { IsLogged } from "./JWTToken";

const RegisterForm = () => {
    const navigate=useNavigate();
    const [confirmPassword,setConfirmPassword]=useState("");
    const [user,setUser]=useState({});
    const onUpdate = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const register=()=>{
        if(!validate()) return;
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                if (res.ok) {
                    document.getElementById("register-success").style.display = "block";
                    return;// res.json();
                }
                else document.getElementById("register-err").style.display = "block";
            })
    }
    const validate=()=>{
        var ok = true;
        document.getElementById("register-success").style.display = "none";
        document.getElementById("register-err").style.display = "none";
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
        if (!user.name) {
            document.getElementById("name-err").style.display = "block";
            ok = false;
        }
        else document.getElementById("name-err").style.display = "none";
        if(user.password!==confirmPassword){
            document.getElementById("confirm-err").style.display = "block";
            ok = false;
        }
        else document.getElementById("confirm-err").style.display = "none";
        return ok;
    }
    useEffect(() => {
        if (IsLogged()) navigate("/");
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <form className="form log-form" >
                <h1 className="display-5">Tạo tài khoản thư viện</h1>
                <p className="err-text" id="register-err">Tài khoản đã tồn tại </p>
                <p className="success-text" id="register-success">Đăng ký tài khoản thành công! Vui lòng đăng nhập</p>
                <div className="one-line">
                    <div className="form-floating form-group">
                        <input type="text" name="surname" id="surname" className="form-control" placeholder=" " onChange={onUpdate}/>
                        <label htmlFor="surname">Họ</label>
                    </div>
                    <div className="form-floating form-group">
                        <input type="text" name="name" id="name" className="form-control" placeholder=" "  onChange={onUpdate}/>
                        <label htmlFor="name" className="requirement">Tên</label>
                        <p className="err-text" id="name-err">Tên không được để trống</p>

                    </div>
                    <div className="form-floating form-group">
                        <input type="date" name="dob" id="dob" className="form-control"  onChange={onUpdate}/>
                        <label htmlFor="dob">Ngày sinh</label>
                    </div>
                    <div className="check-box">
                        <input className="form-check-input" type="radio" name="gender" id="male" value="0" defaultChecked={true}   onChange={onUpdate} />
                        <label className=" text-light" htmlFor="male">&nbsp;Nam</label>
                    </div>
                    <div className="check-box">
                        <input className="form-check-input" type="radio" name="gender" id="female" value="1"  onChange={onUpdate}/>
                        <label className="text-light" htmlFor="female">&nbsp;Nữ</label>
                    </div>
                </div>
                <div className="form-floating form-group">
                    <input type="email" name="account" id="email" className="form-control" placeholder=" "  onChange={onUpdate} />
                    <label htmlFor="email" className="requirement">Email</label>
                    <p className="err-text" id="email-err">Email không được để trống</p>
                </div>
                <div className="form-floating form-group">
                    <input type="password" id="password" name="password" className="form-control" placeholder=" "  onChange={onUpdate}/>
                    <label htmlFor="password" className="requirement">Mật khẩu</label>
                    <p className="err-text" id="password-err">Mật khẩu không được để trống</p>
                </div>
                <div className="form-floating form-group">
                    <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" placeholder=" "  onChange={(e)=>setConfirmPassword(e.target.value)} />
                    <label htmlFor="confirmPassword" className="requirement">Xác nhận mật khẩu</label>
                    <p className="err-text" id="confirm-err">Mật khẩu không trùng với mật khẩu đã nhập</p>
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={register} >Đăng ký</button>
                <Link className="link-primary" to={"/login"}>Đăng nhập</Link>
            </form>
        </div>
    );
}

export default RegisterForm;