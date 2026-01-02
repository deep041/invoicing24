import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
    message: string;
    type?: 'success' | 'error' | 'info';
}

@Injectable({
    providedIn: 'root'
})

export class ToastService {

    private queue: Toast[] = [];
    private _currentToast = new BehaviorSubject<Toast | null>(null);
    currentToast$ = this._currentToast.asObservable();
    private isShowing = false;

    show(toast: Toast) {
        this.queue.push(toast);
        this.showNext();
    }

    private showNext() {
        if (this.isShowing) return;
        const nextToast = this.queue.shift();
        if (!nextToast) return;

        this.isShowing = true;
        this._currentToast.next(nextToast);

        setTimeout(() => {
            this._currentToast.next(null); // hide current toast
            this.isShowing = false;
            this.showNext(); // show next in queue
        }, 3000); // display duration
    }

}
