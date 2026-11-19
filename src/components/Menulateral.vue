<script setup>
import { Icon } from '@iconify/vue'

// O texto do rodapé pode mudar de tela para tela (opcional)
defineProps({
  tituloRodape: { type: String, default: 'Você não está sozinho(a).' },
  textoRodape: { type: String, default: 'Aqui, sua saúde mental importa.' },
})

const menu = [
  { label: 'Painel', icon: 'mdi:home-outline', to: '/telaPrincipal' },
  { label: 'Consultas', icon: 'mdi:calendar-check-outline', to: '/consultas' },
  { label: 'Meu Plano', icon: 'mdi:file-document-outline', to: '/horarios' },
  { label: 'Histórico', icon: 'mdi:history', to: '/historico' },
  { label: 'Mensagens', icon: 'mdi:message-text-outline', to: '/mensagens' },
  { label: 'Pagamento', icon: 'mdi:wallet-outline', to: '/formularioPagamento' },
]
</script>

<template>
  <aside class="sidebar">
    <div class="brand">
      <Icon icon="mdi:head-heart-outline" class="brand-icon" />
      <div>
        <strong>Saúde Mental</strong>
        <small>Cuidar também é<br />um ato de força</small>
      </div>
    </div>

    <nav class="menu">
      <router-link
        v-for="item in menu"
        :key="item.label"
        :to="item.to"
        class="menu-item"
        active-class="ativo"
      >
        <Icon :icon="item.icon" class="menu-icon" />
        <span>{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="avatar-ilustracao">
        <Icon icon="mdi:account-heart" />
      </div>
      <strong>{{ tituloRodape }}</strong>
      <p>{{ textoRodape }}</p>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 275px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #1a4aa3 0%, #0f2f6b 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 4px 24px;
}
.brand { display: flex; align-items: center; gap: 12px; padding: 0 16px 28px; }
.brand-icon { font-size: 54px; flex-shrink: 0; }
.brand strong { display: block; font-size: 22px; }
.brand small { font-size: 13px; line-height: 1.25; opacity: 0.9; }

.menu { display: flex; flex-direction: column; gap: 4px; padding: 0 4px; }
.menu-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  border-radius: 10px;
  color: #fff;
  text-decoration: none;
  font-size: 17px;
  transition: background 0.2s;
}
.menu-item:hover { background: rgba(255, 255, 255, 0.1); }
.menu-item.ativo { background: #2f62c9; }
.menu-icon { font-size: 28px; }

.sidebar-footer { margin-top: auto; text-align: center; padding: 0 24px; }
.avatar-ilustracao { font-size: 120px; line-height: 1; color: #8fb4ff; }
.sidebar-footer strong { display: block; font-size: 16px; margin-top: 8px; }
.sidebar-footer p { margin: 6px 0 0; font-size: 14px; }

@media (max-width: 800px) {
  .sidebar { width: 100%; padding-bottom: 12px; }
  .sidebar-footer { display: none; }
  .menu { flex-direction: row; overflow-x: auto; }
  .menu-item { padding: 12px 14px; font-size: 15px; gap: 8px; white-space: nowrap; }
}
</style>