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
      ISBN新增
   </Button>
   <Button block color='primary' onClick={() => navigate(Path.BookList)}>
       图书列表
   </Button>
   <Button block color='primary' onClick={() => navigate(Path.OrderList)}>
       订单列表
   </Button>
   {/* <Button block color='primary' onClick={() => navigate(Path.KWBooks)}>
       商品列表
   </Button> */}
 </DemoBlock>
}