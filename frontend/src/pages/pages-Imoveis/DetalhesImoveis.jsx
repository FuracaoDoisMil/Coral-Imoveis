import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function DetalhesImoveis(){

    const { id } = useParams()

    const [imovel, setImovel] = useState(null)
    const [funcionarios, setFuncionarios] = useState([])
    const [proprietarios, setProprietarios] = useState([])
    const [imagens, setImagens] = useState([])
    const [imagemSelecionada, setImagemSelecionada] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:5000/imoveis/${id}`)
            .then(resposta => resposta.json())

            .then(dados => {
                console.log(dados)

                setImovel(dados)
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
                setImagens(dados)
            })
            
            .catch(erro => {
                console.log("ERRO:", erro)
            })

    }, [id])

    useEffect(()=>{
        const imagemCapa = imagens.find(
            imagem =>
                imagem.id_imovel === Number(id) &&
                imagem.caminho_imagem_capa !== null
        )

        if(imagemCapa){
            setImagemSelecionada(imagemCapa)
        }
    }, [imagens, id])

    if(!imovel){
        return <h2>Carregando...</h2>
    }

    const corretor = funcionarios.find(
        funcionario => funcionario.id_funcionario === imovel.id_funcionario
    )

    const proprietario = proprietarios.find(
        proprietario => proprietario.id_proprietario === imovel.id_proprietario
    )



    const miniaturas = imagens.filter(imagem => {

    if(imagem.id_imovel !== Number(id)){
        return false
    }

    if(imagemSelecionada?.id_imagem === imagem.id_imagem){
        return false
    }

    return true

})

    return(

        <div className="detalhes-container">

            <h1 className="titulo-imovel">
                {imovel.nome_imovel}
            </h1>

        <div className="galeria">

            {imagemSelecionada && (

                <img
                    className="imagem-capa"
                    src={`http://localhost:5000/${
                        imagemSelecionada.caminho_imagem_capa ??
                        imagemSelecionada.caminho_imagem
                    }`}
                    alt="Imagem Principal"
                />

            )}

            <div className="galeria-secundaria">

                {miniaturas.map(imagem => (

                    <img
                        key={imagem.id_imagem}

                        className="imagem-secundaria"

                        src={`http://localhost:5000/${
                            imagem.caminho_imagem_capa ??
                            imagem.caminho_imagem
                        }`}

                        alt="Imagem do imóvel"

                        onClick={() => setImagemSelecionada(imagem)}
                    />

                ))}

            </div>

        </div>

            <div className="info-imovel">

                <div className="card-info">

                    <h2>Informações do Imóvel</h2>

                    <div className="atributos">

                        <div className="atributo">
                            <strong>Tipo</strong>
                            <p>{imovel.tipo}</p>
                        </div>

                        <div className="atributo">
                            <strong>Quartos</strong>
                            <p>{imovel.quartos}</p>
                        </div>

                        <div className="atributo">
                            <strong>Suítes</strong>
                            <p>{imovel.suites}</p>
                        </div>

                        <div className="atributo">
                            <strong>Garagem</strong>
                            <p>{imovel.vagas_garagem}</p>
                        </div>

                        <div className="atributo">
                            <strong>Área</strong>
                            <p>{imovel.area} m²</p>
                        </div>

                        <div className="atributo">
                            <strong>Status</strong>
                            <p>{imovel.status}</p>
                        </div>

                    </div>

                    <div className="descricao">

                        <h3>Descrição</h3>

                        <p>
                            {imovel.observacoes || "Sem descrição cadastrada"}
                        </p>

                    </div>

                </div>

                <div className="card-contato">

                    <h3>Informações Gerais</h3>

                    <p>
                        <strong>Proprietário:</strong><br/>
                        {proprietario?.nome} {proprietario?.sobrenome}
                    </p>

                    <br/>

                    <p>
                        <strong>Corretor:</strong><br/>
                        {corretor?.nome} {corretor?.sobrenome}
                    </p>

                    <br/>

                    <p>
                        <strong>Endereço:</strong><br/>
                        {imovel.endereco}, {imovel.numero}
                    </p>

                    <p>
                        {imovel.bairro}
                    </p>

                    <p>
                        {imovel.cidade} - {imovel.estado}
                    </p>

                    <br/>

                    <p>
                        <strong>Venda:</strong><br/>
                        {imovel.valor_venda
                            ? `R$ ${imovel.valor_venda}`
                            : "Não disponível"}
                    </p>

                    <br/>

                    <p>
                        <strong>Locação:</strong><br/>
                        {imovel.valor_locacao
                            ? `R$ ${imovel.valor_locacao}`
                            : "Não disponível"}
                    </p>

                    <br/>

                    <p>
                        <strong>IPTU:</strong><br/>
                        {imovel.iptu
                            ? `R$ ${imovel.iptu}`
                            : "Não informado"}
                    </p>

                </div>

            </div>

        </div>

    )

}

export default DetalhesImoveis
