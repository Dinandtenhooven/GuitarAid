import { output, OutputEmitterRef } from "@angular/core";

export interface SetView {
     setView: OutputEmitterRef<SetViewParams>;
}

export class SetViewParams {
  index: number = 0;
  type: string = '';
}

function isSetView(value: unknown): value is SetView {
  return (
    typeof value === "object" &&
    value !== null &&
    "setView" in value
  );
}