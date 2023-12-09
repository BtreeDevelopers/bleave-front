import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      email: "",
      token: "",
      token_bauth: "",
      userId: "",
      name: "",
      image: "",
      theme: "dark",
    };
  },
  getters: {
    isLogged: (state) => !!state.token,
  },
  actions: {
    logout() {
      this.$reset();
    },
  },
  persist: {
    key: "store-user",
  },
});
