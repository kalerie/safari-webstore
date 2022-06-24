import { Pipe, PipeTransform } from "@angular/core";
import { LabelValueEntry } from "./label-value-map";

@Pipe({
    name: 'dictionary'
  })
  export class DictionaryPipe implements PipeTransform {

    transform(value: string, items: LabelValueEntry[]): string {
      const word = items.find(el => el.value === value)?.label;
      if(!word) return '';
      return word;
    }
}
  