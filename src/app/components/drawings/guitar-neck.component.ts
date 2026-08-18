import { Component, Input, OnChanges, OnInit } from '@angular/core';

interface FretNote {
  fret: number;
  note: string;
  highlighted: boolean;
}

@Component({
  selector: 'app-guitar-neck',
  standalone: true,
  templateUrl: './guitar-neck.component.html',
  styleUrl: './guitar-neck.component.scss'
})
export class GuitarNeckComponent implements OnInit {

  @Input() rootNote = 'C';

  // Major scale by default
  @Input() scale: number[] = [
    0, 2, 4, 5, 7, 9, 11
  ];

  @Input() frets = 21;


  fretWidth = 45;
  notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
  ];


  // MIDI values for guitar strings
  strings = [
    { name: 'High E', midi: 64 },
    { name: 'B', midi: 59 },
    { name: 'G', midi: 55 },
    { name: 'D', midi: 50 },
    { name: 'A', midi: 45 },
    { name: 'Low E', midi: 40 }
  ];


  markerFrets = [
    3,
    5,
    7,
    9,
    12,
    15,
    17,
    19,
    21
  ];


  fretboard: FretNote[][] = [];


  ngOnInit() {
    this.buildNeck();
  }


  buildNeck() {

    const root =
      this.notes.indexOf(this.rootNote);


    this.fretboard =
      this.strings.map(string => {

        return Array.from(
          { length: this.frets + 1 },
          (_, fret) => {

            const noteIndex =
              (string.midi + fret) % 12;


            const note =
              this.notes[noteIndex];


            const interval =
              (noteIndex - root + 12) % 12;


            return {
              fret,
              note,
              highlighted:
                this.scale.includes(interval)
            };

          }
        );

      });

  }


  getMarkerPosition(fret: number): string {
    return `${((fret + 0.5) / (this.frets + 1)) * 100}%`;
  }

}