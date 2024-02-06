<script setup>
import { ref } from 'vue';
import ChatInput from '../components/chatInput.vue';
import ChatList from '../components/chatList.vue';
const listeDeMessages = ref(["feyr"])

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
        <ChatInput @envoie-message="ajoutMessage" />
    </div>
</template>