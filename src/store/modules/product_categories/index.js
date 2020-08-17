import * as apiproxy from '@/utilities/apiproxy';

const state = {
    categorylist:{}
};
  
// getters
const getters = {
    getcategorylist: state => state.categorylist,
};
  
// actions
const actions = {
    get_product_category_list(context){
        return new Promise((resolve,reject)=>{
            var userdetails = sessionStorage.getItem("userdetails");
            userdetails = JSON.parse(userdetails);
            apiproxy.get('/product_category',{},{
                headers:{
                    "Authorization" : `Bearer ${userdetails.login_user_token}`
                }
            }).then(response=>{
                context.commit('GET_PRODUCT_CATEGORY_LIST',response.data.data.categories);
                resolve({ message:response.data.message, success:response.data.success });
            }).catch(error=>{
                reject(error);
            })
        });
    },
    delete_category(context,category_id){
        return new Promise((resolve,reject)=>{
            var userdetails = sessionStorage.getItem("userdetails");
            userdetails = JSON.parse(userdetails);
            apiproxy.destroy(`/product_category/destroy/${category_id}`,{
                headers:{
                    "Authorization" : `Bearer ${userdetails.login_user_token}`
                }
            }).then(response=>{
                resolve(response);
            }).catch(error=>{
                reject(error);
            })
        });
    }
};
  
// mutations
const mutations = {
    GET_PRODUCT_CATEGORY_LIST(state,product_category){
        state.categorylist = product_category;
    },
};

export default {
    namespaced: true,
    name: 'product_category',
    state,
    getters,
    actions, 
    mutations
}