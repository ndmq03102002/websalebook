import React from 'react';
import { Navigate} from 'react-router-dom';
import {GetRole, IsLogged } from './JWTToken';

export const AdminComponent = ({Component}) => {
    return GetRole()==="ADMIN" ? <Component /> : null;
};
export const PrivateComponent = ({Component}) => {
    return IsLogged() ? <Component /> : null;
};
const PrivateRoute = ({Component}) => {
    return IsLogged() ? <Component /> : <Navigate to="/login" />
};

export default PrivateRoute;