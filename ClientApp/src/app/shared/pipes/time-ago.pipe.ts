import { Pipe, PipeTransform } from '@angular/core';
import { timeAgo } from '../../core/utils/date.utils';

@Pipe({
    name: 'timeAgo',
    standalone: true
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: Date | string | null | undefined): string {
        if (!value) return '';
        return timeAgo(value);
    }
}
