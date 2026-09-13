import { Component, computed, input } from '@angular/core';
import { Key, Scale } from '../../models/settings-options/key-options';

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
export class GuitarNeckComponent {

  rootNote = input<Key>('C');
  scale = input<Scale>('MAJOR');
  frets = input(21);


  fretWidth = 45;
  private readonly notes = [
    'C', 'C#', 'D', 'D#', 'E', 'F',
    'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];

  private readonly pitchClasses: Record<string, number> = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3,
    E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8,
    Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11
  };

  private readonly scaleIntervals: Record<Scale, number[]> = {
    MAJOR: [0, 2, 4, 5, 7, 9, 11],
    MINOR: [0, 2, 3, 5, 7, 8, 10],
    PENTATONIC: [0, 3, 5, 7, 10],
    CHROMATIC: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    Blues: [0, 3, 5, 6, 7, 10],
    Ionian: [0, 2, 4, 5, 7, 9, 11],
    Dorian: [0, 2, 3, 5, 7, 9, 10],
    Phrygian: [0, 1, 3, 5, 7, 8, 10],
    Lydian: [0, 2, 4, 6, 7, 9, 11],
    Mixolydian: [0, 2, 4, 5, 7, 9, 10],
    Aeolian: [0, 2, 3, 5, 7, 8, 10],
    Locrian: [0, 1, 3, 5, 6, 8, 10]
  };


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


  fretboard = computed(() => {
    const root = this.pitchClasses[this.rootNote()];
    const intervals = this.scaleIntervals[this.scale()];

    return this.strings.map(string => {

        return Array.from(
          { length: this.frets() + 1 },
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
                intervals.includes(interval)
            };

          }
        );

        });
      });


  getMarkerPosition(fret: number): string {
    return `${((fret + 0.5) / (this.frets() + 1)) * 100}%`;
  }

}