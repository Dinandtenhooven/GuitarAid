import { Component, inject, input, signal } from "@angular/core";
import { View } from "../../../models/view";
import { CommonModule } from "@angular/common";
import { KeyViewComponent } from "../KeyViewComponent/key-view.component";
import { ViewRendererComponent } from "../../../base/view-renderer/view-renderer.component";
import { UnsetViewComponent } from "../UnsetViewComponent/unset-view.component";
import { BaseViewComponent } from "../BaseViewComponent";
import { SetViewParams } from "../../interfaces/set-view.interface";
import { CompoundLayoutOptions } from "../../../models/settings-options/compound-layout-options";
import { AppService } from "../../../app.service";
import { ViewRegistry } from "../../../view-registry";

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
    collapsedViews = signal<Set<View>>(new Set());
    readonly viewTypes = inject(ViewRegistry).keys.filter((type) => type !== 'unset');

    isViewExpanded(view: View): boolean {
        return !this.collapsedViews().has(view);
    }

    toggleView(view: View): void {
        this.collapsedViews.update((collapsedViews) => {
            const nextCollapsedViews = new Set(collapsedViews);

            if (nextCollapsedViews.has(view)) {
                nextCollapsedViews.delete(view);
            } else {
                nextCollapsedViews.add(view);
            }

            return nextCollapsedViews;
        });
    }

    addView() {
        this.views().push({ type: this.viewTypes[0] ?? 'key' });
    }

    setView(setView: SetViewParams): void {
        this.changeType(setView.index, setView.type);
    }

    changeType(index: number, type: string): void {
        const view = this.views()[index];
        if (view) {
            view.type = type;
        }
    }

    removeView(index: number): void {
        const view = this.views()[index];
        this.views().splice(index, 1);

        if (view) {
            this.collapsedViews.update((collapsedViews) => {
                const nextCollapsedViews = new Set(collapsedViews);
                nextCollapsedViews.delete(view);
                return nextCollapsedViews;
            });
        }
    }

    moveView(index: number, direction: -1 | 1): void {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= this.views().length) {
            return;
        }

        const views = this.views();
        [views[index], views[targetIndex]] = [views[targetIndex], views[index]];
    }

    setLayout(option: string) {
        this.layout.set(option);
    }

    getWrapperClass(): string {
        return this.layout() === 'editor' ?
            'base-wrapper': '';
        
    }
}