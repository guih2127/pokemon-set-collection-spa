import { Link } from "react-router-dom"

const NavbarComponent = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: 'auto', fontSize: '1.8vh' }}>
                <Link to="/Logout">Logout</Link>
            </div>
        </div>
    );
};

export default NavbarComponent;