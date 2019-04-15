import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  stringDate(date) {
    date = new Date(date)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }
}