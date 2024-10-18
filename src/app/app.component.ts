import { Component } from '@angular/core';
import { interval, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FileUploadSource } from './file-upload/models/upload-source';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  _allowMultiple = true;
  _showCaption = false;
  _throwError = false;
  _showStatusBar = false;

  _uploadSource: FileUploadSource = {
    upload: (file: File, uploadItemId: number) => {
      let progress = 0;
      return interval(1000).pipe(
        finalize(() =>
          console.log(`Upload stream complete: [${uploadItemId}][${file.name}]`)
        ),
        map(() => {
          progress += Math.floor(Math.random() * 10 + 1);

          if ((uploadItemId === 2 || uploadItemId === 4) && progress > 50) {
            throw new Error('Error uploading file');
          }

          /* if (file.type === 'application/pdf') {
            throw new Error('File type not supported');
          } */

          return Math.min(progress, 100);
        })
      );
    },
    delete: (uploadItemId: number) => {
      return of(uploadItemId);
    },
  };
}
