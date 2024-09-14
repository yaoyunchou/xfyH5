import {
  Badge,
  Button,
  Empty,
  Image,
  InfiniteScroll,
  List,
  Loading,
  SearchBar,
  Selector,
} from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { getKWBooks, runPlaceOrder } from "./service";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../indexPage.module.scss";

enum bookStatus {
  "STATUS11" = "待付款",
  "STATUS12" = "待发货",
  "STATUS21" = "已发货",
  "STATUS22" = "交易成功",
  "STATUS23" = "已退款",
  "STATUS24" = "交易关闭",
}

export const KWBooks = () => {
  const location = useLocation();
  const state = location.state;

  console.log("state", state);
  const [list, setList] = useState<any[]>([]);
  const [link, setLink] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [quality, setQuality] = useState<string>("85~");
  const [sortType, setSortType] = useState(7);
  const { data, run, loading } = useRequest(getKWBooks, {
    debounceWait: 500,
    manual: true,
  });
  useEffect(() => {
    if (run && state?.isbn) {
      run({ isbn: state?.isbn, page, quality, sortType });
    }
  }, [run, state?.isbn, page, quality, sortType]);

  useEffect(() => {
    console.log("=================", data);
    if (data && data?.data?.length >= 0) {
      setList(data.data);
      // 检查是否为最后一页
    }
  }, [data]);
  const placeOrder = async (url: string, item) => {
    url = url.replace("https://book.kongfz.com/", "");
    console.log("下单", url);
    const [shopId, goodId] = url.split("/");
    const result = await runPlaceOrder({
      shopId,
      goodId,
      address: state.address,
    });
    console.log("下单", result);
    window.open(result)
    setLink(result);
    item.link = result;
  };
  if (!state) {
    return <Empty />;
  }
  return (
    <>
      <div className={styles.list_box}>
        <List header="订单列表">
          <div className={styles.filters}>
            <Selector
              options={[
                {
                  label: "85分以上",
                  value: "85~",
                },
                {
                  label: "90分以上",
                  value: "90~",
                },
                {
                  label: "95分以上",
                  value: "95~",
                },
                {
                  label: "100分以上",
                  value: "100~",
                },
              ]}
              value={[quality]}
              onChange={(arr, extend) => setQuality(arr[0])}
            />
            <Selector
              options={[
                {
                  label: "综合排序",
                  value: 0,
                },
                {
                  label: "价格从低到高",
                  value: 7,
                },
              ]}
              value={[sortType]}
              onChange={(arr) => setSortType(arr[0])}
            />
          </div>
          {link ? <a href={link} target="_blank"> {link}</a> : null}
          {list?.map((book, index) => (
            <List.Item key={index}>
              <a href={book.linkUrl} target="_blank">
                {book.title}
              </a>
              <div className={styles.list_item}>
                <div className={styles.kw_item_content}>
                  <div className={styles.item_img}>
                    <Badge content={book.picCount}>
                      <Image alt="商品图" width={200} height={200} src={book?.pic} />
                    </Badge>
                  </div>
                  <div className={styles.bookDetail}>
                    <p>总价格：{book.allPrice}</p>
                    <p>价格/邮费：{book.price} / {book.postage}</p>
                    <p>质量：{book.qualityStr}</p>
                    <p>店铺：{book.shopName}</p>
                  </div>
                </div>
                <p>服务质量：{book.shopServiceQuality}</p>

                {book?.linkUrl ? (
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => placeOrder(book?.linkUrl, book)}
                  >
                    去下单
                  </Button>
                ) : null}
                {book.link ? <a href={book.link} target="_blank"> {book.link}</a> : null}
              </div>
            </List.Item>
          ))}
        </List>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page <= 0}
          loading={loading}
        >
          上一页
        </Button>
        <Button onClick={() => setPage(page - 1)} loading={loading}>
          下一页
        </Button>
      </div>
    </>
  );
};
