import { Injectable, Type } from "@angular/core";
import { KeyViewComponent } from "./components/Views/KeyViewComponent/key-view.component";
import { ErrorViewComponent } from "./components/Views/ErrorViewComponent/error-view.component";
import { UnsetViewComponent } from "./components/Views/UnsetViewComponent/unset-view.component";
import { CompoundViewComponent } from "./components/Views/CompoundViewComponent/compound-view.component";
import { SongOrderViewComponent } from "./components/Views/SongOrderViewComponent/SongOrderView.component";

@Injectable({ providedIn: 'root' })
export class ViewRegistry {
  
  private readonly registry = new Map<string, Type<any>>([
    ['compound', CompoundViewComponent],
    ['key', KeyViewComponent],
    ['song-order', SongOrderViewComponent],
    ['unset', UnsetViewComponent]
  ]);

  get keys(): string[] { 
    return [...this.registry.keys()];
  }

  get(type: string): Type<any> | undefined {
    return this.registry.get(type);
  }

  error(): Type<any> {
    return ErrorViewComponent;
  }
}