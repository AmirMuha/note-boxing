import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";
import store from "./store/index";
import BaseInput from "./components/UI/BaseInput.vue";
import axios from "./util/axios";
import BaseTextarea from "./components/UI/BaseTextarea.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import Container from "./components/UI/Container.vue";
import Seperator from "./components/UI/Seperator.vue";
import BaseModal from "./components/UI/BaseModal.vue";
import BaseAlert from "./components/UI/BaseAlert.vue";
import "./tailwind.css";

const app = createApp(App);
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

app.config.globalProperties.$axios = axios;
app.component("base-input", BaseInput);
app.component("base-button", BaseButton);
app.component("base-textarea", BaseTextarea);
app.component("container", Container);
app.component("seperator", Seperator);
app.component("base-modal", BaseModal);
app.component("base-alert", BaseAlert);
app.use(router);
app.use(store);
app.mount("#app");
