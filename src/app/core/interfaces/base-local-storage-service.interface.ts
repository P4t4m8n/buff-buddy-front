import { Signal } from '@angular/core';

export interface IBaseLocalStorageService<T> {
  activeData: Signal<T | null>;
  setActiveData(data: T): void;
  clearActiveData(): void;
  getActiveDataSnapshot(): T | null;
}
