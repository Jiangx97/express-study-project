import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 完整引入 ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale: zhCn }); // 默认是英文，改为中文
app.mount("#app");

// 全局注册elementPlus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
