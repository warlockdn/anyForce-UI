import { ColDef, Column } from 'ag-grid-community';

export enum EntitiesGridColumns {
  label = 'Label',
  name = 'Name',
  fields = 'Fields',
  createdDate = 'Created On',
  updatedDate = 'Last Updated'
}

export const defaultColDef: ColDef = {
  resizable: true,
  sortable: true
};

