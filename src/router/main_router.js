import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../views/SignUpView.vue';
import LogInView from '../views/LogInView.vue';
import ChatView from "../views/ChatView.vue"
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

export default router;