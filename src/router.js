import login from "./views/login.vue";
import board from "./views/board.vue";

import pagesIndex from "./views/pages/index.vue";
import pagesList from "./views/pages/list.vue";
import pagesModify from "./views/pages/modify.vue";

import category from "./views/category/index.vue";
import categoryList from "./views/category/list.vue";

import seo from "./views/seo/index.vue";
import seoList from "./views/seo/list.vue";

const routers = [
    {
        path: "/login",
        name: "login",
        component: login,
    },
    {
        path: "/board",
        name: "board",
        component: board,
        meta: {},
        children: [
            {
                path: "pages",
                name: "pages",
                component: pagesIndex,
                meta: {},
                children: [
                    {
                        path: "list",
                        name: "pages_list",
                        component: pagesList,
                        meta: {}
                    },
                    {
                        path: "add",
                        name: "pages_add",
                        component: pagesModify,
                        meta: {}
                    },
                    {
                        path: "edit",
                        name: "pages_edit",
                        component: pagesModify,
                        meta: {}
                    }
                ]
            },
            {
                path: "category",
                name: "category",
                component: category,
                meta: {},
                children: [
                    {
                        path: "list",
                        name: "category_list",
                        component: categoryList,
                        meta: {}
                    }
                ]
            },
            {
                path: "seo",
                name: "seo",
                component: seo,
                meta: {},
                children: [
                    {
                        path: "list",
                        name: "seo_list",
                        component: seoList,
                        meta: {}
                    }
                ]
            },
        ]
    },
    

    // 重定向
    { path: "*", redirect: "/board/pages/list" }
];
export default routers;