import axios, { AxiosResponse } from "axios";
import { CreateBookDto, TableListItem } from "./data";
import { Toast } from "antd-mobile";
import _ from "lodash";
import res from "antd-mobile-icons/es/AaOutline";



  /** 获取图书列表 GET /api/book */
export async function getKWBooks(
  params: {
    isbn: string;
    /** 当前的页码 */
    page?: number;
    quality?: string;
    sortType?: number;

  }
  // options: { [key: string]: any }
) {
  console.log("getOrders",params);


  console.log("newParams", params);
  const url = `/api/xfy/book/getBookListByISBN`;
  const result = await axios<{
    data: {
      books: TableListItem[];
      /** 列表的内容总数 */
      isbn?: string;
    }
    code?: number;
    msg?: string;
  }>(url, {
    method: "GET",
    params,
  });
  if (result?.data) {
    return {
      data: result.data.data.books,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
    };
  } else {
    Toast.show({
      icon: 'error',
      content: result?.data.msg || "请求失败"
      })
    return {
      data: [],
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: false,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: 0,
    };
  }
}
  

  /** 获取图书列表 GET /api/book */
  export async function runPlaceOrder(
    data: {
      shopId: string;
      /** 当前的页码 */
      goodId?: string;
      address?: string;
  
    }
    // options: { [key: string]: any }
  ) {
  
    console.log("newParams", data);
    const url = `/api/xfy/book/placeOrder`;
    const result = await axios<{
      data: string
      code?: number;
      msg?: string;
    }>(url, {
      method: "POST",
      data,
    });
    if (result?.data) {
      return result.data.data;
    } else {
      Toast.show({
        icon: 'error',
        content: result?.data.msg || "请求失败"
        })
      return '';
    }
  }
    