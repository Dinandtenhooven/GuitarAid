import { Injectable, input, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppService {

    currentState = signal('editor');

    

}