import { Component, input, signal } from "@angular/core";
import { BaseViewComponent } from "../BaseViewComponent";
import { Key, KEY, SCALE, Scale } from "../../../models/settings-options/key-options";
import { GuitarNeckComponent } from "../../drawings/guitar-neck.component";

@Component({
    selector: 'app-key-view',
    templateUrl: 'key-view.component.html',
    styleUrl: 'key-view.component.scss',
    imports: [
        GuitarNeckComponent
    ]
})
export class KeyViewComponent extends BaseViewComponent {

    keys = KEY;
    scales = SCALE;

    selectedKey = signal<Key>('A');
    selectedScale = signal<Scale>('MAJOR');
    showNeck = signal<boolean>(true);

    setKey(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        
        if(KEY.includes(value as Key)) {
            this.selectedKey.set(value as Key);
        }
    }

    setScale(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        
        if(SCALE.includes(value as Scale)) {
            console.log("working");
            this.selectedScale.set(value as Scale);
        }
    }

    displayGuitarNeck($event: Event) {
        console.log($event);
        const value = ($event.target as HTMLInputElement).checked;
        console.log(value);
        this.showNeck.set(value);
    }

}