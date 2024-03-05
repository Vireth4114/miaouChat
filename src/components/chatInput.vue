<script setup>
import { ref, computed } from 'vue'
import CustomButton from '../views/customButton.vue'
import supabase from "../api/supabase";

const emit = defineEmits(["envoieMessage"])
const props = defineProps(["index"])
const message = ref("")
const index = props.index

async function envoieMessage(index) {
    if (message.value != "") {

        const { data, error } = await supabase.auth.getUser()
        await supabase.from('messages').insert({content: message.value, author_id: data["user"]["id"]})

        emit("envoieMessage", {messageToSend: message.value, index: index})
        message.value = ""
    }
}
</script>

<template>
    <section>
        <input @keyup.enter="envoieMessage(index)" type="text" placeholder="Damn les gens c'est thibald" class="rounded-md p-1 bg-transparent border-[#00000050] border-4 text-white" v-model="message">
        <CustomButton class="text-white" @click ="envoieMessage(index)"></CustomButton>
    </section>
</template>
