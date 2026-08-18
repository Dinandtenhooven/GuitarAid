export const KEY = [
  "Ab", "A", "A#",
  "Bb", "B",
  "C", "C#",
  "Db", "D", "D#",
  "Eb", "E",
  "F", "F#",
  "Gb", "G", "G#",
] as const;

export const SCALE = [
  'MAJOR', 
  'MINOR',
  'PENTATONIC',
  'CHROMATIC',
  "Blues",
  "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian",
] as const;

export type Key = typeof KEY[number];

export type Scale = typeof SCALE[number];

