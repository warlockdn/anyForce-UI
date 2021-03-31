import { DraggableDirective } from '@swimlane/ngx-dnd';

export interface DragDropInterface {
  el: HTMLElement;
  source: HTMLElement;
  sourceComponent: DraggableDirective;
  type: string;
  value: any;
}
