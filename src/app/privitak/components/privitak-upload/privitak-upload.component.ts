import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { PrivitakService } from '../../services/privitak.service';

@Component({
  selector: 'privitak-upload',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './privitak-upload.component.html',
  styleUrl: './privitak-upload.component.css',
})
export class PrivitakUploadComponent {
  @Input() zadatakId!: number;
  @Output() privitakUpload = new EventEmitter<void>();
  constructor(private privitakServis: PrivitakService) {}

  upload(datoteka: any) {
    const file: File = datoteka.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('zadatakId', this.zadatakId.toString());

      this.privitakServis.postPrivitak(formData).subscribe({
        next: (r) => this.privitakUpload.emit(),
        error: (err) => console.log(err),
      });
    }
  }
}
