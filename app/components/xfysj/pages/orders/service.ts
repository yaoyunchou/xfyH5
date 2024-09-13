import axios, { AxiosResponse } from "axios";
import { CreateBookDto, TableListItem } from "./data";
import { Toast } from "antd-mobile";
import _ from "lodash";

/**
 * 同步书籍数据库信息
 *
 *
 */
export async function addBookByISBN(isbn: string) {
    
    const result = await axios<{
      data: { successList?: CreateBookDto[] };
      code?: number;
      msg?: string;
    }>(`/api/xfy/addBookInfoByISBNList`, {
      method: "POST",
      data: {
        isbnList: isbn,
        useTemplate: true,
        shopName: "tb133799136652",
      },
    });
    console.log('------------------', result);
    if (result.data?.code === 0) {

      Toast.show({
        icon: 'success',
        content: '新增数据成功',
      })
      return result.data.data.successList;
    } else {
      Toast.show({
        icon: 'error',
        content: result?.data?.msg || "请求失败"
      })
      return;
    }
  }
  

  
/**
 * 发布书籍
 *
 */
export async function publishBook(data: { [key: string]: any }) {
    return axios<any>("/api/xfy/publish/book", {
      data,
      method: "POST",
    });
  }
  
  // 默认模板
  const baseContent = `常见问题看这里
  【有货吗】能拍就有货的！
  【书是几成新】大部分是8成-9成新左右 二手可能有少量笔记使用过的痕迹，不影响阅读，店主都是择优发货的哦!介意者慎怕！
  【关于发货】书籍消毒后发出，不接急单！下单后一般24小时内发货，最迟不超过48小时，每天15点前拍下的都可当天发货哦！不接受指定快递，早拍早发货，物流时间一般到2-4天。
  【温馨提示】下单前请关注，有的书有【粉丝价】, 二手书不保证一定有货, 价格会波动, 希望大家理解！
  ❤️ 最后祝大家生活愉快！逢考必过，升职加薪，成为更棒的自己，加油！！！`;
  
  export const getBookContent = (book: CreateBook) => {
    const content = `【正版二手书】 ${book.title}
      ${baseContent}
      【书名】：${book.title}
  【出版社】：${
      _.get(book, "book_data.publisher") || _.get(book, "bookInfo.publisher")
    }
  【作者】：${_.get(book, "book_data.author") || _.get(book, "bookInfo.author")}
  【ISBN】: ${_.get(book, "book_data.isbn") || _.get(book, "bookInfo.isbn")} 
  `;
    return content;
  };
  
  /**
   * 同步书籍数据库信息
   *
   *
   */
  export async function updateNewBookDetailById(
    id: string,
    data: Partial<CreateBook>
  ) {
    const url = `/api/nest/book/${id}`;
    const result = await axios<{
      data: Partial<CreateBook>;
      code?: number;
      msg?: string;
    }>(url, {
      method: "PATCH",
      data,
    });
  
    if (result?.data.code === 0) {
      Toast.show({
        icon: 'success',
        content: '数据更新成功',
      })
      return {
        data: result.data.data,
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
  
  export async function getImagesByUrl(url: string) {
    const result = await axios<{
      data: Partial<CreateBook>;
      code?: number;
      msg?: string;
    }>(`/api/book/images`, {
      method: "POST",
      data: {
        url,
      },
    });
    if (result?.data.code === 0) {
      return result?.data;
    }
  }
  
/**
 * 获取书籍库中的书籍信息
 *
 *
 */
export async function getNewBookDetailById(id: string) {
    const url = `/api/nest/book/${id}`;
    const result = await axios<{
      data: CreateBook;
      code?: number;
      msg?: string;
    }>(url, {
      method: "GET",
    });
  
    if (result?.data.code === 0) {
      const baseData = result.data.data;
  
      const book = {
        title: baseData.title,
        bookInfo: {
          title: baseData.title,
          price: baseData.price,
          isbn: baseData.isbn,
          author: baseData.author,
          images: baseData?.images?.length
            ? baseData.images.map((item) => item.url)
            : [],
          publisher: baseData.publisher,
        },
      };
      return {
        data: book,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: true,
      };
    } else {
      Toast.show({
        icon: 'error',
        content: result?.data?.msg || "请求失败"
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
export async function getBooks(
    params: {
      // query
      title?: string;
      id?: string;
      isbn?: string;
      /** 当前的页码 */
      current?: number;
      /** 页面的容量 */
      pageSize?: number;
      shopName?: string;
      product_status?: string;
      query?: string;
    },
  
    sort?: any,
    filter?: any
    // options: { [key: string]: any }
  ) {
    console.log("getBooks", sort, filter, params);
    let inputQuery = {};
    if (params?.query) {
      inputQuery = JSON.parse(params.query);
    }
    const newParams = {
      id: params?.id,
      isbn: params?.isbn,
      page: params.current,
      title: params?.title,
      pageSize: params?.pageSize,
    };
    console.log("newParams", newParams);
    const url = `/api/nest/book`;
    const result = await axios<{
      data: {
        list: TableListItem[];
        /** 列表的内容总数 */
        total?: number;
      };
      code?: number;
      msg?: string;
    }>(url, {
      method: "GET",
      params: _.pickBy(newParams, _.identity),
    });
    if (result?.data.code === 0) {
      return {
        data: result.data.data.list,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: true,
        // 不传会使用 data 的长度，如果是分页一定要传
        total: result.data.data.total,
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
  
  /** 新建规则 PUT /api/book */
  export async function updateBook(
    data: { [key: string]: any },
    options?: { [key: string]: any }
  ) {
    return axios<TableListItem>("/book", {
      data,
      method: "PUT",
      ...(options || {}),
    });
  }
  
  /** 新建规则 POST /api/book */
  export async function addBook(
    data: { [key: string]: any },
    options?: { [key: string]: any }
  ) {
    return axios<TableListItem>("/book", {
      data,
      method: "POST",
      ...(options || {}),
    });
  }
  
  /** 根据数据下架书记 DELETE /api/book */
  export async function downshelf(data: { product_id: string; _id: string }) {
    console.log(data);
    return axios<Record<string, any>>("/api/downShelf", {
      method: "DELETE",
      params: _.pickBy(data, _.identity),
    });
  }
  /** 根据数据下架书记 DELETE /api/book */
  export async function downShelfList(data: TableListItem[]) {
    const resultList = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      console.log(item);
      const result = await downshelf({
        _id: item._id,
        product_id: item.product_id!,
      });
      if (result && result.data.code === 0) {
        resultList.push({ msg: "下架成功", id: item.product_id });
      } else {
        resultList.push({ msg: "下架失败", id: item.product_id });
      }
    }
  }

  /** 获取图书列表 GET /api/book */
export async function getOrders(
  params: {
    // query
    title?: string;
    id?: string;
    isbn?: string;
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    pageSize?: number;
    shopName?: string;
    product_status?: string;
    query?: string;
  },

  sort?: any,
  filter?: any
  // options: { [key: string]: any }
) {
  console.log("getOrders", sort, filter, params);
  let inputQuery = {};
  if (params?.query) {
    inputQuery = JSON.parse(params.query);
  }
  const newParams = {
    id: params?.id,
    isbn: params?.isbn,
    page: params.current,
    title: params?.title,
    pageSize: params?.pageSize,
  };
  console.log("newParams", newParams);
  const url = `/api/nest/order`;
  const result = await axios<{
    data: {
      list: TableListItem[];
      /** 列表的内容总数 */
      total?: number;
    };
    code?: number;
    msg?: string;
  }>(url, {
    method: "GET",
    params: _.pickBy(newParams, _.identity),
  });
  if (result?.data) {
    return {
      data: result.data.list,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: result.data.total,
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
  