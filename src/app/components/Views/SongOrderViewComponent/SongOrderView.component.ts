import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
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
  
  changeSectionBeat($event: any) {
    console.log('changeSectionBeat', $event);
  }

  changeTimeMeasures(section: SongSection) {
    console.log(this.sections);
  }

}
