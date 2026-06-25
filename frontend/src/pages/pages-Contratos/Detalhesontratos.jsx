import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function DetalhesContratos() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [contrato, setContrato] = useState(null)

    const [transacao, setTransacao] = useState(null)

    const [imovel, setImovel] = useState(null)

    const [cliente, setCliente] = useState(null)

    const [corretor, setCorretor] = useState(null)

    const [proprietario, setProprietario] = useState(null)

    const [telefoneCliente, setTelefoneCliente] = useState(null)

    const [telefoneCorretor, setTelefoneCorretor] = useState(null)

    const [telefoneProprietario, setTelefoneProprietario] = useState(null)

    useEffect(() => {

        async function carregarDados() {

            try {

                const contratoResposta =
                    await fetch(`http://localhost:5000/contratos/${id}`)

                const contratoDados =
                    await contratoResposta.json()

                setContrato(contratoDados)

                let transacaoDados

                if (contratoDados.id_venda) {

                    const vendaResposta =
                        await fetch(
                            `http://localhost:5000/vendas/${contratoDados.id_venda}`
                        )

                    transacaoDados =
                        await vendaResposta.json()

                } else {

                    const locacaoResposta =
                        await fetch(
                            `http://localhost:5000/locacoes/${contratoDados.id_locacao}`
                        )

                    transacaoDados =
                        await locacaoResposta.json()

                }

                setTransacao(transacaoDados)

                const imovelResposta =
                    await fetch(
                        `http://localhost:5000/imoveis/${transacaoDados.id_imovel}`
                    )

                const imovelDados =
                    await imovelResposta.json()

                setImovel(imovelDados)

                const clienteResposta =
                    await fetch(
                        `http://localhost:5000/clientes/${transacaoDados.id_cliente}`
                    )

                const clienteDados =
                    await clienteResposta.json()

                setCliente(clienteDados)

                const corretorResposta =
                    await fetch(
                        `http://localhost:5000/funcionarios/${transacaoDados.id_funcionario}`
                    )

                const corretorDados =
                    await corretorResposta.json()

                setCorretor(corretorDados)

                const proprietarioResposta =
                    await fetch(
                        `http://localhost:5000/proprietarios/${imovelDados.id_proprietario}`
                    )

                const proprietarioDados =
                    await proprietarioResposta.json()

                setProprietario(proprietarioDados)

                const telefoneClienteResposta =
                    await fetch(
                        `http://localhost:5000/telefones/clientes/${clienteDados.id_cliente}`
                    )

                const telefoneClienteDados =
                    await telefoneClienteResposta.json()

                setTelefoneCliente(telefoneClienteDados)

                const telefoneCorretorResposta =
                    await fetch(
                        `http://localhost:5000/telefones/funcionarios/${corretorDados.id_funcionario}`
                    )

                const telefoneCorretorDados =
                    await telefoneCorretorResposta.json()

                setTelefoneCorretor(telefoneCorretorDados)

                const telefoneProprietarioResposta =
                    await fetch(
                        `http://localhost:5000/telefones/proprietarios/${proprietarioDados.id_proprietario}`
                    )

                const telefoneProprietarioDados =
                    await telefoneProprietarioResposta.json()

                setTelefoneProprietario(
                    telefoneProprietarioDados
                )

            }

            catch (erro) {

                console.log("ERRO:", erro)

            }

        }

        carregarDados()

    }, [id])

    async function aprovarContrato() {

        try {

            await fetch(
                `http://localhost:5000/contratos/${id}/aprovar`,
                { method: "PUT" }
            )

            setContrato(prev => ({ ...prev, status: "aprovado" }))

            window.print()

            navigate("/admin/contratos/mostrar-contratos")

        } catch (erro) {

            console.log("ERRO ao aprovar:", erro)

        }

    }

    async function rejeitarContrato() {

        try {

            await fetch(
                `http://localhost:5000/contratos/${id}/rejeitar`,
                { method: "PUT" }
            )

            navigate("/admin/contratos/mostrar-contratos")

        } catch (erro) {

            console.log("ERRO ao rejeitar:", erro)

        }

    }

    if (
        !contrato ||
        !transacao ||
        !imovel ||
        !cliente ||
        !corretor ||
        !proprietario
    ) {

        return <h2>Carregando...</h2>

    }

    return (

        <div className="detalhes-contrato-container">

            <h1>CONTRATO</h1>

            <h2>{contrato.tipo_contrato.toUpperCase()}</h2>

            <hr />

            <h3>Dados do Contrato</h3>

            <div className="card-dados">

                <div className="card-item">
                    <strong>ID Contrato</strong>
                    <p>{contrato.id_contrato}</p>
                </div>

                <div className="card-item">
                    <strong>Status</strong>
                    <p>{contrato.status}</p>
                </div>

                <div className="card-item">
                    <strong>Data de Criação</strong>
                    <p>
                        {new Date(
                            contrato.criado_em
                        ).toLocaleDateString()}
                    </p>
                </div>

                <div className="card-item">
                    <strong>Observações</strong>
                    <p>{contrato.observacoes || "Nenhuma"}</p>
                </div>

            </div>

            <hr />

            <h3>Cliente</h3>

            <div className="card-dados">

                <div className="card-item">
                    <strong>Nome Completo</strong>
                    <p>{cliente.nome} {cliente.sobrenome}</p>
                </div>

                <div className="card-item">
                    <strong>CPF</strong>
                    <p>{cliente.CPF}</p>
                </div>

                <div className="card-item">
                    <strong>Email</strong>
                    <p>{cliente.email}</p>
                </div>

                <div className="card-item">
                    <strong>Telefone</strong>
                    <p>{telefoneCliente?.numero}</p>
                </div>

                <div className="card-item">
                    <strong>ID Cliente</strong>
                    <p>{cliente.id_cliente}</p>
                </div>

            </div>

            <hr />

            <h3>Proprietário</h3>

            <div className="card-dados">

                <div className="card-item">
                    <strong>Nome Completo</strong>
                    <p>{proprietario.nome} {proprietario.sobrenome}</p>
                </div>

                <div className="card-item">
                    <strong>CPF</strong>
                    <p>{proprietario.CPF}</p>
                </div>

                <div className="card-item">
                    <strong>Email</strong>
                    <p>{proprietario.email}</p>
                </div>

                <div className="card-item">
                    <strong>Telefone</strong>
                    <p>{telefoneProprietario?.numero}</p>
                </div>

                <div className="card-item">
                    <strong>ID Proprietário</strong>
                    <p>{proprietario.id_proprietario}</p>
                </div>

            </div>

            <hr />

            <h3>Corretor Responsável</h3>

            <div className="card-dados">

                <div className="card-item">
                    <strong>Nome Completo</strong>
                    <p>{corretor.nome} {corretor.sobrenome}</p>
                </div>

                <div className="card-item">
                    <strong>CPF</strong>
                    <p>{corretor.CPF}</p>
                </div>

                <div className="card-item">
                    <strong>Email</strong>
                    <p>{corretor.email}</p>
                </div>

                <div className="card-item">
                    <strong>Telefone</strong>
                    <p>{telefoneCorretor?.numero}</p>
                </div>

                <div className="card-item">
                    <strong>ID Funcionário</strong>
                    <p>{corretor.id_funcionario}</p>
                </div>

            </div>

            <hr />

            <h3>Dados do Imóvel</h3>

            <div className="card-dados">

                <div className="card-item">
                    <strong>ID Imóvel</strong>
                    <p>{imovel.id_imovel}</p>
                </div>

                <div className="card-item">
                    <strong>Nome</strong>
                    <p>{imovel.nome_imovel}</p>
                </div>

                <div className="card-item">
                    <strong>Tipo</strong>
                    <p>{imovel.tipo}</p>
                </div>

                <div className="card-item">
                    <strong>CEP</strong>
                    <p>{imovel.cep}</p>
                </div>

                <div className="card-item">
                    <strong>Endereço</strong>
                    <p>{imovel.endereco}</p>
                </div>

                <div className="card-item">
                    <strong>Número</strong>
                    <p>{imovel.numero}</p>
                </div>

                <div className="card-item">
                    <strong>Complemento</strong>
                    <p>{imovel.complemento || "-"}</p>
                </div>

                <div className="card-item">
                    <strong>Bairro</strong>
                    <p>{imovel.bairro}</p>
                </div>

                <div className="card-item">
                    <strong>Cidade</strong>
                    <p>{imovel.cidade}</p>
                </div>

                <div className="card-item">
                    <strong>Estado</strong>
                    <p>{imovel.estado}</p>
                </div>

                <div className="card-item">
                    <strong>Status</strong>
                    <p>{imovel.status}</p>
                </div>

                <div className="card-item">
                    <strong>Valor Venda</strong>
                    <p>R$ {imovel.valor_venda}</p>
                </div>

                <div className="card-item">
                    <strong>Valor Locação</strong>
                    <p>R$ {imovel.valor_locacao || "-"}</p>
                </div>

                <div className="card-item">
                    <strong>Quartos</strong>
                    <p>{imovel.quartos}</p>
                </div>

                <div className="card-item">
                    <strong>Suítes</strong>
                    <p>{imovel.suites}</p>
                </div>

                <div className="card-item">
                    <strong>Garagem</strong>
                    <p>{imovel.vagas_garagem}</p>
                </div>

                <div className="card-item">
                    <strong>Área</strong>
                    <p>{imovel.area} m²</p>
                </div>

                <div className="card-item">
                    <strong>IPTU</strong>
                    <p>R$ {imovel.iptu}</p>
                </div>

                <div className="card-item">
                    <strong>Observações</strong>
                    <p>{imovel.observacoes}</p>
                </div>

            </div>

            <hr />

            <h3>Aprovação do Gerente</h3>

            <div className="assinatura-gerente">

                <hr />

                <p>
                    Assinatura do gerente
                </p>

            </div>

            <div className="acoes-detalhes">

                {contrato.status === "aguardando_aprovacao" && (
                    <>
                        <button
                            onClick={aprovarContrato}
                            
                        >
                            ✅ Aprovar e Imprimir
                        </button>

                        <button
                            onClick={rejeitarContrato}
                        >
                            ❌ Rejeitar
                        </button>
                    </>
                )}

                <button
                    onClick={() => window.print()}
                >
                    Gerar PDF
                </button>

                <button
                    onClick={() =>
                        navigate("/admin/contratos/mostrar-contratos")
                    }
                >
                    Voltar
                </button>

            </div>

        </div>

    )

}

export default DetalhesContratos
