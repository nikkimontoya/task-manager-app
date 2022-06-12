import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'lastUrlPart'
})
export class LastUrlPartPipe implements PipeTransform {
    transform(url: string): string {
        const urlArray = url.split('/');
        return urlArray[urlArray.length - 1];
    }
}
