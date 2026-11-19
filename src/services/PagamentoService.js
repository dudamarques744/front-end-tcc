//Importando o axios
import axiosConfigurations from "../configurations/AxiosConfigurations.js";

//Criando as funções de comunicação
//Com o back-end (API em Express.js)
export default class PagamentoService {

    //POST - Função de cadastro do pagamento
    cadastrar(pagamento) {
        return axiosConfigurations.post("/pagamento", pagamento)
    }

    //PUT - Função para alterar/atualizar dados do pagamento
    alterar(pagamento) {
        return axiosConfigurations.put("/pagamento", pagamento)
    }

    //GET - Função para consultar 1 pagamento
    consultar(idPagamento) {
        return axiosConfigurations.get(`/pagamento/${idPagamento}`)
    }

    //GET - Função para listar os pagamentos
    listar() {
        return axiosConfigurations.get("/pagamento")
    }

    //DELETE - Função para excluir 1 pagamento
    excluir(idPagamento) {
        return axiosConfigurations.delete(`/pagamento/${idPagamento}`)
    }
}