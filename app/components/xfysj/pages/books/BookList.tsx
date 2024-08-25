import { Empty, Image, List, Loading } from 'antd-mobile'
import React, { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { getBooks } from './service';

export const BookList = () => {
    const {data, run, loading} = useRequest(getBooks, {
        manual: true,
    });
    useEffect(() => {
      if (run) {
        run({});
      }
    }, [run]);

    
    useEffect(() => {
      console.log('=================', data)
    }, [data])
    if (loading) {
      return <Loading />
    }
    if (data?.data?.length === 0) {
      return <Empty />
    }
    

  return (
    <List header='图书列表'>
      {data?.data?.map(book => (
        <List.Item
          key={book.id}
          
          description={book.isbn}
        >
          {book.title}
          <div>
            <a  href={`https://search.kongfz.com/product/?dataType=0&keyword=${book?.isbn}&page=1`} target='_blank'>{book.isbn}</a>
          </div>
        </List.Item>
      ))}
    </List>
  )
}