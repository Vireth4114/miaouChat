<script setup>
import { ref } from "vue"
import router from "../router/main_router";
import supabase from "../api/supabase";

const email = ref()
const password = ref()
const errorSpan = ref()

async function logIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
    const { data2, error2 } = await supabase.from('profiles').update({username: "arthael", avatar_url: "https://cdn.discordapp.com/attachments/1050074461904322590/1214589401162584096/porcq.jpg?ex=65f9a987&is=65e73487&hm=3ffeddf093acec94975faac634f9d3dc0d7053584b52ef0611939263a7fd83ad&"}).eq("id", data["user"]["id"])
    console.log(data2)
    if (error == null) {
        router.push({ path: 'chat' })
    } else {
        password.value=""
        errorSpan.value.innerHTML = error.message
    }
}

</script>

<template>
    <div class="h-full flex flex-col justify-center items-center gap-5">
        <h1 class="text-white text-2xl text-center pt-5">Connexion</h1>
        <label class="label-conn gap-2 text-white text-right">
            Email:
            <input class="text-black p-1" type="text" placeholder="Email" v-model="email">
        </label>
        <label class="label-conn gap-2 text-white text-right">
            Password:
            <input class="text-black p-1" type="password" placeholder="password" v-model="password">
        </label>
        <span class='text-white' ref="errorSpan"></span>
        <button class="p-2 bg-[#c04000] text-white border-2 pl-5 pr-5 rounded-full" @click="logIn">Log in</button>
        <router-link class="text-blue-600 underline" to="/signup">Mais vous n'avez pas de compte ?</router-link>
    </div>
</template>

<style>
    .label-conn {
        display: grid;
        grid-template-columns: 1fr 3fr;
        width: 400px;
    }
</style>