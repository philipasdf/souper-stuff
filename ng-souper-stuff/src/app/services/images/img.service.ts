import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {StuffImg} from './stuff-img';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ImgService {

  // path configured in firebase resize images extension console
  resizedFolder = 'resized/';
  suffix200 = '_200x200';
  suffix500 = '_500x500';

  possibleExtensions = ['.jpeg', '.jpg', '.png'];

  constructor(private firestorage: AngularFireStorage) {
  }

  getImgSize500(originalPath: string): Observable<string> {
    const path = this.convertPath(originalPath, this.suffix500);
    return this.firestorage.ref(path).getDownloadURL();
  }

  getImgSize200(image: StuffImg): Observable<string> {
    const path = this.convertPath(image.path, this.suffix200);
    return this.firestorage.ref(path).getDownloadURL();
  }

  /**
   * example:
   * [foopath.extension] -> [resizedfolder]/[foopath][_size].extension
   * foopath.jpg -> thumbnails/foopath_200x200.jpg
   */
  private convertPath(originalPath: string, suffix: string) {

    let extensionPosition = -1;
    const extension = this.possibleExtensions.filter(ext => {
      const pos = originalPath.toLowerCase().search(ext);
      if (pos > -1) {
        extensionPosition = pos;
        return ext;
      }
    });
    return this.resizedFolder + originalPath.slice(0, extensionPosition) + suffix + extension;
  }
}
