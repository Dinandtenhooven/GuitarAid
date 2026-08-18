import { Component, inject, input, signal, Type } from "@angular/core";
import { View } from "../../../models/view";
import { CommonModule } from "@angular/common";
import { KeyViewComponent } from "../KeyViewComponent/key-view.component";
import { ViewRendererComponent } from "../../../base/view-renderer/view-renderer.component";
import { UnsetViewComponent } from "../UnsetViewComponent/unset-view.component";
import { BaseViewComponent } from "../BaseViewComponent";
import { SetViewParams } from "../../interfaces/set-view.interface";
import { CompoundLayoutOptions } from "../../../models/settings-options/compound-layout-options";
import { AppService } from "../../../app.service";

@Component({
    selector: 'app-compound-view',
    templateUrl: 'compound-view.component.html',
    styleUrl: 'compound-view.component.scss',
    imports: [
        ViewRendererComponent,
        CommonModule
    ]
})
export class CompoundViewComponent extends BaseViewComponent {


    views = input<View[]>([]);
    layout = signal<string>('vertical');

    addView() {
        this.views().push({
            type: 'unset'
        })
    }

    setView(setView: SetViewParams): void {
        var views = this.views();
        var index = setView.index;

        views[index] = {
            type: setView.type
        }
    }

    setLayout(option: string) {
        this.layout.set(option);
    }

    getWrapperClass(): string {
        return this.layout() === 'editor' ?
            'base-wrapper': '';
        
    }
}