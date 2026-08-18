import { Component, computed, inject } from "@angular/core";
import { AppService } from "../../app.service";

@Component({
    template: '',
    providers: [
        AppService
    ]
})
export class BaseViewComponent {
    index: number = 0;

    appService = inject(AppService);
    isEditor = computed<boolean>(() => {
        return this.appService.currentState() === 'editor'}
    );

    
}