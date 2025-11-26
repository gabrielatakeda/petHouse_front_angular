import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slugify', standalone: true })
export class SlugifyPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}