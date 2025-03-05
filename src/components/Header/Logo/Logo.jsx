import { Link } from 'react-router-dom';
import { LOGO_URL } from '../../../utils/constants';
import './Logo.css';

export default function Logo() {
    return (
        <div className="logo-container">
            <Link to="/">
                <img className='logo' src={LOGO_URL} />
            </Link>
        </div>
    )
}