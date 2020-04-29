import Vue from 'vue'
import VueRouter from 'vue-router'
import Enter from "../components/Enter"
import Navigation from "../components/Navigation"
import Home from "../components/Home"
import Notes from "../components/Notes"
import Todo from "../components/Todo"
import Shopping from "../components/Shopping"



Vue.use(VueRouter);

const routes = [
    // {
    //     path: "/",
    //     name: "Enter",
    //     component: Enter
    // },
    {
        path: "/enter",
        name: "Enter",
        component: Enter
    },
    {
        path: '/navigation',
        name: 'Navigation',
        component: Navigation
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/notes',
        name: 'Notes',
        component: Notes
    },
    {
        path: '/todo',
        name: 'Todo',
        component: Todo
    },
    {
        path: '/shopping',
        name: 'Shopping',
        component: Shopping
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router