import { Component, output } from "@angular/core";
import { ViewRegistry } from "../../../view-registry";
import { SetView, SetViewParams } from "../../interfaces/set-view.interface";
import { BaseViewComponent } from "../BaseViewComponent";

@Component({
    selector: 'app-unset-view',
    templateUrl: 'unset-view.component.html',
    styleUrl: 'unset-view.component.scss'
})
export class UnsetViewComponent extends BaseViewComponent implements SetView {
    
    setView = output<SetViewParams>();

    views: string[] = [];

    constructor() {
        super();
        this.views = new ViewRegistry().keys;
    }

    update(type: string): void {
        this.setView.emit({
            index: this.index, 
            type: type
        });
    }
}