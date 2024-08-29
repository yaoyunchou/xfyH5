import React, { useEffect, useRef, useState } from "react";
import { useRequest } from "ahooks";
import {
  getBookContent,
  getNewBookDetailById,
  publishBook,
  updateNewBookDetailById,
} from "./service";
import { Button, Image, ImageViewer, Selector, Space, Toast } from "antd-mobile";
import { useParams } from "react-router-dom";
import ClipboardJS from "clipboard";


// 多张图片预览
const Multi = ({images,index, visible, setVisible}:{images: string[], index:number, visible: boolean, setVisible:(value:boolean)=>void}) => {
    return (
 
        <ImageViewer.Multi
          images={images}
          visible={visible}
          defaultIndex={1}
          onClose={() => {
            setVisible(false)
          }}
        />
    
    )
  }

interface PreviewProps {
}
const Preview: React.FC<PreviewProps> = () => {
    const params = useParams(); // 使用 useParams 钩子获取路由参数
    const [text, setText] = useState();
    const { id } = params; // 从 params 中解构出 id
    const [visible, setVisible] = useState(false)
    const ref = useRef(null);

  
  const [xyShops, setXyShops] = React.useState<{ shopName: string }[]>([{shopName:"蓝小飞鱼"}, {shopName:"tb133799136652"}]);
  // 根据id获取对应的书籍信息
  const { loading, data, run } = useRequest<any,any>(getNewBookDetailById, {
    manual: true,
  });

  useEffect(() => {
    if (id && run) {
      run(id);
    }
  }, [id, run]);

  useEffect(() => {

    if(ref?.current && data?.data){

      const clipboard = new ClipboardJS(ref.current.nativeElement, {
        text: () => getBookContent(data.data)
      });
      clipboard.on('success', function(e) {
        Toast.show({
          icon: 'success',
          content: '复制成功',
        })
      });
      clipboard.on('error', function(e) {
        Toast.show({
          icon: 'error',
          content: '复制失败',
        })
      });
      return () => clipboard.destroy();
    }
  
   
  }, [ref, data?.data]);
  const handleChange = (value: string[]) => {
    const newXyShops = value.map((shopName) => ({ shopName }));
    setXyShops(newXyShops);
  };


  const handlerPushBook = async () => {
    console.log('data-----', data)
    if (data?.data && data?.data?.bookInfo && xyShops.length > 0) {
      const promiseArray = xyShops.map(async (shop) => {
        return publishBook({
          ...data.data.bookInfo,
          shopName: shop.shopName,
        });
      });

      const newBook01 = await Promise.all(promiseArray);
      // 如果书籍发布成功， 则同步到书籍库
      if (newBook01 &&  id) {
        // 同步到书籍库
        await updateNewBookDetailById(id, {
          xyShops,
        });
      }
    }
  };
  return (
    <div>
      {data &&
        data?.data &&
        Object.keys(data?.data?.bookInfo).map((key: string) => {
          console.log(data?.data);
          const displayKeys = [
            "id",
            "title",
            "author",
            "price",
            "publisher",
            "isbn",
          ];
          return displayKeys.includes(key) ? (
            <dl key={key}>
              <dt>{key}</dt>
              <dd>{data?.data?.bookInfo?.[key]}</dd>
            </dl>
          ) : null;
        })}

      {!loading ? <pre>{data && getBookContent(data.data)}</pre> : null}
      <Button color="primary"  ref={ref} >复制文本</Button>
      <div>---------------------</div>
      <Space wrap>
        {data?.data?.bookInfo?.images?.map((image: string, index:number) => (
        //   <Image key={image} width={100} src={image} />
          <Image alt="圖片" width={100} height={100} key={image + index} lazy   fit='contain' src={image} onClick={() =>setVisible(true)} />
        ))}
        <Multi  images={data?.data?.bookInfo?.images || []} index={0} visible={visible} setVisible={setVisible}/>
        </Space>
      {/* 多选框选择店铺 */}
      <div>
        <label>选择上线店铺</label>
       
        <Selector
          options={[
            { label: "蓝小飞鱼", value: "蓝小飞鱼" },
            { label: "tb133799136652", value: "tb133799136652" },
          ]}
          value={xyShops.map((shop) => shop.shopName)}
          multiple
          onChange={handleChange}
        />
      </div>
      <div>
        <Button color="default" onClick={() => handlerPushBook()}>
          上传
        </Button>
        <Button color="primary">确定</Button>
      </div>
    </div>
  );
};

export default Preview;
