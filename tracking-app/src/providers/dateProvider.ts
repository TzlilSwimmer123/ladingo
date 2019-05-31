import {Injectable} from '@angular/core';

@Injectable()

export class DateProvider {

  constructor() {

  }

  formatDate(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  formatTime(date) {
    const d = new Date(date);
    let hours = d.getHours();
    let minutes = d.getMinutes().toString();
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ':' + minutes + ' ' + ampm;
  }
}
