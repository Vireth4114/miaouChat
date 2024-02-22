import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../views/SignUpView.vue';
import LogInView from '../views/LogInView.vue';
import ChatView from "../views/ChatView.vue";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://odqsohqghuxdlysvodcb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcXNvaHFnaHV4ZGx5c3ZvZGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MDQ5MzYsImV4cCI6MjAyNDE4MDkzNn0.ucJGlhRE8Vx2kFjhfKQur5Pzmc5KfHQRekL-MYrxY1M')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: () => {
                return { name: 'login', params: { chatId: 'new' } };
            }
        },
        {
            path: '/chat',
            name: 'chat',
            meta: {
                protected: true
            },
            component: ChatView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpView
        },
        {
            path: '/login',
            name: 'login',
            component: LogInView
        }
    ]
});

async function isLoggedIn() {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
}

router.beforeEach(async (to, from) =>{

    if(to.meta.protected){
        const isLogged = await isLoggedIn()
        if(isLogged)
            return true
        else
            return "/login"
    }
})


export default router;