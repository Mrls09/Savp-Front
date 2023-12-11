import '../../utils/styles/UserNavbar.css'
import { FaRegUserCircle, FaSearch } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { BsStack } from 'react-icons/bs'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import { Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from '../../modules/auth/authContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


const UserNavbar = () => {
    const { dispatch } = useContext(AuthContext);
    const navigation = useNavigate();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigation("/auth", { replace: true });
        localStorage.removeItem("user");
    };

    return (
        <div className='UserNav'>
            <Link to="/">
                <div className="UserIcon">
                    <img src={require('../../utils/img/fgIcon.png')} alt="Icon" />
                </div>
            </Link>
            <div className='UserData'>
                <BsStack className='DataIcon NavIcon' onClick={() => {
                }} style={{ height: 25, width: 25, marginBottom: 0 }} />
                <FaSearch className='DataIcon NavIcon' onClick={() => {
                }} style={{ height: 25, width: 25, marginBottom: 0 }} />
                <IoIosSettings className='DataIcon' onClick={() => {
                }} style={{ height: 50, width: 32, marginBottom: 0 }} />
                <Link to='/perfil'>
                    <FaRegUserCircle
                        className='DataIcon'
                        style={{ height: 28, width: 25, marginBottom: 0 }}
                    />
                </Link>                <Button variant='none' onClick={handleLogout}><FeatherIcon icon={'log-out'} /></Button>
            </div>
        </div>
    );
}

export default UserNavbar;
