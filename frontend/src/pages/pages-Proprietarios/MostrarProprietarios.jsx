import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MostrarProprietarios(){

    const [proprietarios, setProprietarios] = useState([])

    const [telefone, setTelefone] = useState([])

    const [pesquisa, setPesquisa] = useState("")

    const [filtro, setFiltro] = useState("nome")

    const navigate = useNavigate()

    useEffect(() => {

        fetch(`http://localhost:5000/proprietarios`)

            .then(resposta => resposta.json())

            .then(dados => {
                console.log(dados)
                setProprietarios(dados)
            })

            .catch(erro => {
                console.log("ERRO:", erro)
            })

    }, [])

    useEffect(()=>{
        fetch(`http://localhost:5000/telefones`)

        .then(resposta => resposta.json())

        .then(dados =>{
            console.log(dados)
            setTelefone(dados)
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })
    },[])

    return(

        <div>

            <h1>Proprietarios</h1>

            <div className="filtro-container">

                <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                >

                    <option value="id">ID</option>

                    <option value="nome">Nome</option>

                    <option value="sobrenome">Sobrenome</option>

                    <option value="sexo">Sexo</option>

                    <option value="cpf">CPF</option>

                    <option value="cnpj">CNPJ</option>

                    <option value="dt_nascimento">Data de Nascimento</option>

                    <option value="telefone">Telefone</option>
                    <option value="sem_telefone">Sem Telefone</option>

                    <option value="email">E-mail</option>

                    <option value="situacao">Situação</option>

                </select>

                <input
                    type="text"
                    placeholder="Pesquisar proprietario..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />

            </div>

            <div className="tabela-container">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Sexo</th>
                            <th>CPF</th>
                            <th>CNPJ</th>
                            <th>Data de Nascimento</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Situação</th>
                            <th>Ações</th>

                        </tr>

                    </thead>

                    <tbody>
                        {proprietarios
                            .filter(proprietarios => {
                                const telefoneProprietario = telefone.find(
                                    tel => tel.id_proprietario === proprietarios.id_proprietario
                                ) 

                                if(filtro === "id"){
                                    return proprietarios.id_proprietario?.toString().includes(pesquisa)
                                }
                                if(filtro === "nome"){
                                    return proprietarios.nome?.toLowerCase().includes(pesquisa.toLowerCase())
                                }
                                if(filtro === "sobrenome"){
                                    return proprietarios.sobrenome?.toLowerCase().includes(pesquisa.toLowerCase())
                                }
                                if(filtro === "sexo"){
                                    return proprietarios.sexo?.toLowerCase().includes(pesquisa.toLowerCase())
                                }
                                if(filtro === "cpf"){
                                    return proprietarios.CPF?.includes(pesquisa)
                                }
                                if(filtro === "cnpj"){
                                    return proprietarios.CNPJ?.includes(pesquisa)
                                }
                                if(filtro === "dt_nascimento"){
                                    return new Date(proprietarios.dt_nascimento).toLocaleDateString("pt-BR").includes(pesquisa)
                                }
                                if(filtro === "telefone"){
                                    return telefoneProprietario?.numero
                                        ?.includes(pesquisa)
                                }
                                if(filtro === "sem_telefone"){
                                    return telefoneProprietario?.numero === null
                                        ?.includes(pesquisa)
                                }
                                if(filtro === "email"){
                                    return proprietarios.email?.toLowerCase().includes(pesquisa.toLowerCase())
                                }
                                if(filtro === "situacao"){
                                    return proprietarios.situacao?.toLowerCase().includes(pesquisa.toLowerCase())
                                }
                            })
                            .map(proprietarios => {
                                
                                const telefoneProprietario = telefone.find(
                                    tel => tel.id_proprietario === proprietarios.id_proprietario
                                )                       

                                return(
                                    <tr key={proprietarios.id_proprietario}>
                                    <td>{proprietarios.id_proprietario}</td>
                                    <td>{proprietarios.nome}</td>
                                    <td>{proprietarios.sobrenome}</td>
                                    <td>{proprietarios.sexo}</td>
                                    <td>{proprietarios.CPF
                                        ? proprietarios.CPF : "Não possui CPF"}
                                    </td>
                                    <td>{proprietarios.CNPJ
                                        ? proprietarios.CNPJ : "Não possui CNPJ"}
                                    </td>
                                    <td>{new Date(proprietarios.dt_nascimento).toLocaleDateString("pt-BR")}</td>
                                    <td>{proprietarios.email}</td>
                                    <td>{telefoneProprietario
                                            ? telefoneProprietario.numero
                                            : "Sem telefone"}
                                    </td>
                                    <td>{proprietarios.situacao}</td>
                                    <td>
                                        <button onClick={() => navigate(`/proprietarios/atualizar-proprietarios/${proprietarios.id_proprietario}`)}>
                                            Editar
                                        </button>
                                        <button onClick={() => navigate(`/proprietarios/deletar-proprietarios/${proprietarios.id_proprietario}`)}>
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                                )


                            })}
                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default MostrarProprietarios
