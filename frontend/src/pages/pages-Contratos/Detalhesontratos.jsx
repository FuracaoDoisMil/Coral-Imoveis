import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
//import "./DetalhesContratos.css"

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
    const [gerentes, setGerentes] = useState([])
    const [gerenteSelecionado, setGerenteSelecionado] = useState("")
    // Gerente que aprovou/rejeitou — salvo no localStorage, sem mexer no backend
    const [gerenteAprovador, setGerenteAprovador] = useState(null)
    const [carregando, setCarregando] = useState(true)

    const STORAGE_KEY = `contrato_gerente_${id}`

    useEffect(() => {
        carregarDados()
    }, [id])

    async function carregarDados() {
        setCarregando(true)
        try {
            const contratoRes = await fetch(`http://localhost:5000/contratos/${id}`)
            const contratoData = await contratoRes.json()
            setContrato(contratoData)

            let transacaoData
            if (contratoData.id_venda) {
                const res = await fetch(`http://localhost:5000/vendas/${contratoData.id_venda}`)
                transacaoData = await res.json()
            } else {
                const res = await fetch(`http://localhost:5000/locacoes/${contratoData.id_locacao}`)
                transacaoData = await res.json()
            }
            setTransacao(transacaoData)

            const [imovelRes, clienteRes, corretorRes] = await Promise.all([
                fetch(`http://localhost:5000/imoveis/${transacaoData.id_imovel}`),
                fetch(`http://localhost:5000/clientes/${transacaoData.id_cliente}`),
                fetch(`http://localhost:5000/funcionarios/${transacaoData.id_funcionario}`)
            ])

            const imovelData = await imovelRes.json()
            const clienteData = await clienteRes.json()
            const corretorData = await corretorRes.json()
            setImovel(imovelData)
            setCliente(clienteData)
            setCorretor(corretorData)

            const proprietarioRes = await fetch(
                `http://localhost:5000/proprietarios/${imovelData.id_proprietario}`
            )
            const proprietarioData = await proprietarioRes.json()
            setProprietario(proprietarioData)

            const [telCli, telCor, telProp] = await Promise.all([
                fetch(`http://localhost:5000/telefones/clientes/${clienteData.id_cliente}`),
                fetch(`http://localhost:5000/telefones/funcionarios/${corretorData.id_funcionario}`),
                fetch(`http://localhost:5000/telefones/proprietarios/${proprietarioData.id_proprietario}`)
            ])
            setTelefoneCliente(await telCli.json())
            setTelefoneCorretor(await telCor.json())
            setTelefoneProprietario(await telProp.json())

            // Busca TODOS os funcionários e filtra gerentes no frontend
            // → sem precisar de nenhum parâmetro novo no backend
            const funcRes = await fetch(`http://localhost:5000/funcionarios`)
            const funcData = await funcRes.json()
            const apenasGerentes = funcData.filter(
                f => f.tipo_funcionario === "Gerente" && f.situacao === "ativo"
            )
            setGerentes(apenasGerentes)

            // Recupera do localStorage o gerente que aprovou/rejeitou este contrato
            const gerenteSalvo = localStorage.getItem(STORAGE_KEY)
            if (gerenteSalvo) {
                setGerenteAprovador(JSON.parse(gerenteSalvo))
            }

        } catch (erro) {
            console.error(erro)
        } finally {
            setCarregando(false)
        }
    }

    async function aprovarContrato() {
        if (!gerenteSelecionado) {
            alert("Selecione um gerente antes de aprovar.")
            return
        }

        await fetch(`http://localhost:5000/contratos/${id}/aprovar`, {
            method: "PUT"
        })

        // Salva o gerente escolhido no localStorage
        const gerente = gerentes.find(g => g.id_funcionario === Number(gerenteSelecionado))
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gerente))
        setGerenteAprovador(gerente)

        await carregarDados()
    }

    async function rejeitarContrato() {
        if (!gerenteSelecionado) {
            alert("Selecione um gerente antes de rejeitar.")
            return
        }

        await fetch(`http://localhost:5000/contratos/${id}/rejeitar`, {
            method: "PUT"
        })

        // Salva o gerente escolhido no localStorage
        const gerente = gerentes.find(g => g.id_funcionario === Number(gerenteSelecionado))
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gerente))
        setGerenteAprovador(gerente)

        await carregarDados()
    }

    function formatarData(data) {
        if (!data) return "—"
        return new Date(data).toLocaleDateString("pt-BR")
    }

    function formatarMoeda(valor) {
        if (!valor) return "—"
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    }

    function dataAtual() {
        return new Date().toLocaleDateString("pt-BR", {
            day: "2-digit", month: "long", year: "numeric"
        })
    }

    if (carregando) {
        return (
            <div className="contrato-carregando">
                <p>Carregando contrato...</p>
            </div>
        )
    }

    if (!contrato || !imovel || !cliente || !corretor || !proprietario) {
        return (
            <div className="contrato-carregando">
                <p>Erro ao carregar dados do contrato.</p>
            </div>
        )
    }

    const titulo = contrato.tipo_contrato === "venda"
        ? "CONTRATO DE COMPRA E VENDA DE IMÓVEL"
        : "CONTRATO DE LOCAÇÃO DE IMÓVEL"

    const aprovado = contrato.status === "aprovado"
    const rejeitado = contrato.status === "rejeitado"
    const aguardando = contrato.status === "aguardando_aprovacao"

    return (
        <div className="contrato-pagina">

            {/* ── Barra de ações (não imprime) ─────────────── */}
            <div className="contrato-acoes no-print">

                <button
                    className="btn-voltar-contrato"
                    onClick={() => navigate("/admin/contratos/mostrar-contratos")}
                >
                    ← Voltar
                </button>

                {aguardando && (
                    <div className="contrato-aprovacao-bar">

                        <select
                            value={gerenteSelecionado}
                            onChange={e => setGerenteSelecionado(e.target.value)}
                            className="select-gerente"
                        >
                            <option value="">Selecionar gerente responsável...</option>
                            {gerentes.map(g => (
                                <option key={g.id_funcionario} value={g.id_funcionario}>
                                    {g.nome} {g.sobrenome}
                                </option>
                            ))}
                        </select>

                        <button className="btn-aprovar" onClick={aprovarContrato}>
                            ✓ Aprovar
                        </button>

                        <button className="btn-rejeitar" onClick={rejeitarContrato}>
                            ✗ Rejeitar
                        </button>

                    </div>
                )}

                {aprovado && (
                    <button
                        className="btn-imprimir"
                        onClick={() => window.print()}
                    >
                        🖨 Imprimir / Salvar PDF
                    </button>
                )}

            </div>

            {/* ── PAPEL DO CONTRATO ─────────────────────────── */}
            <div className="contrato-papel">

                {/* Cabeçalho */}
                <div className="contrato-cabecalho">
                    <div className="contrato-logo-area">
                        <span className="contrato-logo-nome">Coral Imoveis</span>
                        <span className="contrato-logo-sub">Imobiliária</span>
                    </div>
                    <div className="contrato-cabecalho-info">
                        <p>Nº {String(contrato.id_contrato).padStart(6, "0")}</p>
                        <p>{dataAtual()}</p>
                    </div>
                </div>

                <div className="contrato-linha-topo" />

                <h1 className="contrato-titulo">{titulo}</h1>

                {/* Status badge */}
                <div className={`contrato-status-badge status-${contrato.status}`}>
                    {aguardando && "⏳ Aguardando aprovação"}
                    {aprovado && "✓ Aprovado"}
                    {rejeitado && "✗ Rejeitado"}
                </div>

                {/* ── Seção 1: Partes ── */}
                <section className="contrato-secao">
                    <h2 className="contrato-secao-titulo">
                        <span className="contrato-num">1.</span> Das Partes
                    </h2>

                    <div className="contrato-partes-grid">

                        {/* Proprietário */}
                        <div className="contrato-parte-card">
                            <p className="parte-label">PROPRIETÁRIO(A)</p>
                            <p className="parte-nome">
                                {proprietario.nome} {proprietario.sobrenome}
                            </p>
                            <div className="parte-dados">
                                {proprietario.CPF && (
                                    <p><span>CPF:</span> {proprietario.CPF}</p>
                                )}
                                {proprietario.CNPJ && (
                                    <p><span>CNPJ:</span> {proprietario.CNPJ}</p>
                                )}
                                {proprietario.email && (
                                    <p><span>E-mail:</span> {proprietario.email}</p>
                                )}
                                <p>
                                    <span>Telefone:</span>{" "}
                                    {telefoneProprietario?.numero || "—"}
                                </p>
                            </div>
                        </div>

                        {/* Cliente */}
                        <div className="contrato-parte-card">
                            <p className="parte-label">
                                {contrato.tipo_contrato === "venda" ? "COMPRADOR(A)" : "LOCATÁRIO(A)"}
                            </p>
                            <p className="parte-nome">
                                {cliente.nome} {cliente.sobrenome}
                            </p>
                            <div className="parte-dados">
                                <p><span>CPF:</span> {cliente.CPF}</p>
                                <p><span>E-mail:</span> {cliente.email}</p>
                                <p>
                                    <span>Telefone:</span>{" "}
                                    {telefoneCliente?.numero || "—"}
                                </p>
                            </div>
                        </div>

                        {/* Corretor */}
                        <div className="contrato-parte-card">
                            <p className="parte-label">CORRETOR(A) RESPONSÁVEL</p>
                            <p className="parte-nome">
                                {corretor.nome} {corretor.sobrenome}
                            </p>
                            <div className="parte-dados">
                                <p><span>CPF:</span> {corretor.CPF}</p>
                                <p><span>E-mail:</span> {corretor.email}</p>
                                <p>
                                    <span>Telefone:</span>{" "}
                                    {telefoneCorretor?.numero || "—"}
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                <div className="contrato-divisor" />

                {/* ── Seção 2: Imóvel ── */}
                <section className="contrato-secao">
                    <h2 className="contrato-secao-titulo">
                        <span className="contrato-num">2.</span> Do Imóvel
                    </h2>

                    <p className="contrato-texto-intro">
                        O imóvel objeto deste contrato está identificado e descrito
                        conforme os dados abaixo:
                    </p>

                    <div className="contrato-imovel-grid">
                        <div className="imovel-campo">
                            <span className="imovel-label">Denominação</span>
                            <span className="imovel-valor">{imovel.nome_imovel}</span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">Tipo</span>
                            <span className="imovel-valor">{imovel.tipo}</span>
                        </div>
                        <div className="imovel-campo imovel-campo-largo">
                            <span className="imovel-label">Endereço</span>
                            <span className="imovel-valor">
                                {imovel.endereco}, nº {imovel.numero}
                                {imovel.complemento ? `, ${imovel.complemento}` : ""}
                            </span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">Bairro</span>
                            <span className="imovel-valor">{imovel.bairro}</span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">Cidade / UF</span>
                            <span className="imovel-valor">{imovel.cidade} — {imovel.estado}</span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">CEP</span>
                            <span className="imovel-valor">{imovel.cep}</span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">Área total</span>
                            <span className="imovel-valor">
                                {imovel.area ? `${imovel.area} m²` : "—"}
                            </span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">Quartos</span>
                            <span className="imovel-valor">{imovel.quartos ?? "—"}</span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">Suítes</span>
                            <span className="imovel-valor">{imovel.suites ?? "—"}</span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">Vagas de garagem</span>
                            <span className="imovel-valor">{imovel.vagas_garagem ?? "—"}</span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">IPTU anual</span>
                            <span className="imovel-valor">{formatarMoeda(imovel.iptu)}</span>
                        </div>
                        <div className="imovel-campo">
                            <span className="imovel-label">Situação</span>
                            <span className="imovel-valor">{imovel.status}</span>
                        </div>
                        {imovel.observacoes && (
                            <div className="imovel-campo imovel-campo-largo">
                                <span className="imovel-label">Observações</span>
                                <span className="imovel-valor">{imovel.observacoes}</span>
                            </div>
                        )}
                    </div>
                </section>

                <div className="contrato-divisor" />

                {/* ── Seção 3: Condições financeiras ── */}
                <section className="contrato-secao">
                    <h2 className="contrato-secao-titulo">
                        <span className="contrato-num">3.</span> Das Condições Financeiras
                    </h2>

                    <div className="contrato-financeiro">
                        {contrato.tipo_contrato === "venda" ? (
                            <>
                                <div className="financeiro-item">
                                    <span>Valor de venda</span>
                                    <strong>{formatarMoeda(transacao?.valor_venda)}</strong>
                                </div>
                                <div className="financeiro-item">
                                    <span>Forma de pagamento</span>
                                    <strong>{transacao?.forma_pagamento || "—"}</strong>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="financeiro-item">
                                    <span>Valor mensal do aluguel</span>
                                    <strong>{formatarMoeda(transacao?.valor_aluguel)}</strong>
                                </div>
                                <div className="financeiro-item">
                                    <span>Forma de pagamento</span>
                                    <strong>{transacao?.forma_pagamento || "—"}</strong>
                                </div>
                                <div className="financeiro-item">
                                    <span>Início da locação</span>
                                    <strong>{formatarData(transacao?.data_entrada)}</strong>
                                </div>
                                <div className="financeiro-item">
                                    <span>Término da locação</span>
                                    <strong>{formatarData(transacao?.data_saida)}</strong>
                                </div>
                            </>
                        )}
                    </div>

                    {contrato.observacoes && (
                        <div className="contrato-obs">
                            <p className="obs-label">Observações do contrato:</p>
                            <p>{contrato.observacoes}</p>
                        </div>
                    )}
                </section>

                <div className="contrato-divisor" />

                {/* ── Seção 4: Assinaturas ── */}
                <section className="contrato-secao contrato-assinaturas">
                    <h2 className="contrato-secao-titulo">
                        <span className="contrato-num">4.</span> Das Assinaturas
                    </h2>

                    <p className="contrato-texto-intro">
                        As partes, tendo lido e concordado com todas as cláusulas
                        deste instrumento, assinam o presente contrato.
                    </p>

                    <div className="assinaturas-grid">

                        <div className="assinatura-bloco">
                            <div className="assinatura-linha" />
                            <p className="assinatura-nome">
                                {proprietario.nome} {proprietario.sobrenome}
                            </p>
                            <p className="assinatura-papel">Proprietário(a)</p>
                        </div>

                        <div className="assinatura-bloco">
                            <div className="assinatura-linha" />
                            <p className="assinatura-nome">
                                {cliente.nome} {cliente.sobrenome}
                            </p>
                            <p className="assinatura-papel">
                                {contrato.tipo_contrato === "venda" ? "Comprador(a)" : "Locatário(a)"}
                            </p>
                        </div>

                        <div className="assinatura-bloco">
                            <div className="assinatura-linha" />
                            <p className="assinatura-nome">
                                {corretor.nome} {corretor.sobrenome}
                            </p>
                            <p className="assinatura-papel">Corretor(a) responsável</p>
                        </div>

                    </div>
                </section>

                <div className="contrato-divisor" />

                {/* ── Rodapé de aprovação ── */}
                <section className="contrato-secao contrato-aprovacao-final">

                    {aguardando && (
                        <div className="aprovacao-pendente">
                            <p>Este contrato aguarda aprovação do gerente responsável.</p>
                        </div>
                    )}

                    {(aprovado || rejeitado) && (
                        <div className={`aprovacao-resultado aprovacao-${contrato.status}`}>

                            <p className="aprovacao-titulo-resultado">
                                {aprovado ? "✓ CONTRATO APROVADO" : "✗ CONTRATO REJEITADO"}
                            </p>

                            <p className="aprovacao-gerente-nome">
                                {aprovado ? "Aprovado" : "Rejeitado"} pelo gerente:{" "}
                                <strong>
                                    {gerenteAprovador
                                        ? `${gerenteAprovador.nome} ${gerenteAprovador.sobrenome}`
                                        : "—"}
                                </strong>
                            </p>

                            <p className="aprovacao-data">Data: {dataAtual()}</p>

                            {aprovado && (
                                <div className="aprovacao-assinatura-gerente">
                                    <div className="assinatura-linha assinatura-gerente-linha" />
                                    <p className="assinatura-nome">
                                        {gerenteAprovador
                                            ? `${gerenteAprovador.nome} ${gerenteAprovador.sobrenome}`
                                            : "Gerente responsável"}
                                    </p>
                                    <p className="assinatura-papel">Gerente — ImobSystem</p>
                                </div>
                            )}

                        </div>
                    )}

                </section>

                {/* Rodapé do papel */}
                <div className="contrato-rodape">
                    <p>ImobSystem Imobiliária — Dois Vizinhos, PR</p>
                    <p>Documento nº {String(contrato.id_contrato).padStart(6, "0")} · Gerado em {dataAtual()}</p>
                </div>

            </div>
        </div>
    )
}

export default DetalhesContratos
