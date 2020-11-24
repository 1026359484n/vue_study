export interface Pagination {
  total: number;
  pageSize: number;
  showSizeChanger: true;
  pageSizeOptions: Array<string>;
  showTotal: Function;
  current: number;
}
