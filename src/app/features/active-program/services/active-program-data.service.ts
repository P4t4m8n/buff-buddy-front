import {
  computed,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { IActiveProgramData } from '../models/active-program-data';

const LOCAL_STORAGE_KEY = 'activeProgramData';

@Injectable({
  providedIn: 'root',
})
export class ActiveProgramDataService {
  // Private writable signal to hold the state
  private readonly activeDataSource: WritableSignal<IActiveProgramData | null>;
  // Public readonly signal for components to consume
  public readonly activeData: Signal<IActiveProgramData | null>;

  constructor() {
    this.activeDataSource = signal(this.loadFromLocalStorage());
    this.activeData = computed(() => this.activeDataSource());


  }

  private loadFromLocalStorage(): IActiveProgramData | null {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const parsedData: IActiveProgramData = JSON.parse(storedData);
        // Optional: Add timestamp validation here if needed
        return parsedData;
      }
    } catch (error) {
      console.error(
        'Error loading active program data from localStorage (Signals):',
        error
      );
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    return null;
  }

  private saveToLocalStorage(data: IActiveProgramData | null): void {
    try {
      if (data) {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ ...data, timestamp: Date.now() })
        );
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch (error) {
      console.error(
        'Error saving active program data to localStorage (Signals):',
        error
      );
    }
  }

  setActiveData(data: IActiveProgramData): void {
    this.activeDataSource.set(data);
    this.saveToLocalStorage(data);
  }

  clearActiveData(): void {
    this.activeDataSource.set(null);
    this.saveToLocalStorage(null);
  }

  getActiveDataSnapshot(): IActiveProgramData | null {
    return this.activeDataSource();
  }
}
