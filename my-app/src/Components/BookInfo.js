import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BookNotFound from "./Admin/BookNotFound";
import { GetToken } from "./JWTToken";

const BookInfo = () => {
    const navigate = useNavigate();
    const param = useParams();
    const id = param.id;
    const [book, setBook] = useState({});
    const [userComment, setUserComment] = useState("");
    const [comments, setComments] = useState([]);
    const [refreshComment, setRefreshComment] = useState(false);
    const [bookCount, setBookCount] = useState(1);
    const [starCount, setStarCount] = useState(0);
    const [error, setError] = useState(false);
    const purchase = async () => {
        await fetch(`http://localhost:8080/user/history/new`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${GetToken()}`,
            },
            body: JSON.stringify({
                "amount": bookCount,
                "book": book,
            }),
        });
        navigate("/history");
    }
    const sendComment = async () => {
        await fetch(`http://localhost:8080/user/comment/book/new`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${GetToken()}`,
            },
            body: JSON.stringify({
                "cmt": userComment,
                "star": starCount,
                "bookId": book.id,
            }),
        });
        setRefreshComment(!refreshComment);
    }
    useEffect(() => {
        document.title = "Chi tiết";
        fetch(`http://localhost:8080/user/book/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`,
            }
        })
            .then((res) => {
                if (res.ok) return res.json();
                setError(true);
            })
            .then((data) => setBook(data)
            );
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        fetch(`http://localhost:8080/user/comment/book/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`,
            }
        })
            .then((res) => res.json())
            .then((data) => setComments(data)
            );
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [refreshComment]);
    if (error) return (<BookNotFound />);
    return (
        <div>
            <h1 className="display-5">Thông tin chi tiết sách </h1>
            <form className="form book-info">
                <div style={{ width: "100%" }}>
                    <div className="one-line">
                        <div className=" book-text ">
                            <label htmlFor="title">Tên sách </label>
                            <input readOnly type="text" id='title' className="form-control" value={book.title || ''} />
                        </div>
                        <div className=" book-text ">
                            <label htmlFor="author">Tác giả</label>
                            <input readOnly type="text" id='author' className="form-control" value={book.author || ''} />
                        </div>
                    </div>
                    <div className=" book-text " style={{ width: "100%" }}>
                        <label htmlFor="description">Mô tả</label>
                        <textarea readOnly rows={5} className="form-control" id="description" value={book.description || ''} ></textarea>
                    </div>
                    <div className="one-line">
                        <div className=" book-text ">
                            <label htmlFor="releaseDate">Phát hành</label>
                            <input readOnly type="text" id='releaseDate' className="form-control" value={book.releaseDate || ''} />
                        </div>
                        <div className=" book-text ">
                            <label htmlFor="totalPage">Số trang</label>
                            <input readOnly type="text" id='totalPage' className="form-control" value={book.totalPage || ''} />
                        </div>
                    </div>
                    <div className="one-line">
                        <div className=" book-text ">
                            <label readOnly htmlFor="category">Thể loại</label>
                            <input readOnly type="text" id='category' className="form-control" value={book.category || ''} />
                        </div>
                        <div className="book-text" style={{ margin: "auto", textAlign: "center" }}>
                            <div>Đã bán: {book.sold}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={book.imgPath ? 'http://localhost:8080/images/' + book.imgPath : ""} alt="" style={{ width: 400, height: 400 }} />
                </div>
            </form>
            <form>
                <i onClick={() => setBookCount(bookCount <= 1 ? 1 : bookCount - 1)} className="btn bi bi-dash-lg" />
                <input type="number" style={{ textAlign: 'center' }} value={bookCount} readOnly />
                <i onClick={() => setBookCount(bookCount + 1)} className="btn bi bi-plus-lg" />
                <button onClick={purchase} type="button" className="btn btn-danger bi bi-bag-plus" > Đặt mua</button>
            </form>
            <br />
            <div className="form">
                <form className="comment-box">
                    <label htmlFor="comment" className="text-light">Nhận xét</label>
                    <textarea onChange={(e) => setUserComment(e.target.value)} maxLength={1000} className="form-control" id="comment" rows={5} placeholder="Đánh giá về sách (tối đa 1000 ký tự)"></textarea>
                    <div className="d-flex">
                        {[...Array(starCount)].map((e, i) => (
                            <i key={i} onClick={() => setStarCount(starCount === i + 1 ? 0 : i + 1)} className=" bi bi-star-fill star icon" />
                        ))}
                        {[...Array(5 - starCount)].map((e, i) => (
                            <i key={i} onClick={() => setStarCount(starCount + i + 1)} className="bi bi-star star icon" />
                        ))}
                    </div>
                    <button onClick={sendComment} disabled={starCount === 0 && userComment === ""} type="button" className="btn btn-primary">Gửi</button>
                </form>
                <ul className="comments">
                    <p>Tất cả nhận xét: {comments.length}</p>
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment">
                            <p>{comment.date.split("-").reverse().join("-")}</p>
                            <div className="d-flex">
                                <b >{comment.name}&nbsp;</b>
                                {
                                    comment.star === 0 ||
                                    <span>
                                        {[...Array(comment.star)].map((e, i) => (
                                            <i key={i} className="bi bi-star-fill star" />
                                        ))}
                                        {[...Array(5 - comment.star)].map((e, i) => (
                                            <i key={i} className="bi bi-star star" />
                                        ))}
                                    </span>
                                }
                            </div>
                            <p style={{ wordWrap: "break-word" }}>{comment.cmt}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default BookInfo;