import React, { use, useEffect } from 'react'


import styles from './indexPage.module.scss'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Path } from '@/app/constant';
import { Loading } from '../home';
import dynamic from 'next/dynamic';
import { getToken, getTokenByCode } from './service';
import { AppstoreOutline } from 'antd-mobile-icons';




const XfyHome = dynamic(async () => (await import("./pages/Home")).XfyHome, {
  loading: () => <Loading noLogo />,
});

const AddBook = dynamic(async () => (await import("./pages/books/AddBook")).AddBook, {
  loading: () => <Loading noLogo />,
});

const BookDetail = dynamic(async () => (await import("./pages/books/BookDetail")).default, {
  loading: () => <Loading noLogo />,
});
const BookList = dynamic(async () => (await import("./pages/books/BookList")).BookList, {
  loading: () => <Loading noLogo />,
});
export const XfyPage = () => {
  useEffect(() => {
    // 每次进入的时候检查token
    const token = getToken()
    if (!token){
      getTokenByCode()
    }
  }, []);
  const navigator = useNavigate()
  return (
    <div className={styles.xfy_page}>
      <div className={styles.home}>
        <AppstoreOutline fontSize={20} onClick={()=> navigator(Path.XfyPage)} />
      </div>
      <Routes>
            <Route path={Path.XfyPage} element={<XfyHome />} />
            <Route path={Path.AddBook} element={<AddBook />} />
            <Route path={Path.BookDetail} element={<BookDetail />} />
            <Route path={Path.BookList} element={<BookList />} />
          </Routes>
    </div>
  );
};


