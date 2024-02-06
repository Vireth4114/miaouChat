<script setup>
import { ref, watch } from 'vue';
const props = defineProps(["messages"])
const emit = defineEmits(["supprimer"])
const cont = ref(null)
const messages = props.messages


function modifier() {

}

function supprimer(index) {
    emit("supprimer", {indexToSend: index})
}

watch(messages, () => {
    const lastMessage = cont.value.lastElementChild;
    lastMessage.scrollIntoView();
})

</script>

<template>
    <div id="cont" ref="cont">
        <div id='message' v-for="(mess, index) in messages" :key="mess">
            <span>{{ mess }}</span>
            <div id="controlMessage">
                <button @click="modifier()">Modifier</button>
                <button @click="supprimer(index)"> Supprimer</button>
            </div>
        </div>
    </div>
</template>

<style>
    #cont {
        display: flex;
        flex-flow: column;
        color: white;
        padding: 20px;
        min-height: 90vh;
        max-height: 90vh;
        overflow-y: auto;
        scrollbar-width: thin;
        scroll-behavior: smooth;
    }
    
    #cont > :first-child {
        margin-top: auto;
    }

    #message {
        display: grid;
        grid-template-columns: 10fr 1fr;
    }

    #controlMessage {
        display: flex;
        gap: 10px;
    }
</style>