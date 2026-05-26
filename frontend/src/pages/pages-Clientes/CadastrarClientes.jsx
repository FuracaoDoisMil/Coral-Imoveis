import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function CadastrarClientes(){
    const[nome, setNome] = useState ("")
    const[sobrenome, setSobrenome] = useState ("")
    const[sexo, setSexo] = useState ("")
    const[CPF, setCPF] = useState("")
    const[dt_nascimento, setDt_nascimento] = useState("")
    const[email, setEmail] = useState("")
    const[numero, setNumero] = useState("")
    const[senha, setSenha] = useState("")

    const navigate = useNavigate()


    function cadastrarclientes(){

        if(
            !nome ||
            !sobrenome ||
            !sexo ||
            !CPF ||
            !dt_nascimento ||
            !email ||
            !senha
        ){

            alert("Preencha todos os campos obrigatórios!")

            return
        }

        fetch(`http://localhost:5000/clientes`, {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({
            nome,
            sobrenome,
            sexo,
            CPF,
            dt_nascimento,
            email,
            numero:numero || null,
            senha
        })

        })
        .then(resposta => resposta.json())
        .then(dados => {console.log(dados)
            alert("Cliente cadastrado com sucesso! :D")
            setNome("")
            setSobrenome("")
            setSexo("")
            setCPF("")
            setDt_nascimento("")
            setEmail("")
            setNumero("")
            setSenha("")
        })
        .catch(erro =>{console.error("ERRO ao cadastrar cliente:", erro)})
    }

    return(
        <div className="cadastro-container">
            <h2>Cadastrar cliente</h2>
            <div className="form-grid">

                <input type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) =>setNome(e.target.value)}
                />

                <input type="text"
                    placeholder="Sobrenome"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                />
                
                <select value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                >
                    <option value="">Selecione o Sexo</option>
                    
                    <option value="M">Masculino</option>

                    <option value="F">Feminino</option>
                </select>
                
                <input
                    type="text"
                    placeholder="CPF"
                    value={CPF}
                    maxLength={14}

                    onChange={(e) => {

                        let valor = e.target.value

                        valor = valor.replace(/\D/g, "")

                        valor = valor.replace(/(\d{3})(\d)/, "$1.$2")

                        valor = valor.replace(/(\d{3})(\d)/, "$1.$2")

                        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

                        setCPF(valor)
                    }}
                />
                
                <input type="date"
                    placeholder="Data de Nascimento"
                    value={dt_nascimento}
                    onChange={(e) => setDt_nascimento(e.target.value)}
                />
                
                <input type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Numero de Telefone"
                    value={numero}
                    maxLength={15}

                    onChange={(e) => {

                        let valor = e.target.value

                        valor = valor.replace(/\D/g, "")

                        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")

                        valor = valor.replace(/(\d{5})(\d)/, "$1-$2")

                        setNumero(valor)
                    }}
                />

                <input type="password" 
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
            <button className="botao-cadastrar" onClick = {cadastrarclientes}>
                Cadastrar
            </button>
            
            <button className="btn-cancelar" onClick={() => navigate("/clientes")}>
                Cancelar
            </button>
        </div>
    )
}

export default CadastrarClientes
