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
    
    return  <DemoBlock title='book' padding='0'>
    <Button block color='primary' onClick={() => navigate(Path.AddBook)}>
       新增
   </Button>
   <Button block color='primary'>
       图书列表
   </Button>
 </DemoBlock>
}