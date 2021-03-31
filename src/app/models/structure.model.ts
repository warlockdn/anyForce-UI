export enum StructureTypes {
  divider = 'divider',
  section = 'section',
  row = 'row',
  column = 'column',
  space = 'space',
  heading1 = 'heading1',
  heading2 = 'heading2',
  heading3 = 'heading3',
  desc = 'desc',
  field = 'field'
}

export enum StructureTypesTitle {
  divider = 'Divider',
  section = 'Section',
  row = 'Row',
  column = 'Column',
  space = 'Space',
  heading1 = 'Heading 1',
  heading2 = 'Heading 2',
  heading3 = 'Heading 3',
  desc = 'Description',
  field = 'Field'
}

export interface Divider {
  desc: string;
}

export interface Column {
  /** number between 1-4 */
  size: number;
  desc: string;
}

export interface SectionAndDesc {
  desc: string;
}

export interface Heading {
  title: string;
  desc: string;
}

export interface Field {
  fieldId: string;
}

export interface Structure {
  _id?: string;
  type: StructureTypes;
  label?: string;
  // meta: Divider | Column | SectionAndDesc | Heading | Field;
  meta: {
    title?: string,
    desc?: string,
    size?: number
    /** ObjectId of the Field associated with the Structure */
    fieldId?: string;
  };
  children?: Array<Structure>;
}

