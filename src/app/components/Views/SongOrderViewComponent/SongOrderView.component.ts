import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseViewComponent } from '../BaseViewComponent';

type SongSectionType = 'Verse' | 'Chorus' | 'Bridge' | 'Intro' | 'Outro' | 'Solo';

interface SongMeasure {
  id: string;
  time: number;
  beats: string[];
}

interface SongSection {
  id: string;
  name: string;
  type: SongSectionType;
  measures: SongMeasure[];
  timeSignature: string;
  repeats: number;
}

type TimePart = 'numerator' | 'denominator';

@Component({
  selector: 'app-song-order-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './SongOrderView.component.html',
  styleUrls: ['./SongOrderView.component.scss']
})
export class SongOrderViewComponent extends BaseViewComponent {

  sections: SongSection[] = [];
  dragIndex: number | null = null;
  chordEditor: { sectionId: string; measureId: string; beatIndex: number } | null = null;
  chordRoot = 'C';
  chordQuality = '';
  chordExtensions: string[] = [];

  readonly chordRoots = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  readonly chordQualities = [
    { label: 'Major', value: '' },
    { label: 'Minor', value: 'm' },
    { label: 'Dominant 7', value: '7' },
    { label: 'Major 7', value: 'maj7' },
    { label: 'Minor 7', value: 'm7' },
    { label: 'Diminished', value: 'dim' }
  ];
  readonly chordExtensionOptions = ['add9', '6', 'sus2', 'sus4'];

  addSection(type: SongSectionType): void {
    const label = `${type} ${this.sections.filter((section) => section.type === type).length + 1}`;

    this.sections.push({
      id: this.createId(),
      name: label,
      type,
      timeSignature: '4/4',
      repeats: 4,
      measures: [
        { id: this.createId(), time: 1, beats: ['', '', '', ''] },
        { id: this.createId(), time: 2, beats: ['', '', '', ''] },
        { id: this.createId(), time: 3, beats: ['', '', '', ''] },
        { id: this.createId(), time: 4, beats: ['', '', '', ''] }
      ]
    });
  }

  removeSection(sectionId: string): void {
    this.sections = this.sections.filter((section) => section.id !== sectionId);
  }

  onDragStart(index: number): void {
    this.dragIndex = index;
  }

  onDrop(targetIndex: number): void {
    if (this.dragIndex === null || this.dragIndex === targetIndex) {
      this.dragIndex = null;
      return;
    }

    const [movedItem] = this.sections.splice(this.dragIndex, 1);
    this.sections.splice(targetIndex, 0, movedItem);
    this.dragIndex = null;
  }

  private createId(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }
  
  changeSectionBeat(event: Event, measure: SongMeasure, beatIndex: number): void {
    const input = event.target as HTMLInputElement;
    measure.beats[beatIndex] = input.value;
  }

  changeTimeMeasures(section: SongSection, value: number | string, part: TimePart): void {
    const parsedValue = Math.max(1, Number(value) || 1);
    const [currentNumerator, currentDenominator] = section.timeSignature.split('/').map(Number);
    const numerator = part === 'numerator' ? parsedValue : currentNumerator || 4;
    const denominator = part === 'denominator' ? parsedValue : currentDenominator || 4;

    section.timeSignature = `${numerator}/${denominator}`;
    section.measures.forEach((measure) => {
      measure.beats = Array.from(
        { length: numerator },
        (_, beatIndex) => measure.beats[beatIndex] ?? ''
      );
    });
  }

  getTimePart(section: SongSection, part: TimePart): number {
    const [numerator, denominator] = section.timeSignature.split('/').map(Number);
    return part === 'numerator' ? numerator || 4 : denominator || 4;
  }

  openChordBuilder(sectionId: string, measureId: string, beatIndex: number, chord: string): void {
    this.chordEditor = { sectionId, measureId, beatIndex };
    const match = chord.match(/^([A-G](?:#|b)?)(maj7|m7|m|7|dim)?(.*)$/);
    this.chordRoot = match?.[1] ?? 'C';
    this.chordQuality = match?.[2] ?? '';
    this.chordExtensions = match?.[3]
      ? this.chordExtensionOptions.filter((extension) => match[3].includes(extension))
      : [];
  }

  closeChordBuilder(): void {
    this.chordEditor = null;
  }

  toggleChordExtension(extension: string): void {
    this.chordExtensions = this.chordExtensions.includes(extension)
      ? this.chordExtensions.filter((item) => item !== extension)
      : [...this.chordExtensions, extension];
  }

  applyChord(): void {
    if (!this.chordEditor) {
      return;
    }

    const section = this.sections.find((item) => item.id === this.chordEditor?.sectionId);
    const measure = section?.measures.find((item) => item.id === this.chordEditor?.measureId);
    if (!measure) {
      return;
    }

    measure.beats[this.chordEditor.beatIndex] = `${this.chordRoot}${this.chordQuality}${this.chordExtensions.join('')}`;
    this.closeChordBuilder();
  }

}
