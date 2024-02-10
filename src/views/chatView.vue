<script setup>
import { ref } from 'vue';
import ChatInput from '../components/chatInput.vue';
import ChatList from '../components/chatList.vue';
const listeDeMessages = ref([])

function ajoutMessage(payload) {
    listeDeMessages.value.push(payload.messageToSend)
}

function supprMessage(payload) {
    listeDeMessages.value.splice(payload.indexToSend, 1)
}

</script>

<template>
    <div>
        <ChatList :messages="listeDeMessages" @supprimer="supprMessage"  />
        <ChatInput class="chatInput" id="mainInput" @envoie-message="ajoutMessage" />
    </div>
</template>

<style>
    .chatInput {
        display: grid;
        grid-template-columns: 20fr 1fr;
        width: 100%;
    }
    
    #mainInput {
        height: 80px;
        position: absolute;
        bottom: 0;
        padding: 20px;
        background-color: #00000040;
    }
</style>