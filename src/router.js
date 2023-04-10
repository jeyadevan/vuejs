import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path:'/',
        alias: '/tutorials',
        name: 'tutorials-list',
        component: () => import("./components/TutorialsList")
    },
    {
        path:'/tutorials/:id',
        name:'tutorial-main',
        component: () => import("./components/TutorialMain"),
    },
    {
        path:'/add',
        name:'add-tutorial',
        component: () => import("./components/AddTutorial"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;