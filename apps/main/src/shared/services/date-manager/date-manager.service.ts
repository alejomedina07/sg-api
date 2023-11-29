import { Injectable } from '@nestjs/common';
import { endOfMonth, format, parse, startOfMonth } from 'date-fns';

@Injectable()
export class DateManagerService {
  dateToFormatStandard(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }

  getMonthRange(dateString: string) {
    const date = parse(dateString, 'yyyy-MM', new Date());
    const startDate = format(startOfMonth(date), 'yyyy-MM-dd');
    const endDate = format(endOfMonth(date), 'yyyy-MM-dd');
    return { startDate, endDate };
  }
}
