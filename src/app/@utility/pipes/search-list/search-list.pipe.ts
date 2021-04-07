import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchlist'
})
export class SearchListPipe implements PipeTransform {

  transform(items: any[] | undefined, searchText: string, key: string): any[] {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    if (!key) {
      return items.filter(item => (item as string).toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
    } else {
      return items.filter(item => (item[key] as string).toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
    }

  }

}
