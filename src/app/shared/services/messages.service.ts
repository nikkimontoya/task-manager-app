import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    constructor(private messageService: MessageService) {}

    showError() {
        this.messageService.add({
            severity: 'error',
            summary: 'Something went wrong',
            detail: 'Please, try later'
        });
    }
}
