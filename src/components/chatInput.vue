<script setup>
import { ref, computed } from 'vue'
import CustomButton from '../views/customButton.vue'

const emit = defineEmits(["envoieMessage"])

const message = ref("")

function envoieMessage() {
    if (message.value != "") {
        emit("envoieMessage", {messageToSend: message.value})
    }
}
</script>

<template>
    <section id="chatInput">
        <input @keyup.enter="envoieMessage()" type="text" placeholder="Damn les gens c'est thibald" class="rounded-md p-1 bg-transparent border-[#00000050] border-4 text-white" v-model="message">
        <CustomButton class="text-white" @click ="envoieMessage()"></CustomButton>
    </section>
</template>

<style>
    #chatInput {
        position: absolute;
        display: grid;
        grid-template-columns: 20fr 1fr;
        width: 100%;
        bottom: 0;
        padding: 20px;
    }
</style>