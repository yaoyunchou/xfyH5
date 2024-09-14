import { Button, Empty, Image, InfiniteScroll, List, Loading, SearchBar } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getOrders } from './service';
import { useNavigate } from 'react-router-dom';
import styles from '../../indexPage.module.scss'
import { Path } from '@/app/constant';

enum OrderStatus {
  "STATUS11" = "待付款",
  "STATUS12" = "待发货",
  "STATUS21" = "已发货",
  "STATUS22" = "交易成功",
  "STATUS23" = "已退款",
  "STATUS24" = "交易关闭",
}

export const OrderList = () => {
  const navigator = useNavigate()
  const [list, setList] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [current, setCurrent] = useState(1)
    const {data, run, loading} = useRequest(getOrders, {
        manual: true,
    });
    useEffect(() => {
      if (run) {
        run({page: current});
      }
    }, []);

    
    useEffect(() => {
      console.log('=================', data)
      if (data && data?.data?.length >= 0) {
        setList(val => [...val, ...data.data])
        // 检查是否为最后一页
        if( data.total  && current * 10 < data.total) {
          setHasMore(true)
        }
      }
    }, [data])

    async function loadMore() {
      setHasMore(false)
      setCurrent(current + 1)
      // setList(val => [...val, ...append])
      // setHasMore(s)
    }
    // if (loading) {
    //   return <Loading />
    // }
    // if (data?.data?.length === 0) {
    //   return <Empty />
    // }
    

  return (<>

   <div className={styles.list_box}>
    <List header='订单列表'>
        {list?.map((order, index) => (
          <List.Item
            key={index}
          >
            {order.title}
            <div className={styles.list_item}>
              <div className={styles.item_content}>
                <a  href={`https://search.kongfz.com/product/?dataType=0&keyword=${order?.isbn}&page=1`} target='_blank'>{order.isbn}</a>
                 {/* <p>{order.xyShops.map((item: any) => item.shopName).join(",")}</p>  */}
                 <p> 订单号：{order.order_no}</p>
                 <p>  商品名称：{order?.orderGood?.title}</p>
                 <p> 收件人:{order.receiver_name}</p>
                 <p> 手机号:{order.receiver_mobile}</p>
                 <p> 地址:{`${order?.prov_name}${order?.city_name}${order?.area_name}${order?.town_name}${order?.address}`}</p>
                 <p> 快递号:{order.waybill_no}</p>
                  <p> 状态：{OrderStatus[`STATUS${order.order_status}`  as keyof typeof OrderStatus]}</p>
              </div>
              {
                order?.orderGood?.isbn ? <Button color='primary' size='small' onClick={() => {navigator(`${Path.KWBooks}`, { state: { isbn: order.orderGood.isbn, address: `${order.receiver_name}  ${order.receiver_mobile} ${order?.prov_name}${order?.city_name}${order?.area_name}${order?.town_name}${order?.address}`} })}}>去下单</Button>: null
              }
              
              <Button color='primary' size='small' onClick={() => {navigator(`/xfy/order-detail/${order.id}`)}}>填入单号</Button>
            </div>
          </List.Item>
        ))}
      </List>
      {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
   </div>
   
  </>
   
  )
}