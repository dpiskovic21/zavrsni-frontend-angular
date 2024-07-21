import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messages: MessageService) {}

  showSuccess(poruka: string) {
    this.messages.add({
      severity: 'success',
      summary: 'Uspjeh',
      detail: poruka,
    });
  }

  showError(poruka: string) {
    this.messages.add({
      severity: 'error',
      summary: 'Greška',
      detail: poruka,
    });
  }
}
