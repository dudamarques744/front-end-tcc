import axiosConfigurations from "../configurations/AxiosConfiguration.js"

export default class AtendimentoService {
    // GET - Listar atendimentos
    listarAtendimentos() {
        return axiosConfigurations.get("/atendimento")
    }

    // POST - Cadastrar atendimento
    cadastrar(atendimento) {
        return axiosConfigurations.post("/atendimento", atendimento)
    }

    // PUT - Alterar atendimento
    alterar(atendimento) {
        return axiosConfigurations.put("/atendimento", atendimento)
    }

    // GET - Próximo atendimento do paciente
    proximo(idPaciente) {
        return axiosConfigurations.get(`/atendimento/proximo/${idPaciente}`)
    }

    // GET - Histórico do paciente
    historico(idPaciente) {
        return axiosConfigurations.get(`/atendimento/historico/${idPaciente}`)
    }

    // DELETE
    deletar(id) {
        return axiosConfigurations.delete(`/atendimento/${id}`)
    }
}