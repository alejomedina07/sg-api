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

  getDayRange(date: Date): { startDate: Date; endDate: Date } {
    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0,
    );
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999,
    );

    return { startDate, endDate };
  }

  getMinuteRange(
    date: Date,
    minutes: number,
  ): { startDate: Date; endDate: Date } {
    const startDate = new Date(date.getTime() - minutes * 60000);
    const endDate = new Date(date.getTime() + minutes * 60000);

    return { startDate, endDate };
  }
}
