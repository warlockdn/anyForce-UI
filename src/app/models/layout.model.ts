import { Structure } from './structure.model';

export interface Layout {
  _id?: string;
  name: string;
  label: string;
  default: boolean;
  description: string;
  type: LayoutType;
  structure?: Structure[];
  disabled: boolean;
  visibility: Visibility;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface LayoutActions {
  /** Layout Label */
  label: string;
  /** Type of Layout - from LayoutAction or custom */
  type: LayoutActionTypes;
  /** Contains the description for the action */
  description: string;
}

export type LayoutActionTypes = 'submit' | 'update' | 'delete' | string;

export enum LayoutType {
  list = 'list',
  update = 'update',
  create = 'create'
}

/**
 * Each layout may or may not be accessible to limited people
 * Access can be decided just how whatsapp status visibility works
 * Either limit to { Selected Users | User Group } or except certain { Users | User Group }
 */
export interface Visibility {
  limitedTo: Array<any>;
  except: Array<any>;
}
