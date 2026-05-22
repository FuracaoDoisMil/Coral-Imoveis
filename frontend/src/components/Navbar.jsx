import {Link} from "react-router-dom"

function Navbar(){
    return(
        <header className="navbar">
            <Link to="/" className="logo">
                🪸 Coral Imóveis
            </Link>
        </header>


    )
}

export default Navbar