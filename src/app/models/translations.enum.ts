enum TranslationsList {
  notfound = 'notfound',
  goback = 'goback'
}

export type Translations = TranslationsList & { [type: string]: string };
