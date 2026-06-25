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
            <button onClick={logout} style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "10px",
                padding: "8px 16px",
                color: "white",
                cursor: "pointer"
            }}>
                Sair
            </button>
        </header>
    )
}

export default Navbar
