import * as apiproxy from '@/utilities/apiproxy';

const state = {
    userlist:{}
};
  
// getters
const getters = {
    getuserlist: state => state.userlist,
};
  
// actions
const actions = {
    get_user_list(context){
        return new Promise((resolve,reject)=>{
            var userdetails = sessionStorage.getItem("userdetails");
            userdetails = JSON.parse(userdetails);
            apiproxy.get('/users',{},{
                headers:{
                    "Authorization" : `Bearer ${userdetails.login_user_token}`
                }
            }).then(response=>{
                context.commit('GET_USERLIST',response.data.data.users);
                resolve({ message:response.data.message, success:response.data.success });
            }).catch(error=>{
                reject(error);
            })
        });
    }
};
  
// mutations
const mutations = {
    GET_USERLIST(state,users){
        state.userlist = users;
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