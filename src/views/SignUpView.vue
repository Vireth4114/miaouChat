<script setup>
import { ref } from "vue"
import { createClient } from '@supabase/supabase-js'
import router from "../router/main_router";

const supabase = createClient('https://odqsohqghuxdlysvodcb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcXNvaHFnaHV4ZGx5c3ZvZGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MDQ5MzYsImV4cCI6MjAyNDE4MDkzNn0.ucJGlhRE8Vx2kFjhfKQur5Pzmc5KfHQRekL-MYrxY1M')
const email = ref()
const password = ref()
const errorSpan = ref()

async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    })
    if (error == null) {
        router.push({ path: 'chat' })
    } else {
        errorSpan.value.innerHTML = error.message
    }
}

</script>

<template>
    <div class="h-full flex flex-col justify-center items-center gap-5">      
        <h1 class="text-white text-2xl text-center pt-5">Inscription</h1>
        <label class="label-conn gap-2 text-white text-right">
            Email:
            <input class="text-black p-1" type="text" placeholder="Email" v-model="email">
        </label>
        <label class="label-conn gap-2 text-white text-right">
            Password:
            <input class="text-black p-1" type="password" placeholder="password" v-model="password">
        </label>
        <span class='text-white' ref="errorSpan"></span>
        <button class="p-2 bg-[#c04000] text-white border-2 pl-5 pr-5 rounded-full" @click="signUpNewUser">Sign up</button>
        <router-link class="text-blue-600 underline" to="/login">Mais vous avez un compte ?</router-link>
    </div>
</template>

<style>
    .label-conn {
        display: grid;
        grid-template-columns: 1fr 3fr;
        width: 400px;
    }
</style>