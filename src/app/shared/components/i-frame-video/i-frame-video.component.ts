import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'shared-i-frame-video',
  templateUrl: './i-frame-video.component.html',
  styleUrls: ['./i-frame-video.component.css']
})
export class IFrameVideoComponent {

  domeSanitizer = inject(DomSanitizer)

  @Input() set videoSrc(value: string) {
    this._videoSrc = this.domeSanitizer.bypassSecurityTrustResourceUrl(value)
  }
  _videoSrc: SafeResourceUrl = ''
}
