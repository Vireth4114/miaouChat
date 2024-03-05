<script setup>
import { ref } from 'vue';
import ChatInput from '../components/chatInput.vue';
import ChatList from '../components/chatList.vue';
import supabase from '../api/supabase'


const listeDeMessages = ref([])

async function helpme() {
    const { data, error } = await supabase.from('messages').select("id, content, profiles (avatar_url)")
    console.log(data)
    listeDeMessages.value.length = 0
    for (let i = 0; i < data.length; i++) {
        let avatar = data[i]["profiles"]["avatar_url"];
        if (avatar == null) {
            avatar = "https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
        }
        listeDeMessages.value.push([avatar, data[i]["content"], data[i]["id"]])
    }
}

setInterval(() => {
    helpme()
}, 1000);

async function logOut() {
    const { error } = await supabase.auth.signOut()
    router.push({ path: 'login' })
}

function ajoutMessage(payload) {
    listeDeMessages.value.push(payload.messageToSend)
}

function supprMessage(payload) {
    listeDeMessages.value.splice(payload.indexToSend, 1)
}

</script>

<template>
    <div>
        <button class='text-white absolute right-0 p-3 bg-[#000000C0]' @click="logOut">Déconnexion</button>
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