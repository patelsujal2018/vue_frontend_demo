import * as apiproxy from '@/utilities/apiproxy';

const state = {
    islogin:false,
    login_user_token:""
};
  
// getters
const getters = {

};
  
// actions
const actions = {
    user_register(context,userDetails){
        return new Promise((resolve,reject)=>{
            apiproxy.post('/auth/register',userDetails,{headers:{"Content-Type" : "application/json"}}).then(response=>{
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    user_login(context,userDetails){
        return new Promise((resolve,reject)=>{
            apiproxy.post('/auth/login',userDetails,{headers:{"Content-Type" : "application/json"}}).then(response=>{
                var user = {
                    islogin:true,
                    login_user_token:response.data.data.token
                }
                context.commit('SET_USERDETAILS',user);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    }
};
  
// mutations
const mutations = {
    SET_USERDETAILS(state,user){
        state.islogin = user.islogin;
        state.login_user_token = user.login_user_token;
    },
};

export default {
    namespaced: true,
    name: 'users',
    state,
    getters,
    actions, 
    mutations
}