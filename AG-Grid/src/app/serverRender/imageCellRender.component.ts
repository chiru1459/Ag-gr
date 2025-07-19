// image-cell-renderer.component.ts
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-image-cell-renderer',
  template: `
    <div class="image-cell">
      <img [src]="imageUrl" class="avatar" alt="user" />
    </div>
  `,
  styles: [
    `
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
    `,
  ],
})
export class ImageCellRendererComponent implements ICellRendererAngularComp {
  imageUrl: string = '';

  agInit(params: any): void {
    this.imageUrl = params.value;
  }

  refresh(): boolean {
    return false;
  }
}
