declare type CreateBook = {
    title: string;
    author: string;
    publisher: string;
    price: number;
    images: { url?: string; base64?: string }[];
    isbn?: string;
    xyShops?: { shopName?: string }[];
  };
  