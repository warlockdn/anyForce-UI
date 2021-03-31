import { Field } from './field.model';

export interface Entity {
  id?: string;
  name: string;
  label: string;
  pluralLabel?: string;
  description?: string;
  createdDate?: Date;
  updatedDate?: Date;
  allowSearch?: boolean;
  published?: boolean;
  fields: Array<Field>;
}
