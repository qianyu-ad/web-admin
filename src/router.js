import login from "./views/login.vue";
import board from "./views/board.vue";

import web from "./views/web/index.vue";

import site from "./views/web/site/index.vue";
import siteList from "./views/web/site/list.vue";

import category from "./views/web/category/index.vue";
import categoryList from "./views/web/category/list.vue";

import pagesIndex from "./views/web/pages/index.vue";
import pagesList from "./views/web/pages/list.vue";
import pagesModify from "./views/web/pages/modify.vue";

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
                path: "web",
                name: "web",
                component: web,
                meta: {},
                children: [
                    {
                        path: "pages",
                        name: "web_pages",
                        component: pagesIndex,
                        meta: {},
                        children: [
                            {
                                path: "list",
                                name: "web_pages_list",
                                component: pagesList,
                                meta: {}
                            },
                            {
                                path: "add",
                                name: "web_pages_add",
                                component: pagesModify,
                                meta: {}
                            },
                            {
                                path: "edit",
                                name: "web_pages_edit",
                                component: pagesModify,
                                meta: {}
                            }
                        ]
                    },
                    {
                        path: "site",
                        name: "web_site",
                        component: site,
                        meta: {},
                        children: [
                            {
                                path: "list",
                                name: "web_site_list",
                                component: siteList,
                                meta: {}
                            }
                        ]
                    },
                    {
                        path: "category",
                        name: "web_category",
                        component: category,
                        meta: {},
                        children: [
                            {
                                path: "list",
                                name: "web_category_list",
                                component: categoryList,
                                meta: {}
                            }
                        ]
                    },
                ]
            }
        ]
    },
    

    // 重定向
    { path: "*", redirect: "/board/web/site/list" }
];
export default routers;