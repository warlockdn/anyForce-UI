import { FieldType } from './../../../../../models/field-types.model';
import { FieldIn } from './../../../../../models/field.model';
import { Structure, StructureTypes, StructureTypesTitle } from './../../../../../models/structure.model';

export class StructureService {

  readonly fieldTypes: string[] = Object.values(FieldType);

  fields: FieldIn[] | undefined;

  constructor(fields?: FieldIn[]) {
    this.fields = fields;
  }

  buildStructureForService(plainStructure: Structure[]): Structure[] {

    const structureList: Structure[] = [];

    plainStructure.forEach(item => {
      const structure: Structure = {
        type: this.fieldTypes.includes(item.type) ? StructureTypes.field : item.type,
        meta: {
          desc: item?.meta?.desc,
          title: item?.meta?.title,
          fieldId: this.fieldTypes.includes(item.type) ? item._id : undefined
        }
      };

      if (item.children) {
        structure.children = this.buildStructureForService(item.children);
      }

      structureList.push(structure);

    });

    return structureList;
  }

  // -------------- Process for UI rendering ----------------- //

  buildStructureForUI(plainStructure: Structure[]): Structure[] {
    const structureList: Structure[] = [];

    plainStructure.forEach(item => {

      // tslint:disable-next-line: prefer-const
      let structure = this.generateStructure(item);

      if (item.meta?.fieldId) {
        const field = this.fields?.find(f => f._id === item.meta.fieldId);
        (structure as any) = field;
      } else {
        if (item.children) {
          structure.children = this.buildStructureForUI(item.children);
        }
      }

      structureList.push(structure);

    });

    return structureList;
  }

  private generateStructure(structure: Structure): Structure {
    return {
      label: StructureTypesTitle[structure.type],
      type: structure.type,
      meta: {
        title: structure?.meta?.title,
        desc: structure?.meta?.desc
      },
      children: []
    };
  }

}
