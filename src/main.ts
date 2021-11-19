/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-18 14:34:51
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-19 10:33:53
 */
import { createApp } from 'vue'
import App from './App.vue'
import '@cbim/design-system-variable/index.css'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import './styles/element/index.scss'
// import 'element-plus/dist/index.css'


createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
