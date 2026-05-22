import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeletarFuncionarios() {

    const { id } = useParams();

    const [funcionario, setFuncionario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [deletando, setDeletando] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        fetch(`http://localhost:5000/funcionarios/${id}`)
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error("Funcionário não encontrado.");
                }
                return resposta.json();
            })

            .then(dados => {
                setFuncionario(dados);
                setLoading(false);
            })

            .catch(erro => {
                console.log("ERRO:", erro);
                setErro("Não foi possível carregar os dados do funcionário.");
                setLoading(false);
            });

    }, [id]);

    function handleDeletar() {

        setDeletando(true);

        fetch(`http://localhost:5000/funcionarios/${id}`, {
            method: "DELETE"
        })

            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error("Erro ao deletar funcionário.");
                }
                return resposta.json();
            })

            .then(() => {
                alert("Funcionário deletado com sucesso!");
                navigate("/funcionarios");
            })

            .catch(erro => {
                console.log("ERRO:", erro);
                alert("Erro ao deletar funcionário. Tente novamente.");
                setDeletando(false);
            });

    }

    function handleCancelar() {
        navigate("/funcionarios");
    }

    if (loading) {
        return <p>Carregando dados do funcionário...</p>;
    }

    if (erro) {
        return (
            <div>
                <p>{erro}</p>
                <button onClick={handleCancelar}>Voltar</button>
            </div>
        );
    }

    return (

        <div>

            <h1>Deletar Funcionário</h1>

            <p>Tem certeza que deseja deletar o funcionário abaixo? Essa ação não pode ser desfeita.</p>

            {funcionario && (

                <div>

                    <table>

                        <tbody>

                            <tr>
                                <th>ID</th>
                                <td>{funcionario.id_funcionario}</td>
                            </tr>

                            <tr>
                                <th>Nome</th>
                                <td>{funcionario.nome}</td>
                            </tr>

                            <tr>
                                <th>Sobrenome</th>
                                <td>{funcionario.sobrenome}</td>
                            </tr>

                            <tr>
                                <th>Sexo</th>
                                <td>{funcionario.sexo}</td>
                            </tr>

                            <tr>
                                <th>CPF</th>
                                <td>{funcionario.CPF}</td>
                            </tr>

                            <tr>
                                <th>Data de Nascimento</th>
                                <td>
                                    {new Date(funcionario.dt_nascimento).toLocaleDateString("pt-BR")}
                                </td>
                            </tr>

                            <tr>
                                <th>E-mail</th>
                                <td>{funcionario.email}</td>
                            </tr>

                            <tr>
                                <th>Salário</th>
                                <td>{funcionario.salario}</td>
                            </tr>

                            <tr>
                                <th>Situação</th>
                                <td>{funcionario.situacao}</td>
                            </tr>

                            <tr>
                                <th>Número da CNH</th>
                                <td>
                                    {funcionario.CNH_numero
                                        ? funcionario.CNH_numero
                                        : "Sem CNH"}
                                </td>
                            </tr>

                            <tr>
                                <th>Categoria da CNH</th>
                                <td>
                                    {funcionario.CNH_categoria
                                        ? funcionario.CNH_categoria
                                        : "Sem CNH"}
                                </td>
                            </tr>

                            <tr>
                                <th>Validade da CNH</th>
                                <td>
                                    {funcionario.CNH_validade
                                        ? new Date(funcionario.CNH_validade).toLocaleDateString("pt-BR")
                                        : "Sem CNH"}
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            )}

            <div>

                <button onClick={handleDeletar} disabled={deletando}>
                    
                    {deletando ? "Deletando..." : "Confirmar Exclusão"}

                </button>

                <button onClick={handleCancelar} disabled={deletando}>

                    Cancelar

                </button>

            </div>

        </div>

    );

}

export default DeletarFuncionarios;
