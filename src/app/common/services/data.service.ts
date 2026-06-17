import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService
{

  isShowLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  discountType: { label: string, value: string; }[] = [{ label: 'Fixed', value: 'fixed' }, { label: 'Percentage', value: 'percentage' }];

  months = [{ id: 1, name: 'January', shortName: 'Jan' }, { id: 2, name: 'February', shortName: 'Feb' }, { id: 3, name: 'March', shortName: 'Mar' }, { id: 4, name: 'April', shortName: 'Apr' }, { id: 5, name: 'May', shortName: 'May' }, { id: 6, name: 'June', shortName: 'Jun' }, { id: 7, name: 'July', shortName: 'Jul' }, { id: 8, name: 'August', shortName: 'Aug' }, { id: 9, name: 'September', shortName: 'Sep' }, { id: 10, name: 'October', shortName: 'Oct' }, { id: 11, name: 'November', shortName: 'Nov' }, { id: 12, name: 'December', shortName: 'Dec' }];

  constructor() { }

  setToken(token: string)
  {
    localStorage.setItem('token', token);
  }

  getToken(): string
  {
    return localStorage.getItem('token') || '';
  }

  logout()
  {
    localStorage.clear();
  }

  setLocalStorage(key: string, value: string)
  {
    localStorage.setItem(key, value);
  }

  getLocalStorage(key: string): string
  {
    return localStorage.getItem(key) || '';
  }

  getMonthName(id: number, isShort: boolean = false): string
  {
    const month = this.months.find(m => m.id === id);
    if (month)
    {
      return isShort ? month.shortName : month.name;
    }
    return '';
  }

}
