import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: NgbModalRef | null = null;

  constructor(private modalService: NgbModal) {}

  open(content: any, options: any = {}) {
    this.modalRef = this.modalService.open(content, options);
    return this.modalRef;
  }

  close() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
