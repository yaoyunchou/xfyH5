import { Button, Empty, Image, InfiniteScroll, List, Loading, SearchBar } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getBooks } from './service';
import { useNavigate } from 'react-router-dom';
import styles from '../../indexPage.module.scss'

export const BookList = () => {
  const navigator = useNavigate()
  const [list, setList] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [current, setCurrent] = useState(1)
    const {data, run, loading} = useRequest(getBooks, {
        manual: true,
    });
    useEffect(() => {
      if (run) {
        run({current});
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
      run({ current: current + 1 })
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
   <SearchBar className={styles.search} placeholder='请输入内容'  onSearch={(value) => {
      if(value !=='') {
        setList([]) 
        setCurrent(1)
        setHasMore(false)
        run({current:1, isbn: value})
       
      }else{
        setList([]) 
        run({current:1})
      }
    }} />
   <div className={styles.list_box}>
    <List header='图书列表'>
        {list?.map((book, index) => (
          <List.Item
            key={index}
            
            description={book.isbn}
          >
            {book.title}
            <div className={styles.list_item}>
              <div className={styles.item_content}>
                <a  href={`https://search.kongfz.com/product/?dataType=0&keyword=${book?.isbn}&page=1`} target='_blank'>{book.isbn}</a>
                 <p>{book.xyShops.map((item: any) => item.shopName).join(",")}</p> 
              </div>
              <Button color='primary' size='small' onClick={() => {navigator(`/xfy/book-detail/${book.id}`)}}>详情</Button>
            </div>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
   </div>
   
  </>
   
  )
}