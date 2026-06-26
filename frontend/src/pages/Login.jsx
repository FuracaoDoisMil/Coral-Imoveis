import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function fazerLogin(){
        if(!email || !senha){
            alert("Preencha email e senha!")
            return
        }

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        })
        .then(resposta => resposta.json())
        .then(dados => {
            if(dados.erro){
                alert("Email ou senha incorretos!")
                return
            }
            localStorage.setItem("funcionario", JSON.stringify(dados))
            navigate("/admin")
        })
        .catch(erro => console.log("ERRO:", erro))
    }

    return(
        <div className="login-container">
            <h1>🪸 Coral Imóveis</h1>
            <div className="login-box">
                <h2>Entrar no Sistema</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button onClick={fazerLogin}>
                    Entrar
                </button>

                <button onClick={()=> navigate(`/`)}>
                    Voltar
                </button>
            </div>
        </div>
    )
}

export default Login
