
<template>
    <div class="historico-app">
  
      <!-- MENU LATERAL -->
      <aside class="sidebar">
        <div class="logo">
          <span class="logo-icon">♡</span>
          <div>
            <h2>Saúde Mental</h2>
            <p>Cuidar também é<br>um ato de força</p>
          </div>
        </div>
  
        <nav class="menu">
          <router-link to="/telaPrincipal">⌂ <span>Painel</span></router-link>
          <router-link to="/consulta">▣ <span>Consultas</span></router-link>
          <router-link to="/listaPagamentos">▤ <span>Meu Plano</span></router-link>
          <router-link to="/historico" class="ativo">◷ <span>Histórico</span></router-link>
          <router-link to="/mensagens">▣ <span>Mensagens</span></router-link>
          <router-link to="/telaPrincipal">⚙ <span>Configurações</span></router-link>
        </nav>
  
        <div class="apoio">
          <div class="ilustracao">🌿</div>
          <h3>Você já fez muito até aqui.</h3>
          <p>Seu cuidado com a sua mente é um grande passo.</p>
        </div>
      </aside>
  
      <!-- CONTEÚDO -->
      <main class="conteudo">
        <header class="topo">
          <div>
            <h2>Olá,</h2>
            <h1>{{ nomePaciente }} <span class="verificado">✓</span></h1>
            <p>Aqui está o seu histórico de atendimentos, evoluções e acompanhamentos.</p>
          </div>
          <div class="perfil">♧　👤⌄</div>
        </header>
  
        <div class="colunas">
  
          <!-- LISTA DE ATENDIMENTOS -->
          <section class="painel lista-painel">
            <div class="titulo-painel">
              <h2>Histórico de atendimentos</h2>
  
              <select v-model="filtro" aria-label="Filtrar atendimentos">
                <option value="todos">Todos os atendimentos</option>
                <option value="Concluído">Concluídos</option>
                <option value="Agendado">Agendados</option>
                <option value="Cancelado">Cancelados</option>
              </select>
            </div>
  
            <p class="contador">
              {{ atendimentosFiltrados.length }}
              atendimento(s) encontrado(s)
            </p>
  
            <div
              v-for="atendimento in atendimentosFiltrados"
              :key="atendimento.id"
              class="atendimento"
              :class="{
                selecionado: atendimento.id === atendimentoSelecionado.id
              }"
              role="button"
              tabindex="0"
              @click="selecionarAtendimento(atendimento)"
              @keydown.enter="selecionarAtendimento(atendimento)"
              @keydown.space.prevent="selecionarAtendimento(atendimento)"
            >
              <div class="icone-atendimento">♙</div>
  
              <div class="info-atendimento">
                <span class="data">
                  {{ atendimento.data }} · {{ atendimento.horario }}
                </span>
                <h3>{{ atendimento.tipo }}</h3>
                <p>{{ atendimento.profissional }}</p>
                <small>{{ atendimento.descricao }}</small>
              </div>
  
              <div class="lado-atendimento">
                <span
                  class="status"
                  :class="classeStatus(atendimento.status)"
                >
                  {{ atendimento.status }}
                </span>
                <span class="seta">›</span>
              </div>
            </div>
  
            <div
              v-if="atendimentosFiltrados.length === 0"
              class="vazio"
            >
              <span>📋</span>
              <h3>Nenhum atendimento encontrado</h3>
              <p>Escolha outro filtro para consultar seus registros.</p>
              <button @click="filtro = 'todos'">Ver todos</button>
            </div>
          </section>
  
          <!-- DETALHES -->
          <section class="painel detalhes-painel">
            <h2 class="titulo-detalhes">Detalhes do atendimento</h2>
  
            <template v-if="atendimentoSelecionado">
              <div class="resumo-atendimento">
                <div class="icone-atendimento grande">♙</div>
  
                <div class="resumo-info">
                  <span class="data">
                    {{ atendimentoSelecionado.data }}
                    · {{ atendimentoSelecionado.horario }}
                  </span>
                  <h3>{{ atendimentoSelecionado.tipo }}</h3>
                  <p>{{ atendimentoSelecionado.profissional }}</p>
                </div>
  
                <span
                  class="status"
                  :class="classeStatus(atendimentoSelecionado.status)"
                >
                  {{ atendimentoSelecionado.status }}
                </span>
              </div>
  
              <div class="secao-detalhe">
                <div class="icone-secao">▤</div>
                <div>
                  <h3>Resumo da consulta</h3>
                  <p>{{ atendimentoSelecionado.resumo }}</p>
                </div>
              </div>
  
              <div class="secao-detalhe">
                <div class="icone-secao">↗</div>
                <div>
                  <h3>Evolução do atendimento</h3>
                  <ul>
                    <li
                      v-for="(item, index) in atendimentoSelecionado.evolucao"
                      :key="index"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
  
              <div class="secao-detalhe">
                <div class="icone-secao">◎</div>
                <div>
                  <h3>Próximos passos</h3>
                  <ul>
                    <li
                      v-for="(item, index) in atendimentoSelecionado.proximosPassos"
                      :key="index"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
  
              <div class="acoes">
                <button
                  class="botao-secundario"
                  @click="imprimirHistorico"
                >
                  Imprimir detalhes
                </button>
  
                <button
                  v-if="atendimentoSelecionado.status === 'Agendado'"
                  class="botao-principal"
                  @click="irParaConsultas"
                >
                  Ver consultas
                </button>
  
                <button
                  v-else
                  class="botao-principal"
                  @click="irParaMensagens"
                >
                  Ir para mensagens
                </button>
              </div>
            </template>
  
            <div v-else class="vazio">
              <h3>Selecione um atendimento</h3>
              <p>Escolha um registro da lista para ver os detalhes.</p>
            </div>
  
            <div class="mensagem-apoio">
              💙 <span>
                Você está se dedicando e isso faz toda a diferença.
                Juntos, seguimos no seu ritmo!
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const nomePaciente = ref("Ana Heloisa");
  const filtro = ref("todos");
  
  const atendimentos = ref([
    {
      id: 1,
      data: "15/10/2025",
      horario: "14:00",
      tipo: "Consulta psicológica",
      profissional: "Dra. Talita Berjas Favore",
      status: "Concluído",
      descricao: "Foi realizado o acompanhamento do seu bem-estar.",
      resumo:
        "Conversamos sobre como você tem se sentido nas últimas semanas, exploramos pensamentos que podem gerar ansiedade e trabalhamos técnicas de respiração e organização da rotina.",
      evolucao: [
        "Conversamos sobre sentimentos e preocupações.",
        "Praticamos estratégias de respiração.",
        "Definimos formas de organizar a rotina."
      ],
      proximosPassos: [
        "Continuar praticando as estratégias combinadas.",
        "Manter uma rotina de descanso.",
        "Consultar os próximos agendamentos."
      ]
    },
    {
      id: 2,
      data: "01/10/2025",
      horario: "14:00",
      tipo: "Consulta psicológica",
      profissional: "Dra. Talita Berjas Favore",
      status: "Concluído",
      descricao: "Discussão sobre rotina, pensamentos e emoções.",
      resumo:
        "O atendimento foi dedicado a conversar sobre a rotina, os sentimentos e as situações que causaram preocupação.",
      evolucao: [
        "Identificação de situações estressantes.",
        "Reflexão sobre pensamentos recorrentes.",
        "Planejamento de pequenas mudanças na rotina."
      ],
      proximosPassos: [
        "Observar os momentos de maior preocupação.",
        "Registrar dúvidas para a próxima sessão."
      ]
    },
    {
      id: 3,
      data: "17/09/2025",
      horario: "14:00",
      tipo: "Consulta psicológica",
      profissional: "Dra. Talita Berjas Favore",
      status: "Concluído",
      descricao: "Trabalho sobre ansiedade e técnicas de respiração.",
      resumo:
        "Conversamos sobre situações que provocam ansiedade e conhecemos estratégias para lidar com momentos de tensão.",
      evolucao: [
        "Reconhecimento de situações difíceis.",
        "Apresentação de técnica de respiração.",
        "Discussão sobre autocuidado."
      ],
      proximosPassos: [
        "Praticar as técnicas aprendidas.",
        "Retomar os assuntos na próxima consulta."
      ]
    },
    {
      id: 4,
      data: "03/09/2025",
      horario: "14:00",
      tipo: "Consulta psicológica",
      profissional: "Dra. Talita Berjas Favore",
      status: "Concluído",
      descricao: "Avaliação inicial e definição dos objetivos.",
      resumo:
        "Realizamos uma conversa inicial para conhecer as necessidades e definir os objetivos do acompanhamento.",
      evolucao: [
        "Levantamento das principais dúvidas.",
        "Definição dos objetivos do acompanhamento."
      ],
      proximosPassos: [
        "Dar continuidade ao acompanhamento.",
        "Revisar os objetivos nas próximas sessões."
      ]
    },
    {
      id: 5,
      data: "20/08/2025",
      horario: "14:00",
      tipo: "Consulta psicológica",
      profissional: "Dra. Talita Berjas Favore",
      status: "Concluído",
      descricao: "Primeiro contato e acolhimento.",
      resumo:
        "Primeiro encontro para apresentação do atendimento, acolhimento e esclarecimento de dúvidas.",
      evolucao: [
        "Apresentação da proposta de acompanhamento.",
        "Conversa inicial sobre expectativas."
      ],
      proximosPassos: [
        "Dar continuidade às sessões.",
        "Preparar temas que gostaria de conversar."
      ]
    },
    {
      id: 6,
      data: "20/10/2026",
      horario: "15:00",
      tipo: "Consulta psicológica",
      profissional: "Dra. Talita Berjas Favore",
      status: "Agendado",
      descricao: "Próximo atendimento agendado.",
      resumo:
        "Este atendimento está agendado. Os detalhes da sessão serão atualizados após sua realização.",
      evolucao: [
        "Atendimento ainda não realizado."
      ],
      proximosPassos: [
        "Comparecer no dia e horário agendados.",
        "Consultar a página de consultas se precisar conferir o agendamento."
      ]
    }
  ]);
  
  const atendimentoSelecionado = ref(atendimentos.value[0]);
  
  const atendimentosFiltrados = computed(() => {
    if (filtro.value === "todos") {
      return atendimentos.value;
    }
  
    return atendimentos.value.filter(
      (item) => item.status === filtro.value
    );
  });
  
  function selecionarAtendimento(atendimento) {
    atendimentoSelecionado.value = atendimento;
  }
  
  function classeStatus(status) {
    return {
      "status-concluido": status === "Concluído",
      "status-agendado": status === "Agendado",
      "status-cancelado": status === "Cancelado"
    };
  }
  
  function irParaConsultas() {
    router.push("/consulta");
  }
  
  function irParaMensagens() {
    router.push("/mensagens");
  }
  
  function imprimirHistorico() {
    window.print();
  }
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
  }
  
  .historico-app {
    display: flex;
    min-height: 100vh;
    background: #f3f8fd;
    color: #12345d;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  /* MENU LATERAL */
  .sidebar {
    width: 275px;
    flex-shrink: 0;
    padding: 30px 10px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #10365c, #092847);
    color: white;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 10px;
    margin-bottom: 38px;
  }
  
  .logo-icon {
    font-size: 48px;
  }
  
  .logo h2 {
    margin: 0 0 5px;
    font-size: 21px;
  }
  
  .logo p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .menu a {
    padding: 15px;
    border-radius: 10px;
    color: white;
    text-decoration: none;
    font-size: 17px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .menu a.ativo,
  .menu a:hover {
    background: #2871bd;
  }
  
  .apoio {
    text-align: center;
    margin-top: auto;
    padding: 35px 15px 10px;
  }
  
  .ilustracao {
    font-size: 70px;
    margin-bottom: 10px;
  }
  
  .apoio h3 {
    font-size: 16px;
    line-height: 1.5;
  }
  
  .apoio p {
    font-size: 14px;
    line-height: 1.6;
  }
  
  /* CONTEÚDO PRINCIPAL */
  .conteudo {
    flex: 1;
    min-width: 0;
    padding: 24px;
  }
  
  .topo {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 8px 22px;
    border-bottom: 1px solid #dce8f5;
    margin-bottom: 18px;
  }
  
  .topo h2 {
    margin: 0;
    font-size: 23px;
  }
  
  .topo h1 {
    margin: 0;
    color: #15986d;
    font-size: 38px;
  }
  
  .topo p {
    margin: 5px 0 0;
    color: #58749b;
    font-size: 16px;
  }
  
  .verificado {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    background: #15986d;
    color: white;
    border-radius: 50%;
    font-size: 16px;
    vertical-align: middle;
  }
  
  .perfil {
    font-size: 27px;
  }
  
  /* PAINÉIS */
  .colunas {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.9fr);
    align-items: stretch;
    gap: 14px;
  }
  
  .painel {
    min-width: 0;
    padding: 17px;
    border: 1px solid #e0ebf7;
    border-radius: 13px;
    background: rgba(255, 255, 255, 0.88);
    box-shadow: 0 2px 8px rgba(30, 68, 110, 0.03);
  }
  
  .titulo-painel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .titulo-painel h2,
  .titulo-detalhes {
    font-size: 20px;
    margin: 4px 0 12px;
  }
  
  .titulo-painel select {
    max-width: 100%;
    padding: 10px;
    border: 1px solid #d0e1f4;
    border-radius: 9px;
    background: white;
    color: #2871bd;
    cursor: pointer;
  }
  
  .contador {
    color: #7890ad;
    font-size: 12px;
    margin: 0 0 12px;
  }
  
  /* CARDS */
  .atendimento {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 14px;
    margin-bottom: 9px;
    border: 1px solid #e0eaf5;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  
  .atendimento:hover {
    border-color: #83b7ed;
    background: #f4f9ff;
  }
  
  .atendimento.selecionado {
    background: #effaf8;
    border-color: #d2eee6;
  }
  
  .icone-atendimento {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #d9f4eb;
    color: #15986d;
    font-size: 25px;
  }
  
  .info-atendimento {
    flex: 1;
    min-width: 0;
  }
  
  .data {
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
    color: #41668d;
  }
  
  .info-atendimento h3,
  .resumo-info h3 {
    margin: 0 0 7px;
    font-size: 15px;
  }
  
  .info-atendimento p,
  .resumo-info p {
    margin: 0 0 6px;
    color: #41668d;
    font-size: 13px;
  }
  
  .info-atendimento small {
    display: block;
    color: #587da3;
    font-size: 12px;
    line-height: 1.5;
  }
  
  .lado-atendimento {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .status {
    display: inline-block;
    padding: 7px 12px;
    border-radius: 20px;
    white-space: nowrap;
    font-size: 12px;
    font-weight: bold;
  }
  
  .status-concluido {
    background: #d8f5eb;
    color: #14835f;
  }
  
  .status-agendado {
    background: #e0edff;
    color: #246dc0;
  }
  
  .status-cancelado {
    background: #ffe2e5;
    color: #bd344b;
  }
  
  .seta {
    color: #5493ce;
    font-size: 28px;
  }
  
  /* DETALHES */
  .detalhes-painel {
    display: flex;
    flex-direction: column;
  }
  
  .resumo-atendimento {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding: 14px;
    background: #effaf8;
    border-radius: 10px;
  }
  
  .icone-atendimento.grande {
    width: 50px;
    height: 50px;
  }
  
  .resumo-info {
    flex: 1;
    min-width: 120px;
  }
  
  .secao-detalhe {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 18px 0 5px;
  }
  
  .icone-secao {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8f2ff;
    border-radius: 50%;
    color: #14558d;
    font-size: 23px;
  }
  
  .secao-detalhe h3 {
    margin: 8px 0 12px;
    font-size: 15px;
  }
  
  .secao-detalhe p,
  .secao-detalhe li {
    font-size: 13px;
    line-height: 1.8;
    color: #244a75;
  }
  
  .secao-detalhe p {
    margin: 0;
  }
  
  .secao-detalhe ul {
    padding-left: 18px;
    margin: 0 0 10px;
  }
  
  .acoes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 18px;
  }
  
  .acoes button,
  .vazio button {
    border: 0;
    border-radius: 8px;
    padding: 11px 13px;
    cursor: pointer;
    font-size: 13px;
  }
  
  .botao-principal,
  .vazio button {
    background: #287bd1;
    color: white;
  }
  
  .botao-secundario {
    background: #e9f2fc;
    color: #245e9c;
  }
  
  .acoes button:hover,
  .vazio button:hover {
    filter: brightness(0.96);
  }
  
  .mensagem-apoio {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: auto;
    padding: 15px;
    border-radius: 10px;
    background: #eaf5ff;
    color: #2674bd;
    font-size: 13px;
    line-height: 1.6;
  }
  
  .mensagem-apoio:first-letter {
    font-size: 20px;
  }
  
  .vazio {
    text-align: center;
    padding: 40px 15px;
    color: #58749b;
  }
  
  .vazio h3 {
    color: #173b6c;
  }
  
  .vazio p {
    font-size: 13px;
  }
  
  /* RESPONSIVIDADE */
  @media (max-width: 1100px) {
    .sidebar {
      width: 210px;
    }
  
    .colunas {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 650px) {
    .sidebar {
      width: 72px;
      padding: 15px 7px;
    }
  
    .logo {
      justify-content: center;
      padding: 0;
    }
  
    .logo div,
    .menu a span,
    .apoio {
      display: none;
    }
  
    .menu a {
      justify-content: center;
      padding: 13px 5px;
      font-size: 21px;
    }
  
    .conteudo {
      padding: 12px 8px;
    }
  
    .topo h1 {
      font-size: 28px;
    }
  
    .topo p {
      font-size: 12px;
      line-height: 1.5;
    }
  
    .painel {
      padding: 12px;
    }
  
    .atendimento {
      padding: 10px 7px;
      gap: 8px;
    }
  
    .icone-atendimento {
      width: 36px;
      height: 36px;
      font-size: 19px;
    }
  
    .lado-atendimento {
      flex-direction: column;
      align-items: flex-end;
      gap: 3px;
    }
  
    .status {
      padding: 5px 7px;
      font-size: 10px;
    }
  
    .info-atendimento small {
      font-size: 11px;
    }
  }
  
  @media print {
    .sidebar,
    .acoes,
    .titulo-painel select {
      display: none !important;
    }
  
    .historico-app {
      background: white;
    }
  
    .colunas {
      display: block;
    }
  
    .painel {
      margin-bottom: 15px;
      box-shadow: none;
    }
  }
  </style>
  