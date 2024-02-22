<script setup>
import { ref } from "vue"
import router from "../router/main_router";
import supabase from "../api/supabase";

const email = ref()
const password = ref()

async function logIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
    console.log(data)
    console.log(error)
    if (error == null) {
        router.push({ path: 'chat' })
    } else {
        password.value=""
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