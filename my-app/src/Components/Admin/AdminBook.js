import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmMenu from "../ConfirmMenu";
import BookNotFound from "./BookNotFound";
import { GetToken } from "../JWTToken";

const AdminBook = () => {
    const navigate = useNavigate();
    const param = useParams();
    const id = param.id;
    const [book, setBook] = useState({});
    const [previewImage, setPreviewImage] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [formDisabled, setFormDisabled] = useState(true);
    const [adminOption, setAdminOption] = useState("Edit");
    const [confirmWindow, setConfirmWindow] = useState({ state: false });
    const [errorMessage, setErrorMessage] = useState();
    const [error, setError] = useState(false);
    const category = ["Khoa học","Văn học", "Tâm lý", "Viễn tưởng", "Light novel", "Manga"];
    const onUpdate = (e) => setBook({ ...book, [e.target.name]: e.target.value });
    const onAddClick = () => {
        if (!validate()) return;
        setConfirmWindow({
            title: "Thêm sách",
            str1: "Bạn có muốn thêm sách vào csdl?",
            state: true,
            act: onAdd,
        });
    };
    const onSaveClick = () => {
        if (!validate()) return;
        setConfirmWindow({
            title: "Sửa sách",
            str1: "Bạn có muốn thay đổi dữ liệu của sách?",
            state: true,
            act: onSave,
        });
    };
    const validate = () => {
        document.getElementById("error-message").style.display = "none";
        var ok = true;
        if (!book.title) {
            document.getElementById("title-err").style.display = "block";
            ok = false;
        }
        else document.getElementById("title-err").style.display = "none";
        if (!book.author) {
            document.getElementById("author-err").style.display = "block";
            ok = false;
        }
        else document.getElementById("author-err").style.display = "none";
        if (!book.releaseDate) {
            document.getElementById("releaseDate-err").style.display = "block";
            ok = false;
        }
        else document.getElementById("releaseDate-err").style.display = "none";
        return ok;
    };
    const onSave = async () => {
        var res = await fetch(`http://localhost:8080/admin/book/save`, {
            method: 'POST',
            body: getBookData(),
            headers: {
                'Authorization': `Bearer ${GetToken()}`,
            }
        })
        checkValidateOnServer(res);
    };
    const onAdd = async () => {
        var res = await fetch(`http://localhost:8080/admin/book/new`, {
            method: 'PUT',
            body: getBookData(),
            headers: {
                'Authorization': `Bearer ${GetToken()}`,
            }
        });
        checkValidateOnServer(res);
    };
    const getBookData = () => {
        var bookData = new FormData();
        bookData.set('data', JSON.stringify(book));
        if (selectedFile)
            bookData.append('image', selectedFile);
        return bookData;
    }
    const checkValidateOnServer = async (res) => {
        if (res.ok) navigate("/admin/home");
        else {
            var data = await res.json();
            setErrorMessage(data);
            document.getElementById("error-message").style.display = "block";
        }
    };
    useEffect(() => {
        document.title = "Edit";
        if (id === "new") {
            setFormDisabled(false);
            setAdminOption("Add");
            return;
        }
        fetch(`http://localhost:8080/admin/book/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`,
            }
        })
            .then((response) => {
                if (response.ok) return response.json();
                else setError(true);
            })
            .then((data) => {
                setBook(data);
            });
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (!selectedFile) return;
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewImage(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);
    if (error) return (<BookNotFound homePagePath="/admin/home" />);
    return (
        <div>
            {confirmWindow.state && <ConfirmMenu obj={confirmWindow} setObj={setConfirmWindow} />}
            <h1 className="display-5">Sách</h1>
            <p id="error-message" className="error display-6">{errorMessage}</p>
            <form className="form book-info">
                <div style={{ width: "100%" }}>
                    <div className="one-line">
                        <div className=" book-text ">
                            <label className="requirement" htmlFor="title">Tiêu đề</label>
                            <input required 
                            disabled={formDisabled} type="text" id='title' name="title" className="form-control " onChange={onUpdate} defaultValue={book.title} />
                            <p className="err-text" id="title-err">Tiêu đề không được để trống</p>
                        </div>
                        <div className=" book-text ">
                            <label className="requirement" htmlFor="author">Tác giả</label>
                            <input required disabled={formDisabled} type="text" id='author' name="author" className="form-control" onChange={onUpdate} defaultValue={book.author} />
                            <p className="err-text" id="author-err">Tác giả không được để trống</p>
                        </div>
                    </div>
                    <div className=" book-text " style={{ width: "100%" }}>
                        <label htmlFor="description">Mô tả về sách</label>
                        <textarea disabled={formDisabled} className="form-control" rows={4} name="description" id="description" onChange={onUpdate} defaultValue={book.description} />
                    </div>
                    <div className="one-line">
                        <div className=" book-text ">
                            <label className="requirement" htmlFor="releaseDate">Ngày phát hành</label>
                            <input required disabled={formDisabled} type="date" id='releaseDate' name="releaseDate" className="form-control" onChange={onUpdate} defaultValue={book.releaseDate} />
                            <p className="err-text" id="releaseDate-err">Ngày phát hành phải nhập đúng</p>
                        </div>
                        <div className=" book-text ">
                            <label htmlFor="totalPage">Số trang</label>
                            <input disabled={formDisabled} type="number" id='totalPage' name="totalPage" className="form-control" onChange={onUpdate} defaultValue={book.totalPage === 0 ? null : book.totalPage} />
                        </div>
                    </div>
                    <div className=" book-text ">
                        <label htmlFor="category">Thể loại</label>
                        <select name="category" id='category' value={book.category || ""} onChange={onUpdate} disabled={formDisabled} className="form-select" >
                            <option value={null}></option>
                            {category.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="btn btn-danger" htmlFor="formFile">Upload</label>
                    <input disabled={formDisabled} accept=".png,.jpeg,.jpg,.jpe" type="file" id="formFile" style={{ display: "none" }} onChange={(e) => setSelectedFile(e.target.files[0])} />
                    <div>
                        <img src={previewImage || (book.imgPath ? 'http://localhost:8080/images/' + book.imgPath : null)} alt="" style={{ width: 400, height: 400 }} />
                    </div>
                </div>
            </form>
            <div className="footer">
                <br />
                {adminOption === "Edit" && <button className="btn btn-info" onClick={() => { setAdminOption("Save"); setFormDisabled(false) }}>{adminOption}</button>}
                {adminOption === "Save" && <button className="btn btn-primary" onClick={onSaveClick}>{adminOption}</button>}
                {adminOption === "Add" && <button className="btn btn-primary" onClick={onAddClick}>{adminOption}</button>}
            </div>
        </div>
    );
}

export default AdminBook;