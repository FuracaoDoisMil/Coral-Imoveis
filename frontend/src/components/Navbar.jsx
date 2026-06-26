import { Link, useNavigate } from "react-router-dom"

function Navbar(){
    const navigate = useNavigate()

    function logout(){
        localStorage.removeItem("funcionario")
        navigate("/login")
    }

    return(
        <header className="navbar">
            <Link to="/admin" className="logo">
                🪸 Coral Imóveis
            </Link>
            
            <button onClick={logout} className="btn-sair">
                Sair
            </button>
        </header>
    )
}

export default Navbar
