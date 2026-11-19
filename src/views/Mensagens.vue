```vue
<template>
  <div class="mensagens-app">

    <!-- MENU LATERAL -->
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-icon">♡</span>
        <div>
          <h2>Saúde Mental</h2>
          <p>Cuidar também é<br />um ato de força</p>
        </div>
      </div>

      <nav>
        <router-link to="/painel">⌂ <span>Painel</span></router-link>
        <router-link to="/consulta">▣ <span>Consultas</span></router-link>
        <router-link to="/horarios">▤ <span>Meu Plano</span></router-link>
        <router-link to="/historico">◷ <span>Histórico</span></router-link>
        <router-link to="/mensagens" class="ativo">▣ <span>Mensagens</span></router-link>
        <router-link to="/configuracoes">⚙ <span>Configurações</span></router-link>
      </nav>

      <div class="apoio">
        <div class="ilustracao">🌿</div>
        <h3>Você não está<br />sozinho(a).</h3>
        <p>Aqui, sua saúde mental importa.</p>
      </div>
    </aside>

    <!-- ÁREA PRINCIPAL -->
    <main class="conteudo">
      <header class="topo">
        <div>
          <h1>Mensagens</h1>
          <p>Converse com sua psicóloga de forma segura e privada.</p>
        </div>
        <div class="perfil">🔔　👤⌄</div>
      </header>

      <section class="painel-mensagens">

        <!-- LISTA DE CONVERSAS -->
        <aside class="lista-conversas">
          <input
            v-model="busca"
            class="pesquisa"
            placeholder="🔎  Buscar na conversa..."
          />

          <button
            v-for="(contato, index) in conversasFiltradas"
            :key="contato.id"
            class="contato"
            :class="{ selecionado: conversaAtiva.id === contato.id }"
            @click="selecionarConversa(contato)"
          >
            <div class="avatar" :style="{ background: contato.cor }">
              {{ contato.iniciais }}
            </div>

            <div class="dados-contato">
              <strong>{{ contato.nome }}</strong>
              <small>{{ contato.tipo }}</small>
              <p>{{ contato.resumo }}</p>
            </div>

            <span class="horario">{{ contato.horario }}</span>
          </button>
        </aside>

        <!-- CONVERSA ABERTA -->
        <section class="chat">
          <header class="chat-topo">
            <div class="avatar foto-psicologa">T</div>
            <div>
              <h3>{{ conversaAtiva.nome }}</h3>
              <p>{{ conversaAtiva.tipo }} · Atendimento psicológico</p>
            </div>
            <span class="online">● Online</span>
          </header>

          <div class="mensagens" ref="listaMensagens">
            <div
              v-for="mensagem in conversaAtiva.mensagens"
              :key="mensagem.id"
              class="linha-mensagem"
              :class="mensagem.remetente === 'voce' ? 'direita' : 'esquerda'"
            >
              <div class="balao">
                <p>{{ mensagem.texto }}</p>
                <small>{{ mensagem.horario }}</small>
              </div>
            </div>
          </div>

          <form class="campo-mensagem" @submit.prevent="enviarMensagem">
            <input
              v-model="novaMensagem"
              placeholder="Digite sua mensagem..."
              aria-label="Digite sua mensagem"
            />
            <button type="submit" :disabled="!novaMensagem.trim()">
              ➤
            </button>
          </form>
        </section>

      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";

const busca = ref("");
const novaMensagem = ref("");
const listaMensagens = ref(null);

const conversas = ref([
  {
    id: 1,
    nome: "Dra. Talita Berjas Favore",
    tipo: "Psicóloga",
    iniciais: "T",
    cor: "#dcecff",
    horario: "10:24",
    resumo: "Que bom que você conseguiu!",
    mensagens: [
      {
        id: 1,
        remetente: "outro",
        texto: "Olá, Ana! 😊 Como você está se sentindo hoje?",
        horario: "10:15"
      },
      {
        id: 2,
        remetente: "voce",
        texto: "Olá, doutora! Hoje estou me sentindo melhor e consegui organizar minha rotina.",
        horario: "10:17"
      },
      {
        id: 3,
        remetente: "outro",
        texto: "Que bom saber disso, Ana! Como foi colocar em prática o que conversamos na última sessão?",
        horario: "10:20"
      },
      {
        id: 4,
        remetente: "voce",
        texto: "Foi muito bom! Tentei fazer as atividades com mais calma. 💙",
        horario: "10:22"
      },
      {
        id: 5,
        remetente: "outro",
        texto: "Fico feliz em saber! Continue respeitando seu tempo. Cada pequeno passo é importante. 💚",
        horario: "10:24"
      }
    ]
  },
  {
    id: 2,
    nome: "Ana Carolina",
    tipo: "Paciente",
    iniciais: "AC",
    cor: "#dcecff",
    horario: "Ontem",
    resumo: "Obrigada pela orientação!",
    mensagens: [
      {
        id: 1,
        remetente: "outro",
        texto: "Olá! Gostaria de saber como foi sua semana.",
        horario: "15:10"
      },
      {
        id: 2,
        remetente: "voce",
        texto: "Foi tranquila, consegui descansar um pouco mais.",
        horario: "15:15"
      },
      {
        id: 3,
        remetente: "outro",
        texto: "Que bom! Obrigada pela orientação!",
        horario: "15:20"
      }
    ]
  },
  {
    id: 3,
    nome: "Rafael Costa",
    tipo: "Paciente",
    iniciais: "RC",
    cor: "#dcecff",
    horario: "Ontem",
    resumo: "Vou tentar fazer isso hoje.",
    mensagens: [
      {
        id: 1,
        remetente: "outro",
        texto: "Vou tentar colocar as orientações em prática hoje.",
        horario: "16:30"
      },
      {
        id: 2,
        remetente: "voce",
        texto: "Ótimo! Faça no seu ritmo e observe como você se sente.",
        horario: "16:35"
      }
    ]
  },
  {
    id: 4,
    nome: "Lucas Pereira",
    tipo: "Paciente",
    iniciais: "LP",
    cor: "#d4f5eb",
    horario: "Qua",
    resumo: "Entendi. Vou seguir suas orientações.",
    mensagens: [
      {
        id: 1,
        remetente: "outro",
        texto: "Entendi. Vou seguir suas orientações.",
        horario: "11:40"
      },
      {
        id: 2,
        remetente: "voce",
        texto: "Tudo bem, Lucas. Conversaremos melhor na próxima sessão.",
        horario: "11:45"
      }
    ]
  },
  {
    id: 5,
    nome: "Mariana Torres",
    tipo: "Paciente",
    iniciais: "MT",
    cor: "#e9ddff",
    horario: "Ter",
    resumo: "Até mais, doutora!",
    mensagens: [
      {
        id: 1,
        remetente: "outro",
        texto: "Obrigada pela conversa de hoje. Até mais, doutora!",
        horario: "14:00"
      },
      {
        id: 2,
        remetente: "voce",
        texto: "Até a próxima, Mariana! Cuide-se.",
        horario: "14:05"
      }
    ]
  },
  {
    id: 6,
    nome: "Juliana Silva",
    tipo: "Paciente",
    iniciais: "JS",
    cor: "#ffdce5",
    horario: "Seg",
    resumo: "Tudo bem, obrigada!",
    mensagens: [
      {
        id: 1,
        remetente: "outro",
        texto: "Como você está hoje, Juliana?",
        horario: "09:00"
      },
      {
        id: 2,
        remetente: "voce",
        texto: "Estou bem, obrigada! Até nossa próxima consulta.",
        horario: "09:05"
      }
    ]
  }
]);

const conversaAtiva = ref(conversas.value[0]);

const conversasFiltradas = computed(() => {
  const termo = busca.value.toLowerCase();

  return conversas.value.filter((contato) =>
    contato.nome.toLowerCase().includes(termo) ||
    contato.resumo.toLowerCase().includes(termo)
  );
});

function selecionarConversa(contato) {
  conversaAtiva.value = contato;
}

async function enviarMensagem() {
  const texto = novaMensagem.value.trim();

  if (!texto) return;

  conversaAtiva.value.mensagens.push({
    id: Date.now(),
    remetente: "voce",
    texto,
    horario: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  conversaAtiva.value.resumo = texto;
  conversaAtiva.value.horario = "Agora";
  novaMensagem.value = "";

  await nextTick();

  if (listaMensagens.value) {
    listaMensagens.value.scrollTop =
      listaMensagens.value.scrollHeight;
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.mensagens-app {
  display: flex;
  min-height: 100vh;
  background: #f3f8fd;
  color: #173b6c;
  font-family: Arial, sans-serif;
}

/* MENU */
.sidebar {
  width: 275px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #10365c, #092847);
  color: white;
  padding: 30px 12px;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 10px;
  margin-bottom: 40px;
}

.logo-icon {
  font-size: 48px;
}

.logo h2 {
  font-size: 21px;
  margin: 0 0 6px;
}

.logo p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar nav a {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  font-size: 17px;
}

.sidebar nav a.ativo,
.sidebar nav a:hover {
  background: #2871bd;
}

.sidebar nav a:first-letter {
  font-size: 23px;
}

.apoio {
  text-align: center;
  margin-top: auto;
  padding: 35px 12px 10px;
}

.ilustracao {
  font-size: 70px;
  margin-bottom: 10px;
}

.apoio h3 {
  line-height: 1.4;
}

.apoio p {
  line-height: 1.5;
  font-size: 15px;
}

/* CONTEÚDO */
.conteudo {
  flex: 1;
  min-width: 0;
  padding: 25px 16px;
}

.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 20px;
}

.topo h1 {
  margin: 0 0 4px;
  font-size: 28px;
}

.topo p {
  margin: 0;
  color: #58749b;
}

.perfil {
  font-size: 27px;
}

/* PAINEL */
.painel-mensagens {
  display: grid;
  grid-template-columns: 420px minmax(0, 1fr);
  min-height: 85vh;
  background: white;
  border: 1px solid #dbe9f8;
  border-radius: 16px;
  overflow: hidden;
}

/* CONVERSAS */
.lista-conversas {
  padding: 15px;
  border-right: 1px solid #dbe9f8;
}

.pesquisa {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #eef5fc;
  color: #173b6c;
  font-size: 14px;
  outline-color: #438ee3;
  margin-bottom: 15px;
}

.contato {
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  text-align: left;
  padding: 15px 10px;
  border: none;
  border-bottom: 1px solid #e3edf7;
  background: white;
  cursor: pointer;
  color: #173b6c;
  position: relative;
}

.contato.selecionado {
  background: #e1f0ff;
  border-radius: 12px;
}

.avatar {
  width: 56px;
  height: 56px;
  min-width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #2875cb;
  font-size: 20px;
  font-weight: bold;
}

.dados-contato {
  min-width: 0;
  padding-right: 38px;
}

.dados-contato strong,
.dados-contato small,
.dados-contato p {
  display: block;
}

.dados-contato strong {
  font-size: 15px;
  margin: 3px 0 7px;
}

.dados-contato small,
.dados-contato p,
.horario {
  color: #58749b;
  font-size: 13px;
}

.dados-contato p {
  margin: 6px 0 0;
  line-height: 1.5;
}

.horario {
  position: absolute;
  right: 8px;
  top: 18px;
}

/* CHAT */
.chat {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.chat-topo {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 17px 20px;
  border-bottom: 1px solid #e0ebf7;
}

.foto-psicologa {
  background: #d9eaff;
}

.chat-topo h3 {
  margin: 0 0 6px;
  font-size: 17px;
}

.chat-topo p {
  margin: 0;
  font-size: 13px;
  color: #58749b;
}

.online {
  margin-left: auto;
  color: #159a72;
  font-size: 12px;
}

.mensagens {
  flex: 1;
  min-height: 350px;
  max-height: 650px;
  overflow-y: auto;
  padding: 20px;
  background: #f8fbff;
}

.linha-mensagem {
  display: flex;
  margin-bottom: 14px;
}

.linha-mensagem.direita {
  justify-content: flex-end;
}

.balao {
  max-width: 78%;
  padding: 12px 16px 8px;
  border-radius: 15px;
  background: #e9f1fb;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.direita .balao {
  background: #dceeff;
}

.balao p {
  margin: 0 0 5px;
  font-size: 14px;
}

.balao small {
  display: block;
  text-align: right;
  color: #6684ab;
  font-size: 11px;
}

/* CAMPO DE ENVIO */
.campo-mensagem {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  margin: 10px 16px 16px;
  border: 1px solid #cfe3fa;
  border-radius: 15px;
  background: white;
}

.campo-mensagem input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  color: #173b6c;
  font-size: 14px;
}

.campo-mensagem button {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: #3183e8;
  color: white;
  font-size: 23px;
  cursor: pointer;
}

.campo-mensagem button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* CELULAR */
@media (max-width: 1000px) {
  .sidebar {
    width: 190px;
  }

  .painel-mensagens {
    grid-template-columns: 300px minmax(0, 1fr);
  }

  .logo h2 {
    font-size: 17px;
  }
}

@media (max-width: 700px) {
  .sidebar {
    width: 75px;
    padding: 15px 8px;
  }

  .logo {
    justify-content: center;
    padding: 0;
  }

  .logo-icon {
    font-size: 35px;
  }

  .logo div,
  .sidebar nav a span,
  .apoio {
    display: none;
  }

  .sidebar nav a {
    justify-content: center;
    padding: 14px 5px;
    font-size: 23px;
  }

  .conteudo {
    padding: 12px 8px;
  }

  .topo p {
    font-size: 12px;
  }

  .painel-mensagens {
    grid-template-columns: 1fr;
  }

  .lista-conversas {
    border-right: none;
    border-bottom: 1px solid #dbe9f8;
    max-height: 270px;
    overflow-y: auto;
  }

  .chat {
    min-height: 550px;
  }

  .balao {
    max-width: 90%;
  }
}
</style>
```