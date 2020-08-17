import axios from 'axios'

/*const apiproxy = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default apiproxy;*/

function getAxios() {
    return axios.create({
        baseURL: process.env.VUE_APP_API_URL
    })
}

export async function get(url, { params } = {}, { headers } = {}) {
    try {
        /* var userdetails = sessionStorage.getItem("userdetails");
        userdetails = JSON.parse(userdetails);
        const response = await getAxios().get(url,{
            headers:{
                "Authorization" : `Bearer ${userdetails.login_user_token}`
            },
            params:{ params }
        })
        return response */
        const response = await getAxios().get(url,{
            headers:headers,
            params:{ params }
        })
        return response
    } catch (err) {
        console.log(err);
        return {
            data: {
                success: false
            }
        }
    }
}

export async function post(url, data, headers) {
    try {
        const response = await getAxios().post(url, data, headers)
        return response
    } catch (err) {
        console.log(err)
        return {
            data: {
                success: false,
                errors:err
            }
        }
    }
}

export async function put(url, data, headers) {
    try {
        const response = await getAxios().put(url, data, headers)
        return response
    } catch (err) {
        console.log(err)
        return {
            data: {
                success: false,
                errors:err
            }
        }
    }
}

export async function destroy(url, { headers } = {}) {
    try {
        const response = await getAxios().delete(url,{
            headers:headers
        })
        return response
    } catch (err) {
        console.log(err);
        return {
            data: {
                success: false
            }
        }
    }
}