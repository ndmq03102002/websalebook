import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { GetToken } from "./JWTToken";

const Home = () => {
    const param = useParams();
    const [books, setBooks] = useState([]);
    useEffect(() => {
        var path = `http://localhost:8080`;
        const str = param.id;
        if (str) path += `/user/search/${str}`;
        fetch(path,{
            headers:{
                'Authorization' : `Bearer ${GetToken()}`,
            }
        })
            .then((res) => res.json())
            .then((book) => {
                setBooks(book)
            });
        document.title = "Thư viện";
        // eslint-disable-next-line
    }, [useLocation().pathname])
    return (
        <div>
            <h1 className="display-1">Thư viện</h1>
            <ul className="list-item">
                {books.map((book) => (
                    <li className="btn item" key={book.id}>
                        <Link to={'/book/' + book.id}>
                            <img src={book.imgPath ? 'http://localhost:8080/images/' + book.imgPath : ""} alt="" style={{ width: 200, height: 200 }} />
                            <div className="item-info">
                                <p>Sách: {book.title}</p>
                                <p>Tác giả: {book.author}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;