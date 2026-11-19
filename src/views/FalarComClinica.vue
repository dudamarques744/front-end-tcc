
<template>
    <div class="pagina-chat">
      <div class="fundo-decorativo">
        <div class="mancha-verde"></div>
        <div class="mancha-dourada"></div>
      </div>
  
      <main class="chat-container">
        <!-- Cabeçalho -->
        <header class="chat-cabecalho">
          <button class="botao-voltar" @click="voltar">
            ← Voltar
          </button>
  
          <div class="clinica-info">
            <div class="icone-clinica">✚</div>
            <div>
              <h1>Falar com a clínica</h1>
              <p>Clínica Bem-Estar</p>
            </div>
          </div>
  
          <span class="status-clinica">
            <span class="bolinha"></span>
            Atendimento
          </span>
        </header>
  
        <!-- Área das mensagens -->
        <section class="area-mensagens" ref="areaMensagens">
          <div class="aviso">
            <span>🔒</span>
            <p>
              Este espaço é destinado à comunicação com a clínica.
              Não utilize o chat para situações de emergência.
            </p>
          </div>
  
          <div class="data-mensagens">Conversa com a clínica</div>
  
          <div
            v-for="(mensagem, indice) in mensagens"
            :key="indice"
            class="linha-mensagem"
            :class="mensagem.remetente === 'paciente'
              ? 'mensagem-direita'
              : 'mensagem-esquerda'"
          >
            <div class="mensagem">
              <span class="nome-remetente">
                {{ mensagem.remetente === 'paciente'
                  ? 'Você'
                  : 'Clínica Bem-Estar' }}
              </span>
  
              <p>{{ mensagem.texto }}</p>
  
              <span class="hora">{{ mensagem.hora }}</span>
            </div>
          </div>
  
          <div v-if="mensagens.length === 0" class="mensagens-vazias">
            <span>💬</span>
            <p>Envie uma mensagem para iniciar a conversa.</p>
          </div>
        </section>
  
        <!-- Campo de envio -->
        <form class="formulario-mensagem" @submit.prevent="enviarMensagem">
          <input
            v-model="novaMensagem"
            type="text"
            placeholder="Digite sua mensagem..."
            aria-label="Digite sua mensagem"
            maxlength="1000"
          />
  
          <button
            type="submit"
            class="botao-enviar"
            :disabled="!novaMensagem.trim()"
          >
            Enviar ➤
          </button>
        </form>
  
        <footer class="chat-rodape">
          Clínica Bem-Estar · Atendimento psicológico
        </footer>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "FalarComClinica",
  
    data() {
      return {
        novaMensagem: "",
        mensagens: [
          {
            remetente: "clinica",
            texto: "Olá! Seja bem-vindo(a) à Clínica Bem-Estar. Como podemos ajudar?",
            hora: new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit"
            })
          }
        ]
      };
    },
  
    methods: {
      enviarMensagem() {
        const texto = this.novaMensagem.trim();
  
        if (!texto) return;
  
        this.mensagens.push({
          remetente: "paciente",
          texto,
          hora: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
          })
        });
  
        this.novaMensagem = "";
  
        this.$nextTick(() => {
          const area = this.$refs.areaMensagens;
  
          if (area) {
            area.scrollTop = area.scrollHeight;
          }
        });
      },
  
      voltar() {
        this.$router.back();
      }
    }
  };
  </script>
  
  <style scoped>
  .pagina-chat {
    min-height: 100vh;
    padding: 30px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(160deg, #f6f3ec, #eef1ea, #e6ede8);
    font-family: "Segoe UI", Arial, sans-serif;
    color: #233b35;
  }
  
  .fundo-decorativo {
    position: fixed;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  
  .mancha-verde,
  .mancha-dourada {
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.18;
  }
  
  .mancha-verde {
    background: #2f5d54;
    top: -150px;
    left: -100px;
  }
  
  .mancha-dourada {
    background: #c99a4b;
    bottom: -150px;
    right: -100px;
  }
  
  .chat-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 850px;
    height: min(760px, calc(100vh - 60px));
    min-height: 480px;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 35px rgba(35, 59, 53, 0.12);
    border-top: 4px solid #2f5d54;
  }
  
  .chat-cabecalho {
    padding: 20px 24px;
    border-bottom: 1px solid #e8eee9;
  }
  
  .botao-voltar {
    border: none;
    background: transparent;
    color: #2f5d54;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 18px;
  }
  
  .clinica-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .icone-clinica {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #e2f2eb;
    color: #2f5d54;
    font-size: 25px;
  }
  
  .clinica-info h1 {
    font-size: 22px;
    margin: 0 0 5px;
  }
  
  .clinica-info p {
    margin: 0;
    color: #777f79;
    font-size: 14px;
  }
  
  .status-clinica {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: 14px;
    font-size: 12px;
    color: #2f5d54;
  }
  
  .bolinha {
    width: 8px;
    height: 8px;
    background: #16a078;
    border-radius: 50%;
  }
  
  .area-mensagens {
    flex: 1;
    overflow-y: auto;
    padding: 22px;
    background: #fcfdfb;
  }
  
  .aviso {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px;
    border-radius: 10px;
    background: #edf5f0;
    color: #49665a;
    font-size: 12px;
    line-height: 1.6;
  }
  
  .aviso p {
    margin: 0;
  }
  
  .data-mensagens {
    text-align: center;
    color: #929a94;
    font-size: 12px;
    margin: 22px 0;
  }
  
  .linha-mensagem {
    display: flex;
    margin-bottom: 16px;
  }
  
  .mensagem-esquerda {
    justify-content: flex-start;
  }
  
  .mensagem-direita {
    justify-content: flex-end;
  }
  
  .mensagem {
    max-width: 78%;
    padding: 12px 15px 9px;
    border-radius: 12px;
    overflow-wrap: anywhere;
  }
  
  .mensagem-esquerda .mensagem {
    background: #edf3ee;
    border-bottom-left-radius: 3px;
  }
  
  .mensagem-direita .mensagem {
    background: #2f5d54;
    color: #fff;
    border-bottom-right-radius: 3px;
  }
  
  .nome-remetente {
    font-size: 11px;
    font-weight: 700;
    opacity: 0.8;
  }
  
  .mensagem p {
    margin: 7px 0;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
  }
  
  .hora {
    display: block;
    text-align: right;
    font-size: 10px;
    opacity: 0.7;
  }
  
  .mensagens-vazias {
    text-align: center;
    color: #7d8981;
    padding: 30px 10px;
  }
  
  .mensagens-vazias span {
    font-size: 30px;
  }
  
  .formulario-mensagem {
    display: flex;
    gap: 10px;
    padding: 16px 20px;
    border-top: 1px solid #e8eee9;
    background: #fff;
  }
  
  .formulario-mensagem input {
    flex: 1;
    min-width: 0;
    border: 1px solid #dce5de;
    border-radius: 25px;
    padding: 13px 17px;
    outline: none;
    font-size: 14px;
  }
  
  .formulario-mensagem input:focus {
    border-color: #2f5d54;
    box-shadow: 0 0 0 2px rgba(47, 93, 84, 0.1);
  }
  
  .botao-enviar {
    border: none;
    border-radius: 25px;
    background: #2f5d54;
    color: #fff;
    padding: 0 22px;
    font-weight: 600;
    cursor: pointer;
  }
  
  .botao-enviar:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .chat-rodape {
    padding: 10px;
    text-align: center;
    background: #fff;
    color: #8a928c;
    font-size: 11px;
    border-top: 1px solid #f0f2ef;
  }
  
  @media (max-width: 600px) {
    .pagina-chat {
      padding: 0;
    }
  
    .chat-container {
      height: 100vh;
      min-height: 0;
      border-radius: 0;
    }
  
    .chat-cabecalho {
      padding: 16px;
    }
  
    .area-mensagens {
      padding: 15px;
    }
  
    .formulario-mensagem {
      padding: 12px;
    }
  
    .botao-enviar {
      padding: 0 14px;
    }
  }
  </style>
  