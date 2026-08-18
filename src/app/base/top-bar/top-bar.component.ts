import { Component, inject } from "@angular/core";
import { AppService } from "../../app.service";

@Component({
    selector: 'app-top-bar',
    templateUrl: 'top-bar.component.html',
    styleUrl: 'top-bar.component.scss'
})
export class TopBarComponent {
    
    appService = inject(AppService);
    
    onChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        
        this.appService.currentState.set(value);
    }

}