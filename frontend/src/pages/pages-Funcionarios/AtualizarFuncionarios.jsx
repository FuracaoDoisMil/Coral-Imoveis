import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function AtualizarFuncionarios() {
    const { id } = useParams()

    const [tipo_funcionario, setTipo_funcionario] = useState("")
    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [sexo, setSexo] = useState("")
    const [CPF, setCPF] = useState("")
    const [dt_nascimento, setDt_nascimento] = useState("")
    const [email, setEmail] = useState("")
    const [salario, setSalario] = useState("")
    const [situacao, setSituacao] = useState("")
    const [CNH_numero, setCNH_numero] = useState("")
    const [CNH_categoria, setCNH_categoria] = useState("")
    const [CNH_validade, setCNH_validade] = useState("")
    const [senha, setSenha] = useState("")


    useEffect(() => {
        fetch("http://localhost:5000/funcionarios/?{id}")
            .then(resposta => resposta.json())
            .then(dados => {
                setTipo_funcionario(dados.tipo_funcionario)
                setNome(dados.nome)
                setSobrenome(dados.sobrenome)
                setSexo(dados.sexo)
                setCPF(dados.CPF)
                setDt_nascimento(dados.dt_nascimento)
                setEmail(dados.email)
                setSalario(dados.salario)
                setSituacao(dados.situacao)
                setCNH_numero(dados.CNH_numero || "")
                setCNH_categoria(dados.CNH_categoria || "")
                setCNH_validade(dados.CNH_validade || "")
                
            })
            .catch(erro => console.error("ERRO ao buscar funcionário ;-; :", erro))
    }, [id])
    function atualizarFuncionarios(){
        if(!tipo_funcionario ||
           !nome ||
           !sobrenome ||
           !sexo ||
           !CPF ||
           !dt_nascimento ||
           !email ||
           !salario ||
           !situacao
        ){
            alert("Preencha todos os campos obrigatórios! ;)")
            return
        }

        const boby = {
            tipo_funcionario,
            nome,
            sobrenome,
            sexo,
            CPF,
            dt_nascimento,
            email,
            salario,
            situacao,
            CNH_numero: CNH_numero || null,
            CNH_categoria: CNH_categoria || null,
            CNH_validade: CNH_validade || null
        }

        if(senha) body.senha = senha

        fetch("http://localhost:5000/funcionarios/?{id}", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)  
        })
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            alert("Funcionario atualizado com sucesso! :D")
            setSenha("")
        })

        .catch(erro => console.error("ERRO:", erro))
    
    }

    return(
        <div className="cadastro-container">
            <h2>Atualizar Funcionario</h2>
            <div className="form-grid">
                <select value={tipo_funcionario}
                        onChange={(e) => setTipo_funcionario(e.target.value)}
                >
                    <option value="">Selecione o Cargo do Funcionario</option>

                    <option value="Corretor">Corretor</option>

                    <option value="Secretario">Secretario</option>

                    <option value="Gerente">Gerente</option>

                </select>

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
                
                <input type="number"
                    step={"0.01"} 
                    placeholder="Salário"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                />
                
                <input type="text"
                    placeholder="Numero da CNH"
                    value={CNH_numero}
                    onChange={(e) => setCNH_numero(e.target.value)}
                />
                
                <input type="text"
                    placeholder="Categoria da CNH"
                    value={CNH_categoria}
                    onChange={(e) => setCNH_categoria(e.target.value)}
                />
                
                <input type="date"
                    placeholder="Validade da CNH"
                    value={CNH_validade}
                    onChange={(e) => setCNH_validade(e.target.value)}
                />

                <input type="password" 
                    placeholder="Nova senha (não deixe em branco!!!)"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <button className="botao-cadastrar" onClick={atualizarFuncionarios}>
                Atualizar Funcionario
            </button>
        </div>
    )
}

export default AtualizarFuncionarios
