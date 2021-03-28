import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store<StoreInterface>({
  state: {
    authorizationToken: '',
    user: null,
  },
  getters: {
    getAuthorizationToken(state) { return state.authorizationToken; },
    getUser(state) { return state.user; },
    userLoggedIn(state) { return state.user !== null; },
  },
  mutations: {
    SET_AUTHORIZATION_TOKEN(state, token: string) {
      state.authorizationToken = token;
      localStorage.setItem('Authorization', token);
      window.axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    },
    SET_USER(state, user: UserInterface) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    LOGOUT(state) {
      state.user = null;
      state.authorizationToken = null;
      localStorage.clear()
    },
  },
  actions: {
    apiGetRequest({ dispatch }, path: string) {
      return window.axios.get(path)
        .then(response => response.data)
        .catch(error => dispatch('handleError', error));
    },
    apiPostRequest({ dispatch }, { path, payload, options = {} }) {
      return window.axios.post(path, payload, options)
        .then(response => response.data)
        .catch(error => dispatch('handleError', error));
    },
    handleError({ dispatch }, error) {
      const responseData = error.response && error.response.data;
      return Promise.reject(responseData || error);
    },
    async signInAndStoreToken({ commit }, { email, password }: { email: string, password: string }) {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      if(!user)
        return;

      const idToken = await user.getIdToken();
      commit('SET_AUTHORIZATION_TOKEN', idToken);
      commit('SET_USER', { email: user.email, displayName: user.displayName });
    }
  },
})

interface StoreInterface {
  authorizationToken: string | null,
  user: UserInterface | null,
}

interface UserInterface {
  displayName: string,
  email: string,
}
