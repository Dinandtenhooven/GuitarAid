import { AfterViewInit, Component, effect, inject, input, output, Injector, ViewChild, ViewContainerRef } from "@angular/core";
import { ViewRegistry } from "../../view-registry";
import { SetViewParams } from "../../components/interfaces/set-view.interface";

@Component({
  selector: 'app-view-renderer',
  templateUrl: './view-renderer.component.html',
  styleUrl: './view-renderer.component.scss'
})
export class ViewRendererComponent implements AfterViewInit {

  node = input<string>('');
  index = input<number>(0);

  update = output<SetViewParams>();

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private readonly injector = inject(Injector);
  private readonly registry = inject(ViewRegistry);

  ngAfterViewInit() {
    effect(() => {
      this.render(this.node());
    }, { injector: this.injector });
  }

  private render(type: string): void {
    let componentType = this.registry.get(type);

    if(!componentType) {
      componentType = this.registry.error();
    }

    this.container.clear();
    const ref = this.container.createComponent(componentType);
    ref.instance.index = this.index();
    
    const setView = ref.instance.setView;
    if (setView && typeof setView.subscribe === 'function') {
      setView.subscribe((params: SetViewParams) => {
        this.update.emit(params);
      });
    }
  }

}