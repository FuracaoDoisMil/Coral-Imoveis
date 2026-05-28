import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function AtualizarProprietarios() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [idTelefone, setIdTelefone] = useState(null)

    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [sexo, setSexo] = useState("")
    const [CPF, setCPF] = useState("")
    const [CNPJ, setCNPJ] = useState("")
    const [dt_nascimento, setDt_nascimento] = useState("")
    const [email, setEmail] = useState("")
    const [numero, setNumero] = useState("")
    const [situacao, setSituacao] = useState("")
    const [senha, setSenha] = useState("")

    function formatarData(dataStr){

        if(!dataStr) return ""

        const data = new Date(dataStr)

        return data.toISOString().split("T")[0]

    }

useEffect(() => {

    fetch(`http://localhost:5000/proprietarios/${id}`)

        .then(resposta => resposta.json())

        .then(dados => {

            setNome(dados.nome)
            setSobrenome(dados.sobrenome)
            setSexo(dados.sexo)
            setCPF(dados.CPF || "")
            setCNPJ(dados.CNPJ || "")
            setDt_nascimento(formatarData(dados.dt_nascimento))
            setEmail(dados.email)
            setSituacao(dados.situacao)


            return fetch(`http://localhost:5000/telefones/proprietarios/${id}`)

        })

        .then(resposta => {

            if(!resposta.ok){

                return null

            }

            return resposta.json()

        })

        .then(dados => {

            if(dados){

                setIdTelefone(dados.id_telefone)

                const telefoneFormatado = dados.numero
                    .replace(/^(\d{2})(\d)/g, "($1) $2")
                    .replace(/(\d{5})(\d)/, "$1-$2")

                setNumero(telefoneFormatado)

            }

        })

        .catch(erro => {

            console.error("ERRO:", erro)

        })

}, [id])

    function atualizarProprietarios(){

        if(
            !nome ||
            !sobrenome ||
            !sexo ||
            !dt_nascimento ||
            !email ||
            !numero ||
            !situacao
        ){
            if(CPF === null && CNPJ === null){
                alert("Preencha todos os campos obrigatórios!")

                return
            }
            alert("Preencha todos os campos obrigatórios!")

            return

        }

        const body = {

            nome,
            sobrenome,
            sexo,
            CPF: CPF || null,
            CNPJ: CNPJ ||null,
            dt_nascimento,
            email,
            situacao,

        }

        if(senha){

            body.senha = senha

        }

        fetch(`http://localhost:5000/proprietarios/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)

        })

        .then(resposta => resposta.json())

        .then(() => {

            if(idTelefone){

                return fetch(`http://localhost:5000/telefones/${idTelefone}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        numero: numero.replace(/\D/g, ""),

                        id_proprietario: Number(id),

                        id_funcionario: null,

                        id_cliente: null

                    })

                })

            }

        })

        .then(resposta => {

            if(resposta && resposta.ok){

                return resposta.json()

            }

        })

        .then(() => {

            alert("Proprietário atualizado com sucesso! :D")

            navigate("/proprietarios/mostrar-proprietarios")

        })

        .catch(erro => {

            console.error("ERRO ao atualizar proprietário:", erro)

        })

    }

    return(

        <div className="cadastro-container">

            <h2>Atualizar Proprietáio</h2>

            <div className="form-grid">

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
                type="text"
                placeholder="CNPJ"
                value={CNPJ}
                maxLength={18}

                    onChange={(e) => {

                        let valor = e.target.value

                        valor = valor.replace(/\D/g, "")

                        valor = valor.replace(/^(\d{2})(\d)/, "$1.$2")

                        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")

                        valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2")

                        valor = valor.replace(/(\d{4})(\d)/, "$1-$2")

                        setCNPJ(valor)

                    }}
                />



                <input
                    type="date"
                    title="Data de Nascimento"
                    value={dt_nascimento}
                    onChange={(e) => setDt_nascimento(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                <select
                    value={situacao}
                    onChange={(e) => setSituacao(e.target.value)}
                >

                    <option value="">Selecione a situação do Funcionario</option>

                    <option value="ativo">Ativo</option>

                    <option value="inativo">Inativo</option>

                </select>

                <input
                    type="password"
                    placeholder="Nova senha (ou deixe vazio)"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

            </div>

            <button
                className="botao-cadastrar"
                onClick={atualizarProprietarios}
            >
                Atualizar Proprietário
            </button>

            <button
                className="botao-cadastrar"
                onClick={() => navigate("/proprietarios/mostrar-proprietarios")}
            >
                Cancelar
            </button>

        </div>

    )

}

export default AtualizarProprietarios
