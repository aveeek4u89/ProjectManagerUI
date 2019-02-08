import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
        return (it.FirstName.toLowerCase().includes(searchText.toLowerCase())
            || it.LastName.toLowerCase().includes(searchText.toLowerCase())
            || it.EmployeeID == searchText);
    });
}

}
