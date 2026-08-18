import { AfterViewInit, Component, input, Input, output, ViewChild, ViewContainerRef } from "@angular/core";
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

  constructor(private registry: ViewRegistry) {}

  ngAfterViewInit() {
    let componentType = this.registry.get(this.node());

    if(!componentType) {
      componentType = this.registry.error();
    }

    const ref = this.container.createComponent(componentType);
    console.log(this.index());
    ref.instance.index = this.index();
    
    if("setView" in ref.instance) {
      ref.instance.setView.subscribe((params: SetViewParams) => {
        this.update.emit(params);
      });
    }
  }

}