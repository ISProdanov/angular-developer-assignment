import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, terms: any): any {
    if (terms === undefined) return users;

    return users.filter(user => user.firstName.toLowerCase().includes(terms.toLowerCase()))
  }

}
