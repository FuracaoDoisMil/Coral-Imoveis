import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CadastrarFuncionarios(){

    const[tipo_funcionario, setTipo_funcionario] = useState("")
    const[nome, setNome] = useState("")
    const[sobrenome, setSobrenome] = useState("")
    const[sexo, setSexo] = useState("")
    const[CPF, setCPF] = useState("")
    const[dt_nascimento, setDt_nascimento] = useState("")
    const[email, setEmail] = useState("")
    const[numero, setNumero] = useState("")
    const[salario, setSalario] = useState("")
    const[CNH_numero, setCNH_numero] = useState("")
    const[CNH_categoria, setCNH_categoria] = useState("")
    const[CNH_validade, setCNH_validade] = useState("")
    const[senha, setSenha] = useState("")

    const navigate = useNavigate()

    function cadastrarfuncionarios(){
        console.log({
        tipo_funcionario,
        nome,
        sobrenome,
        sexo,
        CPF,
        dt_nascimento,
        email,
        salario,
        senha
        })

        if(
            !tipo_funcionario ||
            !nome ||
            !sobrenome ||
            !sexo ||
            !CPF ||
            !dt_nascimento ||
            !email ||
            !salario ||
            !senha
        ){

            alert("Preencha todos os campos obrigatórios!")

            return
        }

        fetch("http://localhost:5000/funcionarios", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                tipo_funcionario,
                nome,
                sobrenome,
                sexo,
                CPF,
                dt_nascimento,
                email,
                salario,
                CNH_numero: CNH_numero || null,
                CNH_categoria: CNH_categoria || null,
                CNH_validade: CNH_validade || null,
                senha
            })

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log("Funcionário criado:", dados)

            const idFuncionario = dados.id_funcionario

            if(numero){

                return fetch("http://localhost:5000/telefones", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        numero: numero.replace(/\D/g, ""),
                        id_funcionario: idFuncionario
                    })

                })

            }

        })

        .then(resposta => {

            if(resposta){
                return resposta.json()
            }

        })

        .then(dados => {

            console.log("Telefone cadastrado:", dados)

            alert("Funcionário cadastrado com sucesso! :D")

            setTipo_funcionario("")
            setNome("")
            setSobrenome("")
            setSexo("")
            setCPF("")
            setDt_nascimento("")
            setEmail("")
            setNumero("")
            setSenha("")
            setSalario("")
            setCNH_numero("")
            setCNH_categoria("")
            setCNH_validade("")

        })

        .catch(erro => {

            console.error("ERRO ao cadastrar funcionário:", erro)

        })

    }

    return(

        <div className="cadastro-container">

            <h2>Cadastrar funcionario</h2>

            <div className="form-grid">

                <select
                    value={tipo_funcionario}
                    onChange={(e) => setTipo_funcionario(e.target.value)}
                >

                    <option value="">Selecione o Cargo do Funcionario</option>

                    <option value="Corretor">Corretor</option>

                    <option value="Secretario">Secretario</option>

                    <option value="Gerente">Gerente</option>

                </select>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Sobrenome"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                />

                <select
                    value={sexo}
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

                <input
                    type="date"
                    title="Data de Nascimento"
                    value={dt_nascimento}
                    onChange={(e) => setDt_nascimento(e.target.value)}
                    onBlur={(e) => setDt_nascimento(e.target.value)}
                />

                <input
                    type="email"
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

                <input
                    type="number"
                    step={"0.01"}
                    placeholder="Salário"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Numero da CNH"
                    value={CNH_numero}
                    onChange={(e) => setCNH_numero(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Categoria da CNH"
                    value={CNH_categoria}
                    onChange={(e) => setCNH_categoria(e.target.value)}
                />

                <input
                    type="date"
                    title="Validade da CNH"
                    value={CNH_validade}
                    onChange={(e) => setCNH_validade(e.target.value)}
                    onBlur={(e) => setCNH_validade(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

            </div>

            <td>
                {(tipo === "Gerente") && (
                    <>
                        <button
                            className="botao-cadastrar"
                            onClick={cadastrarfuncionarios}
                        >
                            Cadastrar
                        </button>   
                    </>
                )}

            </td>



            <button
                className="botao-cadastrar"
                onClick={() => navigate("/admin/funcionarios")}
            >
                Cancelar
            </button>

        </div>

    )

}

export default CadastrarFuncionarios
