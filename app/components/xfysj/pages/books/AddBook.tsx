import React from "react"
import { Button, Form, Input } from "antd-mobile"
import { addBookByISBN } from "./service";
import { CreateBookDto } from "./data";

export const AddBook = () => {

    const [isbn, setIsbn] = React.useState<string>("");
    const [current, setCurrent] = React.useState<CreateBookDto>({});
  
    const handlerSearch = async () => {
      // 根据isbn获取书籍信息
      const result = await addBookByISBN(isbn);
      if (result && result?.length > 0) {
        setCurrent(result[0]);
      }
    };

    return <div className="image-editor">
 
    <Form
   
        footer={
          <Button block type='submit' color='primary' onClick={() => handlerSearch()} size='large'>
            提交
          </Button>
        }
      >
     
        <Form.Header>通过ISBN新增书籍</Form.Header>
        <Form.Item name='name' label='输入isbn' rules={[{ required: true }]}>
            <Input
            defaultValue={isbn}
            onChange={(value) => setIsbn(value)}
            />
        </Form.Item>
      </Form>
  </div>
}