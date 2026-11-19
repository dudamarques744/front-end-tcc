<template>
  <div class="dashboard-container">
    <div v-if="erroMensagem" class="erro-banner">
      {{ erroMensagem }}
    </div>

    <div class="bem-vindo">
      <h2>Bem-vindo(a), {{ nomePaciente }}!</h2>
      <p>Aqui está um resumo da sua saúde mental.</p>
    </div>

    <div class="cards-grid">
      <div class="card proxima-consulta">
        <h3>Próxima Consulta</h3>
        <div v-if="proximaConsulta">
          <p><strong>Data:</strong> {{ formatarData(proximaConsulta.dataHorarioAtendimento ?? proximaConsulta.data) }}</p>
          <p><strong>Hora:</strong> {{ formatarHora(proximaConsulta) }}</p>
          <p><strong>Profissional:</strong> {{ proximaConsulta.profissional?.nomeProfissional ?? proximaConsulta.nomeProfissional ?? 'A definir' }}</p>
          <p><strong>Status:</strong> {{ formatarStatus(proximaConsulta.statusAtendimento ?? proximaConsulta.status) }}</p>
        </div>
        <div v-else>
          <p>Nenhuma consulta agendada.</p>
        </div>
      </div>

      <div class="card ultimo-atendimento">
        <h3>Último Atendimento</h3>
        <div v-if="ultimoAtendimento">
          <p><strong>Data:</strong> {{ formatarData(ultimoAtendimento.dataHorarioAtendimento ?? ultimoAtendimento.data) }}</p>
          <p><strong>Tipo:</strong> {{ ultimoAtendimento.tipoAtendimento ?? ultimoAtendimento.tipo ?? 'Consulta' }}</p>
          <p><strong>Resumo:</strong> {{ ultimoAtendimento.resumo ?? ultimoAtendimento.observacoes ?? 'Sem resumo registrado.' }}</p>
        </div>
        <div v-else>
          <p>Nenhum atendimento anterior.</p>
        </div>
      </div>

      <div class="card profissional-responsavel">
        <h3>Profissional Responsável</h3>
        <div v-if="profissionalResponsavel">
          <p><strong>Nome:</strong> {{ profissionalResponsavel }}</p>
          <p><strong>Especialidade:</strong> {{ especialidadeProfissional }}</p>
        </div>
        <div v-else>
          <p>Profissional não definido.</p>
        </div>
      </div>

      <div class="card pagamentos">
        <h3>Pagamentos</h3>
        <div v-if="ultimoPagamento">
          <p><strong>Valor:</strong> R$ {{ ultimoPagamento.valor?.toFixed(2) ?? '0.00' }}</p>
          <p><strong>Data:</strong> {{ formatarData(ultimoPagamento.dataPagamento ?? ultimoPagamento.data) }}</p>
          <p><strong>Status:</strong> {{ ultimoPagamento.status ?? 'Pago' }}</p>
        </div>
        <div v-else>
          <p>Nenhum pagamento registrado.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PacienteService from '../services/PacienteService.js'
import AtendimentoService from '../services/AtendimentoService.js'

const nomePaciente = ref('Paciente')
const proximaConsulta = ref(null)
const ultimoAtendimento = ref(null)
const profissionalResponsavel = ref('')
const especialidadeProfissional = ref('')
const ultimoPagamento = ref(null)
const erroMensagem = ref('')

function formatarData(dataString) {
  if (!dataString) return '—'
  const data = new Date(dataString)
  if (Number.isNaN(data.getTime())) return '—'
  return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

function formatarHora(atendimento) {
  if (atendimento.horaAtendimento) return atendimento.horaAtendimento
  if (atendimento.hora) return atendimento.hora
  const dataString = atendimento.dataHorarioAtendimento ?? atendimento.data
  if (!dataString) return '—'
  const data = new Date(dataString)
  if (Number.isNaN(data.getTime())) return '—'
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })
}

function formatarStatus(status) {
  if (!status) return 'Agendado'
  const map = {
    agendado: 'Agendado',
    em_andamento: 'Em andamento',
    concluido: 'Concluído',
    cancelado: 'Cancelado'
  }
  const normalizado = String(status).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "_")
  return map[normalizado] || status
}

async function carregarDados() {
  const idPaciente = sessionStorage.getItem("idUsuario")
  const nomeSalvo = sessionStorage.getItem("nomeUsuario")

  if (nomeSalvo) {
    nomePaciente.value = nomeSalvo
  }

  if (!idPaciente) {
    erroMensagem.value = "ID do paciente não encontrado. Faça login novamente."
    return
  }

  try {
    const atendimentoService = new AtendimentoService()

    try {
      const respProximo = await atendimentoService.proximo(idPaciente)
      if (respProximo.data && Object.keys(respProximo.data).length > 0) {
        proximaConsulta.value = respProximo.data
        if (respProximo.data.profissional?.nomeProfissional) {
          profissionalResponsavel.value = respProximo.data.profissional.nomeProfissional
          especialidadeProfissional.value = respProximo.data.profissional.especialidade ?? ''
        }
      }
    } catch (e) {
      console.log("Nenhum próximo atendimento encontrado")
    }

    try {
      const respLista = await atendimentoService.listar()
      const todos = Array.isArray(respLista.data) ? respLista.data : []
      const meus = todos.filter(a => String(a.idPaciente ?? a.id_paciente ?? a.paciente?.idPaciente ?? '') === String(idPaciente))

      if (meus.length > 0) {
        meus.sort((a, b) => new Date(b.dataHorarioAtendimento ?? b.data ?? 0) - new Date(a.dataHorarioAtendimento ?? a.data ?? 0))
        ultimoAtendimento.value = meus[0]

        if (!profissionalResponsavel.value && meus[0].profissional?.nomeProfissional) {
          profissionalResponsavel.value = meus[0].profissional.nomeProfissional
        }
      }
    } catch (e) {
      console.log("Erro ao listar atendimentos", e)
    }

  } catch (erro) {
    console.error("Erro ao carregar dados:", erro)
    erroMensagem.value = "Erro ao carregar dados do paciente."
  }
}

onMounted(carregarDados)
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.bem-vindo {
  margin-bottom: 24px;
}

.bem-vindo h2 {
  color: #2c4054;
  margin-bottom: 8px;
}

.bem-vindo p {
  color: #64748b;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(20, 55, 75, 0.1);
}

.card h3 {
  color: #2c4054;
  margin-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 8px;
}

.card p {
  margin: 8px 0;
  color: #475569;
  font-size: 14px;
}

.erro-banner {
  background: #fee2e2;
  color: #b91c1c;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}
</style>