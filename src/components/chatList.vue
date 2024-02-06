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
        <p v-for="(mess, index) in messages" :key="mess">
            {{ mess }}
            <button @click="modifier()">Modifier</button>
            <button @click="supprimer(index)"> Supprimer</button>
        </p>
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
</style>