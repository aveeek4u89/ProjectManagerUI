import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
        return (it.ProjectName.toLowerCase().includes(searchText.toLowerCase())
            || it.Priority == searchText
            || it.EmployeeID == searchText);
    });
}

}
