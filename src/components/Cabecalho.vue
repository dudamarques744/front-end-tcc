<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div class="container-fluid">
            <router-link to="/agenda" class="cartao cartao--agendar">
                <Icon icon="grommet-icons:system" width="34" height="34" />
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import { Icon } from "@iconify/vue"
</script>