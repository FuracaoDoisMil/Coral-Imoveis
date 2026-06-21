import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MostrarFuncionarios(){

    const [funcionarios, setFuncionarios] = useState([])

    const [telefone, setTelefone] = useState([])

    const [pesquisa, setPesquisa] = useState("")

    const [filtro, setFiltro] = useState("nome")

    const navigate = useNavigate()

    useEffect(() => {

        fetch(`http://localhost:5000/funcionarios`)

            .then(resposta => resposta.json())

            .then(dados => {
                console.log(dados)
                setFuncionarios(dados)
            })

            .catch(erro => {
                console.log("ERRO:", erro)
            })

        fetch(`http://localhost:5000/telefones`)

            .then(resposta => resposta.json())

            .then(dados => {
                console.log(dados)
                setTelefone(dados)
            })

            .catch(erro => {
                console.log("ERRO:", erro)
            })

    }, [])

    return(

        <div>

            <h1>Funcionários</h1>

            <div className="filtro-container">

                <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                >

                    <option value="id">ID</option>

                    <option value="tipo_funcionario">Cargo</option>

                    <option value="nome">Nome</option>

                    <option value="sobrenome">Sobrenome</option>

                    <option value="sexo">Sexo</option>

                    <option value="cpf">CPF</option>

                    <option value="dt_nascimento">Data de Nascimento</option>

                    <option value="telefone">Telefone</option>

                    <option value="sem_telefone">Sem Telefone</option>

                    <option value="email">E-mail</option>

                    <option value="salario">Salário</option>

                    <option value="situacao">Situação</option>

                    <option value="cnh_numero">Número da CNH</option>

                    <option value="cnh_categoria">Categoria da CNH</option>

                    <option value="cnh_validade">Validade da CNH</option>

                    <option value="com_cnh">Possui CNH</option>

                    <option value="sem_cnh">Não possui CNH</option>

                </select>

                <input
                    type="text"
                    placeholder="Pesquisar funcionário..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />

            </div>

            <div className="tabela-container">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Cargo</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Sexo</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Salário</th>
                            <th>Situação</th>
                            <th>Número da CNH</th>
                            <th>Categoria da CNH</th>
                            <th>Validade da CNH</th>
                            <th>Ações</th>

                        </tr>

                    </thead>

                    <tbody>

                        {funcionarios

                            .filter(funcionario => {

                                const telefoneFuncionario = telefone.find(
                                    tel => tel.id_funcionario === funcionario.id_funcionario
                                )

                                if(filtro === "id"){

                                    return funcionario.id_funcionario
                                        ?.toString()
                                        .includes(pesquisa)

                                }
                                

                                if(filtro === "tipo_funcionario"){
                                    return funcionario.tipo_funcionario
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())
                                }
                                
                                if(filtro === "nome"){

                                    return funcionario.nome
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())

                                }

                                if(filtro === "sobrenome"){

                                    return funcionario.sobrenome
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())

                                }

                                if(filtro === "sexo"){

                                    return funcionario.sexo
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())

                                }

                                if(filtro === "cpf"){

                                    return funcionario.CPF
                                        ?.includes(pesquisa)

                                }

                                if(filtro === "dt_nascimento"){

                                    return new Date(funcionario.dt_nascimento)
                                        .toLocaleDateString("pt-BR")
                                        .includes(pesquisa)

                                }

                                if(filtro === "telefone"){

                                    return telefoneFuncionario?.numero
                                        ?.includes(pesquisa)

                                }

                                if(filtro === "sem_telefone"){
                                    return telefoneFuncionario?.numero === null
                                        ?.includes(pesquisa)
                                }


                                if(filtro === "email"){

                                    return funcionario.email
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())

                                }

                                if(filtro === "salario"){

                                    return funcionario.salario
                                        ?.toString()
                                        .includes(pesquisa)

                                }

                                if(filtro === "situacao"){

                                    return funcionario.situacao
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())

                                }

                                if(filtro === "cnh_numero"){

                                    return funcionario.CNH_numero
                                        ?.toString()
                                        .includes(pesquisa)

                                }

                                if(filtro === "cnh_categoria"){

                                    return funcionario.CNH_categoria
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())

                                }

                                if(filtro === "cnh_validade"){

                                    return funcionario.CNH_validade
                                        ? new Date(funcionario.CNH_validade)
                                            .toLocaleDateString("pt-BR")
                                            .includes(pesquisa)
                                        : false

                                }

                                if(filtro === "com_cnh"){

                                    return funcionario.CNH_numero !== null

                                }

                                if(filtro === "sem_cnh"){

                                    return funcionario.CNH_numero === null

                                }

                            })

                            .map(funcionario => {

                                const telefoneFuncionario = telefone.find(
                                    tel => tel.id_funcionario === funcionario.id_funcionario
                                )

                                return(

                                    <tr key={funcionario.id_funcionario}>

                                        <td>{funcionario.id_funcionario}</td>

                                        <td>{funcionario.tipo_funcionario}</td>

                                        <td>{funcionario.nome}</td>

                                        <td>{funcionario.sobrenome}</td>

                                        <td>{funcionario.sexo}</td>

                                        <td>{funcionario.CPF}</td>

                                        <td>
                                            {new Date(funcionario.dt_nascimento).toLocaleDateString("pt-BR")}
                                        </td>

                                        <td>{funcionario.email}</td>

                                        <td>
                                            {telefoneFuncionario
                                                ? telefoneFuncionario.numero
                                                : "Sem telefone"}
                                        </td>

                                        <td>{funcionario.salario}</td>

                                        <td>{funcionario.situacao}</td>

                                        <td>
                                            {funcionario.CNH_numero
                                                ? funcionario.CNH_numero
                                                : "Sem CNH"}
                                        </td>

                                        <td>
                                            {funcionario.CNH_categoria
                                                ? funcionario.CNH_categoria
                                                : "Sem CNH"}
                                        </td>

                                        <td>
                                            {funcionario.CNH_validade
                                                ? new Date(funcionario.CNH_validade).toLocaleDateString("pt-BR")
                                                : "Sem CNH"}
                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/funcionarios/atualizar-funcionarios/${funcionario.id_funcionario}`)
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/funcionarios/deletar-funcionarios/${funcionario.id_funcionario}`)
                                                }
                                            >
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

export default MostrarFuncionarios
