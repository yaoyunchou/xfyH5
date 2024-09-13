import { Path } from "@/app/constant";
import { Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";


interface DemoBlockProps {
    title: string;
    padding?: string;
    children: React.ReactNode;
  }
  const DemoBlock = ({ title, padding, children }:DemoBlockProps) => {
    return (
      <div  style={{ padding: padding || '16px' }}>
        <h3>{title}</h3>
        {children}
      </div>
    );
  }

export const XfyHome = () => {
    const navigate = useNavigate();
    
    return  <DemoBlock title='book333' padding='0'>
    <Button block color='primary' onClick={() => navigate(Path.AddBook)}>
       新增333
   </Button>
   <Button block color='primary' onClick={() => navigate(Path.BookList)}>
       图书列表44
   </Button>
   <Button block color='primary' onClick={() => navigate(Path.OrderList)}>
       订单列表
   </Button>
   <a className="weapp_text_link js_weapp_entry" data-miniprogram-appid="wx0bad87c71b11ea8c" data-miniprogram-path="searchpages/search/search?tab=0&amp;keyword=9787115416292" data-miniprogram-applink="" data-miniprogram-nickname="孔夫子旧书网" data-miniprogram-type="text" data-miniprogram-servicetype="" href="" >呜呜呜呜</a>
 </DemoBlock>
}