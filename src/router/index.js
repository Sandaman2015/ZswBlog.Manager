import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'ZswBlog后台管理',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'ZswBlog后台管理',
        // icon: 'dashboard'
      }
    }]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    meta: {
      title: '人员管理',
      icon: 'el-icon-user'
    },
    children: [{
      path: 'user-action',
      name: 'user-action',
      component: () => import('@/views/user/user-action'),
      meta: {
        title: '操作记录',
        icon: 'el-icon-mouse'
      }
    }]
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    children: [{
        path: 'announcement-list',
        name: 'announcement-list',
        component: () => import('@/views/system/announcement-list'),
        meta: {
          title: '通知公告',
          icon: 'el-icon-monitor'
        }
      }, {
        path: 'index-manage',
        name: 'index-manage',
        component: () => import('@/views/system/index-manage'),
        meta: {
          title: '首页视频配置',
          icon: 'el-icon-star-off'
        }
      },
      {
        path: 'banner-manage',
        name: 'banner-manage',
        component: () => import('@/views/system/banner-manage'),
        meta: {
          title: '详情Bannner',
          icon: 'el-icon-picture-outline-round'
        }
      },
      {
        path: 'illustration-manage',
        name: 'illustration-manage',
        component: () => import('@/views/system/illustration-manage'),
        meta: {
          title: '插图管理',
          icon: 'el-icon-picture-outline-round'
        }
      },
      {
        path: 'file-manage',
        name: 'file-manage',
        component: () => import('@/views/system/file-manage'),
        meta: {
          title: '文件管理',
          icon: 'el-icon-files'
        }
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    component: Layout,
    meta: {
      title: '文章管理',
      icon: 'el-icon-tickets'
    },
    children: [{
        path: 'article-list',
        name: 'article-list',
        component: () => import('@/views/article/article-list'),
        meta: {
          title: '文章列表',
          icon: 'el-icon-document'
        }
      },
      {
        path: 'article-save',
        name: 'article-save',
        component: () => import('@/views/article/article-save'),
        meta: {
          title: '添加文章',
          icon: 'el-icon-edit'
        }
      }
    ]
  },
  {
    path: '/category',
    name: 'category',
    component: Layout,
    meta: {
      title: '分类管理',
      icon: 'el-icon-s-data'
    },
    children: [{
      path: 'category-list',
      name: 'category-list',
      component: () => import('@/views/category/category-list'),
      meta: {
        title: '分类列表',
        icon: 'el-icon-s-data'
      }
    }]
  },
  {
    path: '/tag',
    name: 'tag',
    component: Layout,
    meta: {
      title: '标签管理',
      icon: 'el-icon-collection-tag'
    },
    children: [{
      path: 'tag-list',
      name: 'tag-list',
      component: () => import('@/views/tags/tag-list'),
      meta: {
        title: '标签列表',
        icon: 'el-icon-collection-tag'
      }
    }]
  },
  {
    path: '/message',
    name: 'message',
    component: Layout,
    meta: {
      title: '留言/评论',
      icon: 'el-icon-message'
    },
    children: [{
        path: 'message-list',
        name: 'message-list',
        component: () => import('@/views/message/message-list'),
        meta: {
          title: '留言列表',
          icon: 'el-icon-chat-square'
        }
      },
      {
        path: 'comment-list',
        name: 'comment-list',
        component: () => import('@/views/message/comment-list'),
        meta: {
          title: '评论列表',
          icon: 'el-icon-chat-dot-square'
        }
      }
    ]
  },
  {
    path: '/travel',
    name: 'travel',
    component: Layout,
    meta: {
      title: '分享管理',
      icon: 'el-icon-position'
    },
    children: [{
        path: 'travel-list',
        name: 'travel-list',
        component: () => import('@/views/travel/travel-list'),
        meta: {
          title: '分享列表',
          icon: 'el-icon-document'
        }
      },
      {
        path: 'travel-save',
        name: 'travel-save',
        component: () => import('@/views/travel/travel-save'),
        meta: {
          title: '记录随想',
          icon: 'el-icon-edit-outline'
        }
      }
    ]
  },
  {
    path: '/site',
    name: 'site',
    component: Layout,
    meta: {
      title: '站点管理',
      icon: 'el-icon-house'
    },
    children: [{
        path: 'timeline-list',
        name: 'timeline-list',
        component: () => import('@/views/site/timeline-list'),
        meta: {
          title: '时间线',
          icon: 'el-icon-date'
        }
      },
      {
        path: 'tag-list',
        name: 'tag-list',
        component: () => import('@/views/site/tag-list'),
        meta: {
          title: '站点标签',
          icon: 'el-icon-tickets'
        }
      }
    ]
  },
  {
    path: '/friend',
    name: 'friend',
    component: Layout,
    meta: {
      title: '友情链接',
      icon: 'el-icon-link'
    },
    children: [{
        path: 'link-list',
        name: 'link-list',
        component: () => import('@/views/friend/link-list'),
        meta: {
          title: '链接列表',
          icon: 'el-icon-guide'
        }
      },
      {
        path: 'link-save',
        name: 'link-save',
        component: () => import('@/views/friend/link-save'),
        meta: {
          title: '保存链接',
          icon: 'el-icon-add-location'
        }
      }
    ]
  },
  {
    path: '跳转Github',
    component: Layout,
    children: [{
      path: 'https://github.com/Sandaman2015/ZswBlog.Core',
      meta: {
        title: '跳转Github',
        icon: 'link'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
