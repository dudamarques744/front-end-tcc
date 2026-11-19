<template>
    <nav class="menu-topo">
      <button type="button" class="item-voltar" @click="voltar">
  <span class="seta">←</span>
  <span>Voltar para o Login</span>
</button>
  
      <div class="itens-menu">
        <router-link to="/paciente" class="item-menu">Paciente</router-link>
        
        <router-link to="/horarios" class="item-menu">Horários disponíveis</router-link>
        <router-link to="/agendar" class="item-menu">Agendar consulta</router-link>
        <router-link to="/pagamento" class="item-menu">Forma de pagamento</router-link>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  function voltar() {
    router.back();
  }
  </script>
  
  <style scoped>
  .menu-topo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 14px 24px;
    background-color: #1f3d34;
  }
  
  .item-voltar {
  width: 245px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background: transparent;
  border: 2px solid #dce8ff;
  border-radius: 40px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.item-voltar:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.seta {
  font-size: 27px;
  line-height: 1;
}
  
  .item-voltar:hover {
    background-color: #2e7d32;
  }
  
  .itens-menu {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .item-menu {
    color: #fff;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .item-menu:hover,
  .item-menu.router-link-active {
    background-color: #2e7d32;
  }
  </style>