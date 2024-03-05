<script setup>
import { ref, watch } from 'vue';
import ChatInput from './chatInput.vue';
import supabase from "../api/supabase";

const props = defineProps(["messages"])
const emit = defineEmits(["supprimer"])
const cont = ref(null)
const messages = props.messages
let selected = null

function modifier(index) {
    if (selected != null) {
        antiModif(selected)
    }
    const message = cont.value.children.item(index)
    message.firstElementChild.style.display = "none"
    const modifInput = message.lastElementChild
    modifInput.classList.add("chatInput")
    modifInput.firstElementChild.value = messages[index]
    modifInput.firstElementChild.focus()
    selected = index
}

function antiModif(index) {
    const message = cont.value.children.item(index)
    message.firstElementChild.style.display = "grid"
    message.lastElementChild.classList = "hidden"
    selected = null
}

function valideModif(payload) {
    antiModif(payload.index)
    messages[payload.index] = payload.messageToSend
}

async function supprimer(index) {
    await supabase.from('messages').delete().eq('id', index)
}

watch(messages, async () => {
    const lastMessage = cont.value.lastElementChild;
    if (lastMessage != null) {
        setTimeout(() => lastMessage.scrollIntoView());
    }
})

</script>

<template>
    <div id="cont" ref="cont">
        <div v-for="(mess, index) in messages" :key="mess">
            <div class='pt-3' id="message">
                <img id='imageMessage' :src=mess[0]>
                <span>{{ mess[1] }}</span>
                <div id="controlMessage">
                    <button @click="modifier(index)"><em class="fa-solid fa-pencil"></em></button>
                    <button @click="supprimer(mess[2])"><em class="fa-solid fa-trash"></em></button>
                </div>
            </div>
            <ChatInput @keyup.escape="antiModif(index)" class='hidden' :index=index @envoie-message="valideModif"/>
        </div>
    </div>
</template>

<style>
    #imageMessage {
        max-width: 10vw;
        max-height: 10vw;
        width: 50px;
        height: 50px;
        border-radius: 100px;
    }

    #cont {
        display: flex;
        flex-flow: column;
        color: white;
        padding: 20px;
        height: calc(100vh - 80px);
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    ::-webkit-scrollbar {
        background-color: #00000040;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #00000080;
        border-radius: 100px;
    }
    
    #cont > :first-child {
        margin-top: auto;
    }

    #message {
        word-break: break-all;
        display: grid;
        grid-template-columns: 1fr 20fr 1fr;
    }

    #message span {
        display: flex;
        align-items: center;
    }

    #controlMessage {
        display: flex;
        gap: 10px;
        display: flex;
        justify-content: end;
    }
</style>