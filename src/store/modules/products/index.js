import * as apiproxy from '@/utilities/apiproxy';

const state = {
    productlist:{}
};
  
// getters
const getters = {
    getproductlist: state => state.productlist,
};
  
// actions
const actions = {
    get_product_list(context){
        return new Promise((resolve,reject)=>{
            var userdetails = sessionStorage.getItem("userdetails");
            userdetails = JSON.parse(userdetails);
            apiproxy.get('/products',{},{
                headers:{
                    "Authorization" : `Bearer ${userdetails.login_user_token}`
                }
            }).then(response=>{
                context.commit('GET_PRODUCTLIST',response.data.data.products);
                resolve({ message:response.data.message, success:response.data.success });
            }).catch(error=>{
                reject(error);
            })
        });
    },
    get_product(context,product_id){
        return new Promise((resolve,reject)=>{
            var userdetails = sessionStorage.getItem("userdetails");
            userdetails = JSON.parse(userdetails);
            apiproxy.get(`/products/${product_id}`,{},{
                headers:{
                    "Authorization" : `Bearer ${userdetails.login_user_token}`
                }
            }).then(response=>{
                resolve(response);
            }).catch(error=>{
                reject(error);
            })
        });
    },
    create_product(context,newproduct){
        return new Promise((resolve,reject)=>{
            var userdetails = sessionStorage.getItem("userdetails");
            userdetails = JSON.parse(userdetails);
            apiproxy.post(`/products/create`,newproduct,{
                headers:{
                    "Authorization" : `Bearer ${userdetails.login_user_token}`
                }
            }).then(response=>{
                resolve(response);
            }).catch(error=>{
                reject(error);
            })
        });
    },
    update_product(context,editproduct){
        return new Promise((resolve,reject)=>{
            var userdetails = sessionStorage.getItem("userdetails");
            userdetails = JSON.parse(userdetails);
            apiproxy.put(`/products/update/${editproduct.id}`,editproduct,{
                headers:{
                    "Authorization" : `Bearer ${userdetails.login_user_token}`
                }
            }).then(response=>{
                resolve(response);
            }).catch(error=>{
                reject(error);
            })
        });
    },
    delete_product(context,product_id){
        return new Promise((resolve,reject)=>{
            var userdetails = sessionStorage.getItem("userdetails");
            userdetails = JSON.parse(userdetails);
            apiproxy.destroy(`/products/destroy/${product_id}`,{
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
    GET_PRODUCTLIST(state,products){
        state.productlist = products;
    },
};

export default {
    namespaced: true,
    name: 'products',
    state,
    getters,
    actions, 
    mutations
}