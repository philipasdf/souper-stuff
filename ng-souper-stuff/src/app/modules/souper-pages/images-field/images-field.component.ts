import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {StuffImg} from '../../../services/images/stuff-img';
import {SouperSessionService} from '../../../services/session/souper-session.service';

@Component({
  selector: 'app-images-field',
  templateUrl: './images-field.component.html',
  styleUrls: ['./images-field.component.css']
})
export class ImagesFieldComponent implements OnInit {

  @Input() existingFiles: StuffImg[];
  @Output() fileUploaded = new EventEmitter();

  readonly addPhotoIconUrl = 'assets/baseline_add_a_photo_black_48dp.png';

  /**
   * access to Observable data, allows us to pause, cancel or resume an upload
   */
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(private firestorage: AngularFireStorage, private sessionService: SouperSessionService) { }

  ngOnInit() {
    console.log(this.existingFiles);
    if (this.existingFiles !== undefined && this.existingFiles !== null && this.existingFiles.length > 0) {
      // single upload to KISS
      this.downloadURL = this.fetchDownloadURL(this.existingFiles[0].path);
    }
  }

  onUploadFile($event) {
    // single upload to KISS
    const file = $event.target.files[0];

    // only images
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type');
      return;
    }

    const storagePath = `${new Date().getTime()}_${file.name}`;


    this.task        = this.firestorage.upload(storagePath, file);
    this.percentage  = this.task.percentageChanges();
    this.snapshot    = this.task.snapshotChanges().pipe(
      tap(snapshot => {
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          const result: StuffImg = {
            path: storagePath,
            fileSize: snapshot.totalBytes
          };
          this.fileUploaded.emit(result); // will be emittet two times!
        }
      })
    );
    this.snapshot.pipe(finalize(() => this.downloadURL = this.fetchDownloadURL(storagePath))).subscribe();
  }

  isUploadActive(snapshot) {
    return snapshot.bytesTransferred < snapshot.totalBytes;
  }

  fetchDownloadURL(path: string): Observable<string> {
    return this.firestorage.ref(path).getDownloadURL();
  }

}
