import {
  computed,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { IBaseLocalStorageService } from '../interfaces/base-local-storage-service.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseLocalStorageService<T>
  implements IBaseLocalStorageService<T>
{
  private readonly activeDataSource: WritableSignal<T | null>;
  public readonly activeData: Signal<T | null>;
  protected readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.activeDataSource = signal(this.loadFromLocalStorage());
    this.activeData = computed(() => this.activeDataSource());
  }

  private loadFromLocalStorage(): T | null {
    try {
      const storedData = localStorage.getItem(this.storageKey);
      if (storedData) {
        const parsedData: T = JSON.parse(storedData);
        return parsedData;
      }
    } catch (error) {
      console.error(
        'Error loading active program data from localStorage (Signals):',
        error
      );
    }
    return null;
  }

  private saveToLocalStorage(data: T | null): void {
    try {
      if (data) {
        localStorage.setItem(
          this.storageKey,
          JSON.stringify({ ...data, timestamp: Date.now() })
        );
        return;
      }
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error(
        'Error saving active program data to localStorage (Signals):',
        error
      );
    }
  }

  setActiveData(data: T): void {
    this.activeDataSource.set(data);
    this.saveToLocalStorage(data);
  }

  clearActiveData(): void {
    this.activeDataSource.set(null);
    this.saveToLocalStorage(null);
  }

  getActiveDataSnapshot(): T | null {
    return this.activeDataSource();
  }
}
