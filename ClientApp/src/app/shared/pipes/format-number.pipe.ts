import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '../../core/utils/common.utils';

@Pipe({
    name: 'formatNumber',
    standalone: true
})
export class FormatNumberPipe implements PipeTransform {
    transform(value: number | null | undefined): string {
        if (value == null) return '0';
        return formatNumber(value);
    }
}
