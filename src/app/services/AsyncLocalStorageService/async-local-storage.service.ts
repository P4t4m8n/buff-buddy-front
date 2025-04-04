import { Injectable } from '@angular/core';
import { TEntity } from '../../core/types/app.type';

@Injectable({
  providedIn: 'root',
})
export class AsyncLocalStorageService {
  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  async query<T extends TEntity>(key: string): Promise<T[]> {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  async get<T extends TEntity>(key: string, id: string): Promise<T | null> {
    const data = await this.query<T>(key);
    return data.find((item) => item.id === id) || null;
  }

  async post<T extends TEntity>(key: string, item: T): Promise<T> {
    const data = await this.query<T>(key);
    data.push({ ...item, id: this.makeId() });
    localStorage.setItem(key, JSON.stringify(data));
    return item;
  }

  async put<T extends TEntity>(key: string, item: T): Promise<T> {
    const data = await this.query<T>(key);
    const index = data.findIndex((i) => i.id === item.id);
    data[index] = item;
    localStorage.setItem(key, JSON.stringify(data));
    return item;
  }

  async remove<T extends TEntity>(key: string, id: string): Promise<void> {
    const data = await this.query<T>(key);
    const index = data.findIndex((i) => i.id === id);
    data.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(data));
  }

  private makeId(length: number = 10): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
