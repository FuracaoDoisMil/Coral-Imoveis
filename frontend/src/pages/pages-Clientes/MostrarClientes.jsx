import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MostrarClientes(){

    const [clientes, setClientes] = useState([])

    const [telefone, setTelefone] = useState([])

    const [pesquisa, setPesquisa] = useState("")

    const [filtro, setFiltro] = useState("nome")

    const navigate = useNavigate()

    useEffect(() => {

        fetch(`http://localhost:5000/clientes`)
            .then(resposta => resposta.json())

            .then(dados => {
                console.log(dados)
                setClientes(dados)
            })

            .catch(erro => console.log("ERRO:", erro))

        fetch(`http://localhost:5000/telefones`) 
            .then(resposta => resposta.json())

            .then(dados => {
                console.log(dados)
                setTelefone(dados)  
            })

            .catch(erro => console.log("ERRO:", erro))

    }, [])

    return(
        <div>
            <h1>Clientes</h1>

            <div className="filtro-container">
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>

                    <option value="id">ID</option>

                    <option value="nome">Nome</option>

                    <option value="sobrenome">Sobrenome</option>

                    <option value="sexo">Sexo</option>

                    <option value="cpf">CPF</option>

                    <option value="dt_nascimento">Data de Nascimento</option>

                    <option value="telefone">Telefone</option>

                    <option value="sem_telefone">Sem Telefone</option>

                    <option value="email">E-mail</option>

                    <option value="situacao">Situação</option>
                    
                </select>

                <input
                    type="text"
                    placeholder="Pesquisar cliente..."
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
                            <th>Data de Nascimento</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Situação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes
                            .filter(cliente => {
                                const telefoneCliente = telefone.find(
                                    tel => tel.id_cliente === cliente.id_cliente
                                )

                                if(filtro === "id"){
                                    return cliente.id_cliente
                                    ?.toString()
                                    .includes(pesquisa)
                                }
                                if(filtro === "nome"){
                                    return cliente.nome
                                    ?.toLowerCase()
                                    .includes(pesquisa.toLowerCase())
                                }
                                if(filtro === "sobrenome"){
                                    return cliente.sobrenome
                                    ?.toLowerCase()
                                    .includes(pesquisa.toLowerCase())
                                }
                                if(filtro === "sexo"){
                                    return cliente.sexo
                                    ?.toLowerCase()
                                    .includes(pesquisa.toLowerCase())
                                }
                                if(filtro === "cpf"){
                                    return cliente.CPF
                                    ?.includes(pesquisa)
                                }
                                if(filtro === "dt_nascimento"){
                                    return new Date(cliente.dt_nascimento)
                                    .toLocaleDateString("pt-BR")
                                    .includes(pesquisa)
                                }
                                if(filtro === "telefone"){
                                    return telefoneCliente?.numero
                                    ?.includes(pesquisa)
                                }
                                if(filtro === "sem_telefone"){
                                    return telefoneCliente?.numero === null
                                    ?.includes(pesquisa)
                                }
                                if(filtro === "email"){
                                    return cliente.email
                                    ?.toLowerCase()
                                    .includes(pesquisa.toLowerCase())
                                }
                                if(filtro === "situacao"){
                                    return cliente.situacao
                                    ?.toLowerCase()
                                    .includes(pesquisa.toLowerCase())
                                }
                            })
                            .map(cliente => {
                                const telefoneCliente = telefone.find(
                                    tel => tel.id_cliente === cliente.id_cliente
                                )

                                return(
                                    <tr key={cliente.id_cliente}>
                                        <td>{cliente.id_cliente}</td>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.sobrenome}</td>
                                        <td>{cliente.sexo}</td>
                                        <td>{cliente.CPF}</td>
                                        <td>{new Date(cliente.dt_nascimento).toLocaleDateString("pt-BR")}</td>
                                        <td>{cliente.email}</td>
                                        <td>{telefoneCliente ? telefoneCliente.numero : "Sem telefone"}</td>
                                        <td>{cliente.situacao}</td>
                                        <td>
                                            <button onClick={() => navigate(`/admin/clientes/atualizar-clientes/${cliente.id_cliente}`)}>
                                                Editar
                                            </button>
                                            <button onClick={() => navigate(`/admin/clientes/deletar-clientes/${cliente.id_cliente}`)}>
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

export default MostrarClientes
