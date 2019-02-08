import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parentTaskFilter'
})
export class ParentTaskFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
        return (it.ParentTaskName.toLowerCase().includes(searchText.toLowerCase())
            || it.ParentTaskID == searchText);
    });
}

}
