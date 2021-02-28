import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalStateService {
    private quizMode = false;

    setQuizMode(enabled: boolean) {
        this.quizMode = enabled;
    }

    getQuizMode() {
        return this.quizMode;
    }
}
