// CadastrarImoveis.jsx

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CadastrarImoveis(){

    const [idProprietario, setIdProprietario] = useState("")
    const [idFuncionario, setIdFuncionario] = useState("")
    const [nomeImovel, setNomeImovel] = useState("")
    const [tipo, setTipo] = useState("")
    const [cep, setCep] = useState("")
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [valorLocacao, setValorLocacao] = useState("")
    const [valorVenda, setValorVenda] = useState("")
    const [quartos, setQuartos] = useState("")
    const [suites, setSuites] = useState("")
    const [vagasGaragem, setVagasGaragem] = useState("")
    const [area, setArea] = useState("")
    const [iptu, setIptu] = useState("")
    const [observacoes, setObservacoes] = useState("")
    const [imagem, setImagem] = useState(null)
    const navigate = useNavigate()

    async function cadastrarImovel(){

        if(
            !idProprietario ||
            !idFuncionario ||
            !nomeImovel ||
            !tipo ||
            !cep ||
            !endereco ||
            !numero ||
            !bairro ||
            !cidade ||
            !estado
        ){
            alert("Preencha os campos obrigatórios!")
            return
        }

        try{

            const resposta = await fetch(
                "http://localhost:5000/imoveis",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        id_proprietario: idProprietario,
                        id_funcionario: idFuncionario,
                        nome_imovel: nomeImovel,
                        tipo,
                        cep,
                        endereco,
                        numero,
                        complemento,
                        bairro,
                        cidade,
                        estado,
                        valor_locacao: valorLocacao,
                        valor_venda: valorVenda,
                        quartos,
                        suites,
                        vagas_garagem: vagasGaragem,
                        area,
                        iptu,
                        observacoes

                    })

                }
            )

            const dados = await resposta.json()

            console.log(dados)

            const idImovel = dados.id_imovel

            if(imagem){

                const formData = new FormData()

                formData.append("id_imovel", idImovel)

                formData.append("imagem", imagem)

                await fetch(
                    "http://localhost:5000/imagens-imovel",
                    {

                        method: "POST",

                        body: formData

                    }
                )

            }

            alert("Imóvel cadastrado com sucesso! :D")

            navigate("/imoveis/mostrar-imoveis")

        }

        catch(erro){

            console.log("ERRO:", erro)

        }

    }

    return(

        <div className="cadastro-container">

            <h1>Cadastrar Imóvel</h1>

            <div className="form-grid">

                <input
                    type="number"
                    placeholder="ID Proprietário"
                    value={idProprietario}
                    onChange={(e) => setIdProprietario(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="ID Funcionário"
                    value={idFuncionario}
                    onChange={(e) => setIdFuncionario(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Nome do Imóvel"
                    value={nomeImovel}
                    onChange={(e) => setNomeImovel(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Endereço"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor Locação"
                    value={valorLocacao}
                    onChange={(e) => setValorLocacao(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor Venda"
                    value={valorVenda}
                    onChange={(e) => setValorVenda(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Quartos"
                    value={quartos}
                    onChange={(e) => setQuartos(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Suítes"
                    value={suites}
                    onChange={(e) => setSuites(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Vagas Garagem"
                    value={vagasGaragem}
                    onChange={(e) => setVagasGaragem(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Área"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="IPTU"
                    value={iptu}
                    onChange={(e) => setIptu(e.target.value)}
                />

                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />

                <input
                    type="file"

                    onChange={(e) => {

                        setImagem(e.target.files[0])

                    }}
                />

            </div>

            <button
                className="botao-cadastrar"
                onClick={cadastrarImovel}
            >
                Cadastrar
            </button>

            <button
                className="botao-cancelar"
                onClick={() => navigate("/imoveis/mostrar-imoveis")}
            >
                Cancelar
            </button>

        </div>

    )

}

export default CadastrarImoveis
