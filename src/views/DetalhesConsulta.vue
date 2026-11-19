<template>
    <div class="dashboard">
  
      <!-- MENU LATERAL -->
      <aside class="sidebar">
        <div class="logo">
          <svg class="logo__icone" viewBox="0 0 56 56" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M28 51C11 37 4 27 4 18.5C4 10.5 10 5 17 5C22 5 26 8 28 12.5C30 8 34 5 39 5C46 5 52 10.5 52 18.5C52 27 45 37 28 51Z" />
            <path d="M22 16C26 19 26 25 22 29" />
            <path d="M34 16C30 19 30 25 34 29" />
            <path d="M28 14V36" />
          </svg>
          <div>
            <h2>Saúde Mental</h2>
            <p>Cuidar também é<br />um ato de força</p>
          </div>
        </div>
  
        <nav class="menu">
          <button type="button" @click="irPara('/telaPrincipal')">
            <Icon icon="mdi:home-outline" width="30" />
            Painel
          </button>
  
          <button type="button" class="ativo" @click="irPara('/detalhesConsulta')">
            <Icon icon="mdi:calendar-blank-outline" width="30" />
            Consultas
          </button>
  
          <button type="button" @click="irPara('/horarios')">
            <Icon icon="mdi:file-document-edit-outline" width="30" />
            Meu Plano
          </button>
  
          <button type="button" @click="irPara('/listaAtendimentos')">
            <Icon icon="mdi:history" width="30" />
            Histórico
          </button>
  
          <button type="button" @click="irPara('/chats')">
            <Icon icon="mdi:message-text-outline" width="30" />
            Mensagens
          </button>
        </nav>
  
        <div class="mensagem-lateral">
          <svg class="ilustracao" viewBox="0 0 220 200" aria-hidden="true">
            <g fill="#2f6fb5">
              <ellipse cx="28" cy="120" rx="9" ry="20" transform="rotate(-25 28 120)" />
              <ellipse cx="22" cy="150" rx="8" ry="18" transform="rotate(-10 22 150)" />
              <ellipse cx="40" cy="95" rx="8" ry="17" transform="rotate(-35 40 95)" />
            </g>
            <g fill="#4a90d9">
              <ellipse cx="192" cy="120" rx="9" ry="20" transform="rotate(25 192 120)" />
              <ellipse cx="198" cy="150" rx="8" ry="18" transform="rotate(10 198 150)" />
              <ellipse cx="180" cy="95" rx="8" ry="17" transform="rotate(35 180 95)" />
            </g>
            <circle cx="110" cy="72" r="42" fill="#1c1630" />
            <circle cx="76" cy="96" r="18" fill="#1c1630" />
            <circle cx="144" cy="96" r="18" fill="#1c1630" />
            <rect x="99" y="98" width="22" height="26" rx="8" fill="#b97a50" />
            <ellipse cx="110" cy="80" rx="22" ry="26" fill="#c98a5e" />
            <path d="M98 82q4 4 8 0M114 82q4 4 8 0" stroke="#4a2c1c" stroke-width="2" fill="none" stroke-linecap="round" />
            <path d="M104 96q6 4 12 0" stroke="#8a4a35" stroke-width="2" fill="none" stroke-linecap="round" />
            <path d="M58 200C58 150 82 124 110 124C138 124 162 150 162 200Z" fill="#8a63d2" />
            <ellipse cx="96" cy="170" rx="14" ry="9" fill="#c98a5e" />
            <ellipse cx="124" cy="170" rx="14" ry="9" fill="#c98a5e" />
          </svg>
          <strong>Você está indo muito bem!</strong>
          <p>Cuidar da sua mente<br />também é cuidar do seu futuro.</p>
        </div>
      </aside>
  
      <!-- CONTEÚDO PRINCIPAL -->
      <main class="conteudo">
  
        <!-- CABEÇALHO -->
        <header class="cabecalho">
          <div>
            <p class="saudacao">Olá,</p>
            <h1>
              {{ nomePaciente }}
              <Icon icon="mdi:check-circle" class="verificado" />
            </h1>
            <p class="subtitulo">
              Aqui você encontra todas as suas consultas e informações.
            </p>
          </div>
  
          <div class="perfil">
            <button type="button" class="notificacao" aria-label="Notificações">
              <Icon icon="mdi:bell-outline" width="30" />
            </button>
            <div class="avatar"><Icon icon="mdi:account" width="34" /></div>
            <Icon icon="mdi:chevron-down" width="22" />
          </div>
        </header>
  
        <!-- COLUNAS -->
        <div class="colunas">
  
          <!-- COLUNA ESQUERDA -->
          <section class="coluna-principal">
  
            <div class="painel-consulta">
              <button type="button" class="voltar" @click="irPara('/consulta')">
                <Icon icon="mdi:arrow-left" width="28" /> Minhas Consultas
              </button>
  
              <div class="cartao-detalhes">
  
                <div class="topo-detalhes">
                  <div class="icone-calendario">
                    <Icon icon="mdi:calendar-check-outline" width="32" />
                  </div>
  
                  <span class="etiqueta">
                    Consulta Presencial
                  </span>
  
                  <span class="confirmada">
                    <span class="check"><Icon icon="mdi:check" width="18" /></span>
                    Confirmada
                  </span>
                </div>
  
                <div class="corpo-detalhes">
                  <div class="dados-consulta">
                    <h2>Consulta com Psicóloga</h2>
                    <h3>Dra. Talita Berjas Favore</h3>
                    <p class="registro">CRP 06/123456</p>
  
                    <div class="dado">
                      <Icon icon="mdi:calendar-blank-outline" width="30" class="dado-icone" />
                      <div>
                        <strong>Data</strong>
                        <p>{{ dataConsulta }}</p>
                      </div>
                    </div>
  
                    <div class="dado">
                      <Icon icon="mdi:clock-outline" width="30" class="dado-icone" />
                      <div>
                        <strong>Horário</strong>
                        <p>{{ horarioConsulta }}</p>
                      </div>
                    </div>
  
                    <div class="dado">
                      <Icon icon="mdi:map-marker-outline" width="30" class="dado-icone" />
                      <div>
                        <strong>Endereço</strong>
                        <p>Clínica Bem-Estar</p>
                        <small>Rua das Flores, 123 - Centro, Jales/SP</small>
                      </div>
                    </div>
                  </div>
  
                  <div class="aviso-confirmacao">
                    <div class="icone-prontuario">
                      <Icon icon="mdi:clipboard-text-outline" width="32" />
                    </div>
                    <h3>Sua consulta está confirmada!</h3>
  
                    <p>
                      Estamos felizes por você estar dando esse passo.
                      Qualquer dúvida, entre em contato conosco.
                    </p>
  
                    <button
                      type="button"
                      class="botao-contato"
                      @click="irPara('/chats')"
                    >
                      <Icon icon="mdi:message-text-outline" width="18" />
                      Falar com a clínica
                    </button>
                  </div>
                </div>
  
                <div class="informacoes-importantes">
                  <h3>Informações importantes</h3>
  
                  <div class="caixa-informacoes">
                    <span class="icone-info">i</span>
                    <ul>
                      <li>Chegue com 10 minutos de antecedência.</li>
                      <li>Leve um documento com foto.</li>
                      <li>
                        Em caso de imprevistos, avise com pelo menos
                        24h de antecedência.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- REMARCAÇÃO -->
            <div class="cartao-remarcacao">
              <div class="icone-remarcacao">
                <Icon icon="mdi:calendar-sync-outline" width="28" />
              </div>
  
              <div class="texto-remarcacao">
                <h3>Remarcação</h3>
                <p>Precisa alterar a data da sua consulta?</p>
                <p>Você pode remarcar com facilidade.</p>
              </div>
  
              <button
                type="button"
                class="botao-remarcar"
                @click="irPara('/horarios')"
              >
                Remarcar consulta <Icon icon="mdi:chevron-right" width="22" />
              </button>
            </div>
          </section>
  
          <!-- COLUNA DIREITA -->
          <aside class="coluna-lateral">
            <div class="cartao-etapas">
              <h2>Próximos passos</h2>
  
              <div class="etapas">
  
                <div class="etapa concluida">
                  <div class="etapa-marcador"><Icon icon="mdi:check" width="24" /></div>
                  <div class="etapa-texto">
                    <h3>Consulta agendada</h3>
                    <strong>{{ dataConsulta }} - {{ horarioConsulta }}</strong>
                    <p>Sua consulta foi confirmada com sucesso.</p>
                  </div>
                </div>
  
                <div class="etapa">
                  <div class="etapa-marcador"></div>
                  <div class="etapa-texto">
                    <h3>Comparecer à clínica</h3>
                    <p>No dia e horário da sua consulta.</p>
                  </div>
                </div>
  
                <div class="etapa">
                  <div class="etapa-marcador"></div>
                  <div class="etapa-texto">
                    <h3>Pós-consulta</h3>
                    <p>
                      Você poderá avaliar o atendimento
                      e deixar um feedback.
                    </p>
                  </div>
                </div>
  
                <div class="etapa ultima">
                  <div class="etapa-marcador"></div>
                  <div class="etapa-texto">
                    <h3>Acompanhamento</h3>
                    <p>
                      Se necessário, sua psicóloga retornará
                      com orientações e próximo agendamento.
                    </p>
                  </div>
                </div>
  
              </div>
  
              <div class="mensagem-apoio">
                <Icon icon="mdi:sprout-outline" width="40" class="folha" />
                <div>
                  <h3>Você não está sozinho(a)!</h3>
                  <p>
                    Estamos aqui para te apoiar em cada
                    etapa do seu cuidado.
                  </p>
                </div>
              </div>
            </div>
          </aside>
  
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { Icon } from "@iconify/vue";
  
  export default {
    name: "DetalhesConsulta",
  
    components: { Icon },
  
    data() {
      return {
        dataConsulta: "15/10/2026",
        horarioConsulta: "14:00"
      };
    },
  
    computed: {
      nomePaciente() {
        const nome = (sessionStorage.getItem("nome") ?? "")
          .trim()
          .toLowerCase()
          .replace(/(^|\s)\S/g, (letra) => letra.toUpperCase());
        return nome || "Paciente";
      }
    },
  
    methods: {
      irPara(caminho) {
        this.$router.push(caminho);
      }
    }
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
  }
  
  .dashboard {
    min-height: 100vh;
    display: flex;
    background: #f3f7fc;
    color: #17315c;
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
  }
  
  /* MENU LATERAL */
  
  .sidebar {
    width: 278px;
    min-width: 278px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 26px 10px 34px;
    color: #ffffff;
    background: linear-gradient(180deg, #0d2f55, #082444);
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 14px 44px;
  }
  
  .logo__icone {
    width: 58px;
    height: 58px;
    flex-shrink: 0;
  }
  
  .logo h2 {
    font-size: 23px;
    font-weight: 700;
    margin: 0 0 4px;
    color: #ffffff;
  }
  
  .logo p {
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
  }
  
  .menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .menu button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 22px;
    padding: 15px 18px;
    color: #ffffff;
    background: transparent;
    border: none;
    border-radius: 12px;
    text-align: left;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  
  .menu button:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  
  .menu button.ativo {
    background: #2a67aa;
  }
  
  .mensagem-lateral {
    margin-top: auto;
    padding: 24px 12px 0;
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .ilustracao {
    width: 210px;
    max-width: 100%;
    margin-bottom: 10px;
  }
  
  .mensagem-lateral strong {
    display: block;
    margin-bottom: 8px;
    font-size: 15px;
  }
  
  .mensagem-lateral p {
    margin: 0;
  }
  
  /* CONTEÚDO */
  
  .conteudo {
    flex: 1;
    min-width: 0;
  }
  
  .cabecalho {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    min-height: 150px;
    padding: 26px 32px 22px;
    border-bottom: 1px solid #e1e9f4;
    background: rgba(255, 255, 255, 0.45);
  }
  
  .saudacao {
    font-size: 25px;
    font-weight: 700;
    margin: 0;
    color: #17315c;
  }
  
  .cabecalho h1 {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    color: #0c9b6e;
    font-size: clamp(2.2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.15;
  }
  
  .verificado {
    width: 32px;
    height: 32px;
    margin-top: 6px;
  }
  
  .subtitulo {
    color: #56739b;
    font-size: 17px;
    margin: 4px 0 0;
  }
  
  .perfil {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #56739b;
  }
  
  .notificacao {
    display: flex;
    margin-right: 24px;
    padding: 4px;
    background: transparent;
    border: none;
    color: #17315c;
    cursor: pointer;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #17457f;
    color: #ffffff;
    border-radius: 50%;
  }
  
  /* COLUNAS */
  
  .colunas {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) minmax(290px, 0.95fr);
    gap: 15px;
    padding: 18px 25px 28px;
    align-items: start;
  }
  
  .coluna-principal,
  .coluna-lateral {
    min-width: 0;
  }
  
  .painel-consulta,
  .cartao-etapas,
  .cartao-remarcacao {
    background: #ffffff;
    border: 1px solid #e1e9f4;
    border-radius: 14px;
  }
  
  .painel-consulta {
    padding: 21px;
  }
  
  .voltar {
    display: flex;
    align-items: center;
    gap: 12px;
    background: transparent;
    border: none;
    color: #17315c;
    font-weight: 700;
    font-size: 17px;
    margin: 0 0 21px;
    padding: 0;
    cursor: pointer;
  }
  
  .cartao-detalhes {
    background: #f4fbf8;
    border: 1px solid #d9eee6;
    border-radius: 13px;
    overflow: hidden;
  }
  
  .topo-detalhes {
    display: flex;
    align-items: center;
    gap: 13px;
    flex-wrap: wrap;
    padding: 20px 20px 0;
  }
  
  .icone-calendario {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 59px;
    height: 59px;
    color: #138253;
    background: #d9f3e7;
    border-radius: 50%;
  }
  
  .etiqueta {
    background: #e4f8f1;
    color: #21886d;
    padding: 9px 15px;
    border-radius: 25px;
    font-size: 13px;
  }
  
  .confirmada {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 9px;
    color: #16865e;
    background: #e1f7ed;
    border: 1px solid #8ad8b7;
    border-radius: 22px;
    padding: 7px 12px;
    font-weight: 700;
    font-size: 14px;
  }
  
  .check {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #16a17a;
    color: white;
  }
  
  .corpo-detalhes {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(190px, 0.9fr);
    gap: 18px;
    padding: 8px 20px 20px;
  }
  
  .dados-consulta h2 {
    font-size: 23px;
    margin: 0 0 7px;
    color: #17315c;
  }
  
  .dados-consulta h3 {
    font-size: 18px;
    margin: 0 0 5px;
    color: #193c6b;
  }
  
  .registro {
    color: #56739b;
    margin: 0 0 24px;
    font-size: 14px;
  }
  
  .dado {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    margin: 19px 0;
  }
  
  .dado-icone {
    flex-shrink: 0;
    color: #416995;
  }
  
  .dado strong {
    color: #395b84;
    font-size: 14px;
  }
  
  .dado p {
    margin: 5px 0 0;
    color: #193b68;
    font-size: 16px;
    font-weight: 600;
  }
  
  .dado small {
    display: block;
    margin-top: 7px;
    color: #56739b;
    line-height: 1.5;
    font-size: 12px;
  }
  
  .aviso-confirmacao {
    align-self: center;
    background: #edf5fc;
    border-radius: 12px;
    padding: 20px 15px;
    text-align: center;
  }
  
  .icone-prontuario {
    width: 58px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    border-radius: 50%;
    background: #dceafb;
    color: #3478b5;
  }
  
  .aviso-confirmacao h3 {
    font-size: 16px;
    line-height: 1.4;
    margin: 0 0 10px;
    color: #17315c;
  }
  
  .aviso-confirmacao p {
    color: #56739b;
    font-size: 13px;
    line-height: 1.8;
    margin: 0 0 17px;
  }
  
  .botao-contato {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: 1px solid #82b8f6;
    border-radius: 24px;
    padding: 11px 8px;
    color: #2872c6;
    background: #ffffff;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
  
  /* INFORMAÇÕES IMPORTANTES */
  
  .informacoes-importantes {
    padding: 19px 20px 20px;
    border-top: 1px solid #e6edf5;
    background: #ffffff;
  }
  
  .informacoes-importantes h3 {
    margin: 0 0 13px;
    font-size: 18px;
    color: #17315c;
  }
  
  .caixa-informacoes {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border-radius: 12px;
    background: #eef6fd;
  }
  
  .icone-info {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background: #3484e9;
    font-weight: 700;
    font-size: 19px;
  }
  
  .caixa-informacoes ul {
    padding-left: 18px;
    margin: 0;
    color: #49668b;
    font-size: 12px;
    line-height: 1.9;
  }
  
  /* REMARCAÇÃO */
  
  .cartao-remarcacao {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    margin-top: 13px;
  }
  
  .icone-remarcacao {
    width: 52px;
    height: 52px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eaf3ff;
    color: #3478c5;
    border-radius: 50%;
  }
  
  .texto-remarcacao {
    flex: 1;
  }
  
  .texto-remarcacao h3 {
    font-size: 15px;
    margin: 0 0 7px;
    color: #17315c;
  }
  
  .texto-remarcacao p {
    margin: 3px 0;
    font-size: 12px;
    color: #56739b;
    line-height: 1.5;
  }
  
  .botao-remarcar {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #91bdf2;
    background: #ffffff;
    color: #2872c6;
    border-radius: 25px;
    padding: 11px 17px;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
  
  /* PRÓXIMOS PASSOS */
  
  .cartao-etapas {
    padding: 24px 20px;
  }
  
  .cartao-etapas > h2 {
    font-size: 21px;
    margin: 0 0 32px;
    color: #17315c;
  }
  
  .etapas {
    position: relative;
  }
  
  .etapas::before {
    content: "";
    position: absolute;
    top: 16px;
    bottom: 52px;
    left: 12px;
    width: 2px;
    background: #c9d9e8;
  }
  
  .etapa {
    position: relative;
    display: flex;
    gap: 17px;
    min-height: 105px;
  }
  
  .etapa-marcador {
    z-index: 1;
    flex-shrink: 0;
    width: 23px;
    height: 23px;
    margin-top: 1px;
    border: 2px solid #8ba6c6;
    background: #ffffff;
    border-radius: 50%;
  }
  
  .etapa.concluida .etapa-marcador {
    width: 38px;
    height: 38px;
    margin-top: -6px;
    margin-left: -7px;
    border: none;
    background: #16a88b;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .etapa-texto {
    padding-bottom: 24px;
  }
  
  .etapa-texto h3 {
    font-size: 14px;
    color: #24466f;
    margin: 0 0 8px;
  }
  
  .etapa.concluida h3 {
    color: #16a184;
  }
  
  .etapa-texto strong {
    display: block;
    font-size: 13px;
    margin-bottom: 6px;
    color: #355780;
  }
  
  .etapa-texto p {
    color: #60799b;
    font-size: 12px;
    line-height: 1.7;
    margin: 0;
  }
  
  .etapa.ultima {
    min-height: 100px;
  }
  
  .mensagem-apoio {
    display: flex;
    align-items: center;
    gap: 15px;
    background: #eaf8f3;
    border-radius: 12px;
    padding: 18px 14px;
    margin-top: 3px;
  }
  
  .folha {
    flex-shrink: 0;
    color: #16a184;
  }
  
  .mensagem-apoio h3 {
    color: #246353;
    font-size: 14px;
    margin: 0 0 7px;
  }
  
  .mensagem-apoio p {
    color: #587c77;
    font-size: 12px;
    line-height: 1.6;
    margin: 0;
  }
  
  /* RESPONSIVIDADE */
  
  @media (max-width: 1200px) {
    .sidebar {
      width: 230px;
      min-width: 230px;
    }
  
    .colunas {
      grid-template-columns: minmax(0, 1fr);
    }
  
    .corpo-detalhes {
      grid-template-columns: minmax(0, 1.3fr) minmax(190px, 0.8fr);
    }
  }
  
  @media (max-width: 700px) {
    .dashboard {
      display: block;
    }
  
    .sidebar {
      width: 100%;
      min-width: 0;
      min-height: auto;
      padding: 16px;
    }
  
    .logo {
      padding-bottom: 16px;
    }
  
    .menu {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  
    .menu button {
      gap: 10px;
      padding: 12px 10px;
      font-size: 14px;
    }
  
    .mensagem-lateral {
      display: none;
    }
  
    .cabecalho {
      padding: 22px 18px;
    }
  
    .subtitulo {
      font-size: 14px;
      line-height: 1.5;
    }
  
    .notificacao {
      margin-right: 0;
    }
  
    .perfil {
      gap: 7px;
    }
  
    .avatar {
      width: 40px;
      height: 40px;
    }
  
    .colunas {
      padding: 12px;
    }
  
    .painel-consulta {
      padding: 14px;
    }
  
    .corpo-detalhes {
      grid-template-columns: 1fr;
    }
  
    .confirmada {
      margin-left: 0;
    }
  
    .cartao-remarcacao {
      flex-wrap: wrap;
    }
  
    .botao-remarcar {
      width: 100%;
      justify-content: center;
    }
  }
  </style>