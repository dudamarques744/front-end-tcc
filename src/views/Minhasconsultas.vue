<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import MenuLateral from '../components/MenuLateral.vue'

const router = useRouter()

// Troque por dados reais (paciente logado e próxima consulta vindos da API)
const paciente = ref({ nome: 'Ana Heloisa' })

const consulta = ref({
  tipo: 'Consulta Presencial',
  titulo: 'Consulta com Psicóloga',
  profissional: 'Dra. Talita Berjas Favore',
  registro: 'CRP 06/123456',
  data: '15/10/2025',
  hora: '14:00',
  local: 'Clínica Bem-Estar',
  endereco: 'Rua das Flores, 123 - Centro, Jales/SP',
  status: 'Confirmada',
})

const informacoes = [
  'Chegue com 10 minutos de antecedência.',
  'Leve um documento com foto.',
  'Em caso de imprevistos, avise com pelo menos 24h de antecedência.',
]

const passos = ref([
  {
    titulo: 'Consulta agendada',
    destaque: '15/10/2025 - 14:00',
    texto: 'Sua consulta foi confirmada com sucesso.',
    feito: true,
  },
  {
    titulo: 'Comparecer à clínica',
    texto: 'No dia e horário da sua consulta.',
    feito: false,
  },
  {
    titulo: 'Pós-consulta',
    texto: 'Você poderá avaliar o atendimento e deixar um feedback.',
    feito: false,
  },
  {
    titulo: 'Acompanhamento',
    texto: 'Se necessário, sua psicóloga retornará com orientações e próximo agendamento.',
    feito: false,
  },
])
</script>

<template>
  <div class="layout">
    <MenuLateral
      titulo-rodape="Você está indo muito bem!"
      texto-rodape="Cuidar da sua mente também é cuidar do seu futuro."
    />

    <main class="conteudo">
      <!-- Cabeçalho -->
      <header class="topbar">
        <div>
          <span class="ola">Olá,</span>
          <h1>
            {{ paciente.nome }}
            <Icon icon="mdi:check-circle" class="verificado" />
          </h1>
          <p>Aqui você encontra todas as suas consultas e informações.</p>
        </div>
        <div class="topbar-acoes">
          <button class="icon-btn" aria-label="Notificações">
            <Icon icon="mdi:bell-outline" />
          </button>
          <button class="perfil" aria-label="Perfil">
            <Icon icon="mdi:account-circle" class="perfil-icon" />
            <Icon icon="mdi:chevron-down" />
          </button>
        </div>
      </header>

      <div class="grade">
        <!-- Coluna esquerda -->
        <div class="coluna">
          <section class="painel">
            <div class="painel-topo">
              <button class="voltar" aria-label="Voltar" @click="router.back()">
                <Icon icon="mdi:arrow-left" />
              </button>
              <h2>Minhas Consultas</h2>
            </div>

            <div class="consulta-card">
              <div class="consulta-info">
                <div class="linha-topo">
                  <span class="circulo"><Icon icon="mdi:calendar-month-outline" /></span>
                  <span class="chip">{{ consulta.tipo }}</span>
                </div>

                <h3>{{ consulta.titulo }}</h3>
                <p class="profissional">{{ consulta.profissional }}</p>
                <p class="registro">{{ consulta.registro }}</p>

                <ul class="detalhes">
                  <li>
                    <Icon icon="mdi:calendar-blank-outline" />
                    <div>
                      <small>Data</small>
                      <strong>{{ consulta.data }}</strong>
                    </div>
                  </li>
                  <li>
                    <Icon icon="mdi:clock-outline" />
                    <div>
                      <small>Horário</small>
                      <strong>{{ consulta.hora }}</strong>
                    </div>
                  </li>
                  <li>
                    <Icon icon="mdi:map-marker-outline" />
                    <div>
                      <small>Endereço</small>
                      <strong class="local">{{ consulta.local }}</strong>
                      <span class="endereco">{{ consulta.endereco }}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="consulta-lado">
                <span class="selo">
                  <Icon icon="mdi:check-circle" /> {{ consulta.status }}
                </span>

                <div class="confirmada">
                  <span class="circulo-azul"><Icon icon="mdi:clipboard-heart-outline" /></span>
                  <strong>Sua consulta está confirmada!</strong>
                  <p>
                    Estamos felizes por você estar dando esse passo. Qualquer
                    dúvida, entre em contato conosco.
                  </p>
                  <router-link to="/chats" class="btn-falar">
                    <Icon icon="mdi:message-text-outline" /> Falar com a clínica
                  </router-link>
                </div>
              </div>
            </div>
          </section>

          <section class="painel">
            <h2 class="sub">Informações importantes</h2>
            <div class="info-box">
              <Icon icon="mdi:information" class="info-icone" />
              <ul>
                <li v-for="i in informacoes" :key="i">{{ i }}</li>
              </ul>
            </div>
          </section>

          <section class="remarcacao">
            <span class="circulo-azul pequeno"><Icon icon="mdi:calendar-edit" /></span>
            <div class="remarcacao-texto">
              <strong>Remarcação</strong>
              <p>
                Precisa alterar a data da sua consulta?<br />
                Você pode remarcar com facilidade.
              </p>
            </div>
            <router-link to="/consulta" class="btn-remarcar">
              Remarcar consulta <Icon icon="mdi:chevron-right" />
            </router-link>
          </section>
        </div>

        <!-- Coluna direita -->
        <aside class="coluna-direita">
          <section class="painel">
            <h2 class="sub">Próximos passos</h2>

            <ol class="passos">
              <li v-for="(p, i) in passos" :key="p.titulo" :class="{ feito: p.feito }">
                <span class="marcador">
                  <Icon v-if="p.feito" icon="mdi:check" />
                </span>
                <div>
                  <strong>{{ p.titulo }}</strong>
                  <b v-if="p.destaque" class="destaque">{{ p.destaque }}</b>
                  <small>{{ p.texto }}</small>
                </div>
              </li>
            </ol>

            <div class="apoio">
              <Icon icon="mdi:sprout" />
              <div>
                <strong>Você não está sozinha(o)!</strong>
                <small>Estamos aqui para te apoiar em cada etapa do seu cuidado.</small>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  --azul-titulo: #10285c;
  --azul: #2f62c9;
  --verde: #1f9d6b;
  --borda: #e3eaf5;
  --suave: #6b7a96;

  display: flex;
  min-height: 100svh;
  background: #f5f8fd;
  color: #1d2a44;
  font-family: 'Inter', 'Work Sans', system-ui, sans-serif;
}
.conteudo { flex: 1; min-width: 0; }

/* ---------- Cabeçalho ---------- */
.topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 28px 16px;
  background: #fff;
  border-bottom: 1px solid var(--borda);
}
.ola { font-size: 20px; font-weight: 700; color: var(--azul-titulo); }
.topbar h1 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 38px;
  font-weight: 800;
  color: var(--verde);
  line-height: 1.1;
}
.verificado { font-size: 26px; }
.topbar p { margin: 4px 0 0; color: var(--suave); font-size: 17px; }
.topbar-acoes { display: flex; align-items: center; gap: 22px; }
.icon-btn, .perfil {
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--azul-titulo);
  display: flex;
  align-items: center;
}
.icon-btn { font-size: 30px; }
.perfil { gap: 6px; font-size: 18px; }
.perfil-icon { font-size: 50px; color: var(--azul); }

/* ---------- Grade ---------- */
.grade {
  display: grid;
  grid-template-columns: 1.75fr 1fr;
  gap: 24px;
  padding: 24px 28px;
  align-items: start;
}
.coluna { display: flex; flex-direction: column; gap: 20px; }

.painel {
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
  padding: 22px;
}
.painel-topo { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.painel h2 { margin: 0; font-size: 19px; font-weight: 700; color: var(--azul-titulo); }
.painel h2.sub { margin-bottom: 14px; font-size: 21px; font-weight: 800; }
.voltar {
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 26px;
  color: var(--azul-titulo);
  display: flex;
}

/* ---------- Card da consulta ---------- */
.consulta-card {
  display: flex;
  gap: 20px;
  padding: 22px;
  background: #eef8f3;
  border: 1px solid #d3ecdf;
  border-radius: 14px;
}
.consulta-info { flex: 1; min-width: 0; }
.linha-topo { display: flex; align-items: center; gap: 14px; }
.circulo {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: #d4eedf;
  color: var(--verde);
  display: grid; place-items: center;
  font-size: 30px;
}
.chip {
  padding: 6px 14px;
  background: #e1f3ea;
  color: #1c7d57;
  border-radius: 999px;
  font-size: 14px;
}
.consulta-info h3 { margin: 14px 0 4px; font-size: 26px; font-weight: 800; color: var(--azul-titulo); }
.profissional { margin: 0; font-size: 20px; font-weight: 600; color: var(--azul-titulo); }
.registro { margin: 4px 0 18px; color: var(--suave); }

.detalhes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
.detalhes li { display: flex; align-items: flex-start; gap: 14px; }
.detalhes li > :deep(svg) { font-size: 28px; color: var(--azul); flex-shrink: 0; margin-top: 2px; }
.detalhes small { display: block; font-size: 15px; color: var(--azul-titulo); }
.detalhes strong { display: block; font-size: 21px; color: var(--azul-titulo); }
.detalhes strong.local { font-size: 16px; }
.endereco { color: var(--suave); font-size: 15px; }

.consulta-lado {
  width: 40%;
  min-width: 230px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}
.selo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px 8px 10px;
  border: 1.5px solid #8fd1b3;
  background: #e1f3ea;
  color: #1c7d57;
  border-radius: 999px;
  font-weight: 700;
  font-size: 17px;
}
.selo :deep(svg) { font-size: 26px; color: var(--verde); }

.confirmada {
  width: 100%;
  padding: 20px 18px;
  text-align: center;
  background: #eaf1fb;
  border-radius: 12px;
}
.circulo-azul {
  width: 56px; height: 56px;
  margin: 0 auto 10px;
  border-radius: 50%;
  background: #dbe6fb;
  color: var(--azul);
  display: grid; place-items: center;
  font-size: 30px;
}
.circulo-azul.pequeno { width: 50px; height: 50px; margin: 0; font-size: 26px; flex-shrink: 0; }
.confirmada strong { display: block; font-size: 17px; color: var(--azul-titulo); }
.confirmada p { margin: 8px 0 16px; font-size: 13.5px; line-height: 1.5; color: var(--suave); }
.btn-falar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border: 2px solid #b9cdf2;
  border-radius: 999px;
  background: #fff;
  color: var(--azul);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}
.btn-falar:hover { background: #eef4ff; }

/* ---------- Informações importantes ---------- */
.info-box {
  display: flex;
  gap: 14px;
  padding: 18px;
  background: #eaf1fb;
  border-radius: 10px;
}
.info-icone { font-size: 30px; color: var(--azul); flex-shrink: 0; }
.info-box ul { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; font-size: 14.5px; }

/* ---------- Remarcação ---------- */
.remarcacao {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
}
.remarcacao-texto { flex: 1; }
.remarcacao-texto strong { display: block; color: var(--azul-titulo); }
.remarcacao-texto p { margin: 4px 0 0; font-size: 14px; color: var(--suave); line-height: 1.5; }
.btn-remarcar {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 12px 22px;
  border: 2px solid #b9cdf2;
  border-radius: 999px;
  color: var(--azul);
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
}
.btn-remarcar:hover { background: #eef4ff; }

/* ---------- Próximos passos ---------- */
.passos { list-style: none; margin: 0 0 24px; padding: 0; }
.passos li {
  position: relative;
  display: flex;
  gap: 16px;
  padding-bottom: 28px;
}
.passos li:last-child { padding-bottom: 0; }
.passos li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 14px;
  top: 30px;
  bottom: 0;
  width: 2px;
  background: #cfd8e8;
}
.passos li.feito:not(:last-child)::before { background: #7cd1ae; }
.marcador {
  width: 30px; height: 30px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid #aab6cc;
  background: #fff;
  display: grid; place-items: center;
  color: #fff;
  font-size: 18px;
  z-index: 1;
}
.passos li.feito .marcador { background: var(--verde); border-color: var(--verde); }
.passos strong { display: block; font-size: 16px; color: var(--azul-titulo); }
.passos li.feito strong { color: var(--verde); }
.destaque { display: block; margin-top: 2px; color: var(--azul-titulo); }
.passos small { display: block; margin-top: 3px; color: var(--suave); font-size: 14px; line-height: 1.45; }

.apoio {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  background: #e4f6ee;
  border-radius: 10px;
  color: var(--verde);
}
.apoio > :deep(svg) { font-size: 44px; flex-shrink: 0; }
.apoio strong { display: block; color: var(--azul-titulo); }
.apoio small { display: block; margin-top: 4px; color: var(--suave); font-size: 13.5px; }

/* ---------- Responsivo ---------- */
@media (max-width: 1100px) {
  .grade { grid-template-columns: 1fr; }
}
@media (max-width: 800px) {
  .layout { flex-direction: column; }
  .consulta-card { flex-direction: column; }
  .consulta-lado { width: 100%; align-items: stretch; }
  .remarcacao { flex-wrap: wrap; }
  .topbar h1 { font-size: 30px; }
}
</style>