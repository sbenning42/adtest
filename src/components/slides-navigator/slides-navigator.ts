import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SlidesNavigatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'slides-navigator',
  templateUrl: 'slides-navigator.html'
})
export class SlidesNavigatorComponent {

  @Input() steps: {icon: string, color: string, isCompleted: boolean}[];

  stepNoMirror: number;
  @Input()
    set stepNo(no: number) { this.stepNoMirror = no; };
    get stepNo(): number { return this.stepNoMirror; }

  @Output() gotoEvent = new EventEmitter();

  constructor() {
    console.log('Hello SlidesNavigatorComponent Component');
  }

  goto(index: number) {
    this.gotoEvent.emit(index);
  }

}
