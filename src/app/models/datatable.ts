export interface Datatable {
}

export interface ColumnFilter {
  name: string;
  [key: string]: any;
}

export interface Action {
  type: string;
  data: any;
}
