import { Structure, StructureTypes, StructureTypesTitle } from './../../../../models/structure.model';

/**
 * Helper class to generate Basic Layout items like section, row etc.
 */
export class BasicLayouts {

  /**
   * Generates single basic layout item based on type
   * @param type Type of item.
   */
  generateBasicItem(type: StructureTypes): Structure {
    const structure: Structure = {
      type
    } as any;

    if ([StructureTypes.section, StructureTypes.heading1, StructureTypes.heading2, StructureTypes.heading3].includes(type)) {
      structure.meta = {
        title: '',
        desc: ''
      };
    } else if ([StructureTypes.desc]) {
      structure.meta = {
        desc: ''
      };
    } else if (type === StructureTypes.divider) {
      structure.meta = {
        desc: ''
      };
    } else if (type === StructureTypes.column) {
      structure.meta = {
        size: 1,
        desc: ''
      };
      structure.children = [];
    } else {
      structure.children = [];
    }

    return structure;

  }

  generateBasicLayouts(): Array<Structure> {
    const basicItems = Object.keys(StructureTypes).map(item => this.generateBasicItem(item as any)) || [];
    return basicItems
      .filter(item => item.type !== StructureTypes.field)
      .map(item => Object.assign(item, {
        label: StructureTypesTitle[item.type],
        type: item.type,
        children: []
      }));
  }

}
