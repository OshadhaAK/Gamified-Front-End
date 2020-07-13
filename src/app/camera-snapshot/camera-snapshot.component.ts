import { Component, OnInit, ViewChild, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BlockUiService } from '../services/block-ui.service'
import { from } from 'rxjs';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-camera-snapshot',
  templateUrl: './camera-snapshot.component.html',
  styleUrls: ['./camera-snapshot.component.css']
})
export class CameraSnapshotComponent implements OnInit {

  faCamera = faCamera;
  private mediaStream: any;
  @Input() imageUrl: string;
  @Output() imageCreated = new EventEmitter();
  @ViewChild('video') private video: any;
  @ViewChild('canvas') private canvas: any;

  constructor(private ref: ChangeDetectorRef, private blockUI: BlockUiService) { }

  ngOnInit(): void {
  }

  getCameraImage() {
    // block UI and reset image
    this.blockUI.start();
    this.imageUrl = undefined;
    this.imageCreated.emit(undefined);

    // request access to camera for video
    navigator.getUserMedia(
      {video:true},
      mediaStream => {
        this.mediaStream = mediaStream;
        this.video.nativeElement.srcObject = mediaStream;
        setTimeout(() => {
          // create screenshot and emit as dataUrl
          var ctx = this.canvas.nativeElement.getContext('2d');
          ctx.drawImage(this.video.nativeElement, 0, 0);
          this.imageUrl = this.canvas.nativeElement.toDataURL('image/jpeg', 1.0)
          this.imageCreated.emit(this.imageUrl);
          
          //stop video and blockUI
          this.mediaStream.getVideoTracks()[0].stop();
          this.blockUI.stop();
          this.ref.detectChanges();
        }, 3000);
      },
      error => {});
  }
  
}
