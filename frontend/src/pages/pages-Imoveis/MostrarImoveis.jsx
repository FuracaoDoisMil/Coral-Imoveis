import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MostrarImoveis(){

    const [funcionarios, setFuncionarios] = useState([])

    const [proprietarios, setProprietarios] = useState([])

    const [imoveis, setImoveis] = useState([])

    const [imagem_capa, setImagem_Capa] = useState([])

    const [pesquisa, setPesquisa] = useState("")

    const [filtro, setFiltro] = useState("nome")

    const navigate = useNavigate()

    useEffect(() => {

        fetch("http://localhost:5000/imoveis")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setImoveis(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })



        fetch("http://localhost:5000/funcionarios")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setFuncionarios(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })



        fetch("http://localhost:5000/proprietarios")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setProprietarios(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

        fetch("http://localhost:5000/imagens-imovel")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setImagem_Capa(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [])



    return(

        <div>

            <h1>Imóveis</h1>



            <div className="filtro-container">

                <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                >

                    <option value="id">ID</option>

                    <option value="nome">Nome</option>

                    <option value="tipo">Tipo</option>

                    <option value="cidade">Cidade</option>

                    <option value="bairro">Bairro</option>

                    <option value="status">Status</option>

                    <option value="proprietario">Proprietário</option>

                    <option value="funcionario">Funcionário</option>

                </select>



                <input
                    type="text"
                    placeholder="Pesquisar imóvel..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />

            </div>



            <div className="cards-imoveis">

                {imoveis

                    .filter(imovel => {

                        const funcionarioImovel = funcionarios.find(
                            funcionario => funcionario.id_funcionario === imovel.id_funcionario
                        )

                        const proprietarioImovel = proprietarios.find(
                            proprietario => proprietario.id_proprietario === imovel.id_proprietario
                        )



                        if(filtro === "id"){

                            return imovel.id_imovel
                                ?.toString()
                                .includes(pesquisa)

                        }



                        if(filtro === "nome"){

                            return imovel.nome_imovel
                                ?.toLowerCase()
                                .includes(pesquisa.toLowerCase())

                        }



                        if(filtro === "tipo"){

                            return imovel.tipo
                                ?.toLowerCase()
                                .includes(pesquisa.toLowerCase())

                        }



                        if(filtro === "cidade"){

                            return imovel.cidade
                                ?.toLowerCase()
                                .includes(pesquisa.toLowerCase())

                        }



                        if(filtro === "bairro"){

                            return imovel.bairro
                                ?.toLowerCase()
                                .includes(pesquisa.toLowerCase())

                        }



                        if(filtro === "status"){

                            return imovel.status
                                ?.toLowerCase()
                                .includes(pesquisa.toLowerCase())

                        }



                        if(filtro === "proprietario"){

                            return proprietarioImovel?.nome
                                ?.toLowerCase()
                                .includes(pesquisa.toLowerCase())

                        }



                        if(filtro === "funcionario"){

                            return funcionarioImovel?.nome
                                ?.toLowerCase()
                                .includes(pesquisa.toLowerCase())

                        }

                    })

                    .map(imovel => {

                        const funcionarioImovel = funcionarios.find(
                            funcionario => funcionario.id_funcionario === imovel.id_funcionario
                        )

                        const proprietarioImovel = proprietarios.find(
                            proprietario => proprietario.id_proprietario === imovel.id_proprietario
                        )

                        const imagemCapaImovel = imagem_capa.find(
                            imagemCapa => imagemCapa.id_imovel === imovel.id_imovel &&
                            imagemCapa.caminho_imagem_capa !== null
                        )

                        return(

                            <div
                                className="card-imovel"
                                key={imovel.id_imovel}
                            >

                                {imagemCapaImovel && (

                                    <img
                                        className="imagem-imovel"
                                        src={`http://localhost:5000/${imagemCapaImovel.caminho_imagem_capa}`}
                                        alt="Imagem do imóvel"
                                    />

                                )}



                                <h2>
                                    {imovel.nome_imovel}
                                </h2>



                                <p>

                                    <strong>
                                        ID:
                                    </strong>

                                    {" "}

                                    {imovel.id_imovel}

                                </p>



                                <p>

                                    <strong>
                                        Tipo:
                                    </strong>

                                    {" "}

                                    {imovel.tipo}

                                </p>



                                <p>

                                    <strong>
                                        Proprietário:
                                    </strong>

                                    {" "}

                                    {proprietarioImovel?.nome}

                                    {" "}

                                    {proprietarioImovel?.sobrenome}

                                </p>



                                <p>

                                    <strong>
                                        Corretor:
                                    </strong>

                                    {" "}

                                    {funcionarioImovel?.nome}

                                    {" "}

                                    {funcionarioImovel?.sobrenome}

                                </p>



                                <p>

                                    <strong>
                                        Cidade:
                                    </strong>

                                    {" "}

                                    {imovel.cidade}

                                </p>



                                <p>

                                    <strong>
                                        Bairro:
                                    </strong>

                                    {" "}

                                    {imovel.bairro}

                                </p>



                                <p>

                                    <strong>
                                        Status:
                                    </strong>

                                    {" "}

                                    {imovel.status}

                                </p>



                                <p>

                                    <strong>
                                        Valor venda:
                                    </strong>

                                    {" "}

                                    {imovel.valor_venda
                                        ? `R$ ${imovel.valor_venda}`
                                        : "Não possui"}

                                </p>



                                <p>

                                    <strong>
                                        Valor locação:
                                    </strong>

                                    {" "}

                                    {imovel.valor_locacao
                                        ? `R$ ${imovel.valor_locacao}`
                                        : "Não possui"}

                                </p>



                                <div className="acoes-imovel">
                                    

                                    <button onClick={() => navigate(`/admin/imoveis/detalhes-imoveis/${imovel.id_imovel}`)}>
                                        
                                        Mostrar Mais

                                    </button>

                                </div>

                            </div>

                        )

                    })}

            </div>

        </div>

    )

}

export default MostrarImoveis
