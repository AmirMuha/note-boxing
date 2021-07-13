import axios from "axios"
axios.defaults.baseURL = "http://localhost:3400/api"
interface State {
  plans: any[]
}
export default {
  namespaced: true,
  state: () => (
    {plans: []}
  ),
  getters: {
    getPlans(state : State) {
      return state.plans
    },
  },
  actions: {
    fetchPlans(context:any,payload: {year:number}) {
      let date = new Date(payload.year, 1, 1);
      return new Promise((resolve, reject) => {
        axios.get("/yearly", {
          params: {
            date: date? date:null
          }
        }).then(res => {
          context.state.plans = res.data.plans;
          resolve(res.data.message);
        }).catch(err => {
          reject(err.response.data)
          context.state.plans = []
        })
      })
    }
  }
}
