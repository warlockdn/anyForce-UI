declare module '@swimlane/dragula' {
  interface DragulaOptions {
    containers?: Element[];
    isContainer?: (el?: Element) => boolean;
    moves?: (el?: Element, container?: Element, handle?: Element, sibling?: Element) => boolean;
    accepts?: (el?: Element, target?: Element, source?: Element, sibling?: Element) => boolean;
    invalid?: (el?: Element, target?: Element) => boolean;
    direction?: string;
    copy?: ((el: Element, source: Element) => boolean) | boolean;
    copySortSource?: boolean;
    revertOnSpill?: boolean;
    removeOnSpill?: boolean;
    delay?: boolean | number;
    mirrorContainer?: Element;
    ignoreInputTextSelection?: boolean;
  }

  interface Drake {
    containers: Element[];
    dragging: boolean;
    start(item: Element): void;
    end(): void;
    cancel(revert?: boolean): void;
    canMove(item: Element): boolean;
    remove(): void;
    on(event: 'drag', listener: (el: Element, source: Element) => void): Drake;
    on(event: 'dragend', listener: (el: Element) => void): Drake;
    on(event: 'drop', listener: (el: Element, target: Element, source: Element, sibling: Element) => void): Drake;
    on(
      event: 'cancel' | 'remove' | 'shadow' | 'over' | 'out',
      listener: (el: Element, container: Element, source: Element) => void,
    ): Drake;
    on(event: 'cloned', listener: (clone: Element, original: Element, type: 'mirror' | 'copy') => void): Drake;
    destroy(): void;
  }

  interface Dragula {
    (containers: Element, options: DragulaOptions): Drake;
    (containers: Element[], options?: DragulaOptions): Drake;
    (options?: DragulaOptions): Drake;
  }
}
