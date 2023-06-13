import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import BookInfo from './Components/BookInfo';
import PageNotFound from './Components/PageNotFound';
import UserHistory from './Components/UserHistory';
import AdminHome from './Components/Admin/AdminHome';
import AdminBook from './Components/Admin/AdminBook';
import PrivateRoute, { PrivateComponent } from './Components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PrivateComponent Component={Header}/>
        <Routes>
          <Route path='/admin/home' element={<AdminHome />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={<PrivateRoute Component={Home} />} />
          <Route path='*' element={<PrivateRoute Component={PageNotFound} />} />
          <Route path='/search/:id' element={<PrivateRoute Component={Home} />} />
          <Route path='/book/:id' element={<PrivateRoute Component={BookInfo} />} />
          <Route path='/history' element={<PrivateRoute Component={UserHistory} />} />
          <Route path='/admin/book/edit/:id' element={<PrivateRoute Component={AdminBook} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
