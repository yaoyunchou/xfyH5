import axios from "axios";
import { XFY_BASE_URL } from "@/app/constant";
import { Toast } from "antd-mobile";

let  token = localStorage.getItem('xfy_token') || '';
export const getToken= () => {
    return token
}

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export const setToken = (value: string) => {
    if(value) {
        token = value;
        localStorage.setItem('xfy_token', value)
        axios.defaults.headers.common['Authorization'] = `Bearer ${value}`;
    }
}
/**
 * 同步书籍数据库信息
 *
 *
 */
export async function getTokenByCode() {
    
    const result = await axios<{
      data: { token:string };
      code?: number;
      msg?: string;
    }>(`/api/xfy/getTokenByCode`, {
      method: "POST",
      data: {
       code: '20170402yaoyc'
      },
    });
    console.log('------------------', result);
    if (result.data?.code === 0) {
        setToken(result.data.data.token)
    //   Toast.show({
    //     icon: 'success',
    //     content: '获取token成功',
    //   })
    } else {
      Toast.show({
        icon: 'error',
        content: result?.data?.msg || "获取token失败"
      })
      return;
    }
  }
  