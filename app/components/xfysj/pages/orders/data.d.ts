export type TableListItem = {
  id?: string;
  _id: string;
  product_id?: string;
  key: number;
  title?: string;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
  isbn: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
  shopName: string;
  product_status: string;
  query: string;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

/**
 * CreateBookDto
 */
export type CreateBookDto = {
  id?: string;
  author?: string;
  content?: string;
  firstCategory: string;
  images?: string[];
  isbn: string;
  price?: number;
  publisher?: string;
  secondCategory: string;
  title?: string;
};
export type TableListItem = {
  id?: string;
  _id: string;
  product_id?: string;
  key: number;
  title?: string;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
};
