import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0 || filterString === ''){
      return value;
    } 
    const resultArray = [];
    // In general, you'll want to use for...of when you need values from a collection, and for...in when you're interested in the keys or properties. It's also worth mentioning that not all objects are iterable, so for...of won't work with every object, but for...in will.
    for(const item of value){
      if(item[propName] === filterString){
        resultArray.push(item)
      }
    }
    return resultArray;
  }

}
