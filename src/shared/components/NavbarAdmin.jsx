import React from 'react';
import '../../utils/styles/UserNavbar.css'
import { FaRegUserCircle, FaSearch } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { BsStack } from 'react-icons/bs'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import { Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from '../../modules/auth/authContext'
import { useNavigate } from 'react-router-dom'

const NavbarAdmin = () => {
    const { dispatch } = useContext(AuthContext);
    const navigation = useNavigate();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigation("/auth", { replace: true });
        localStorage.removeItem("user");
    };

    return (
        <div className='UserNav'>
            <div className="UserIcon">
                <img src={require('../../utils/img/fgIcon.png')} alt="Icon" />
                ADMIN
            </div>
            <div className='UserData'>
                <Button variant='none' href='/producto'>Productos</Button>
                <Button variant='none' href='/plataforma'>Plataforma</Button>
                <Button variant='none' href='/item'>Item</Button>
                <Button variant='none' onClick={handleLogout}><FeatherIcon icon={'log-out'} /></Button>
                
            </div>
        </div>
    );
}

export default NavbarAdmin;
