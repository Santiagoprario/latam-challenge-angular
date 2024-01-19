import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: ` <button (click)="handleClick()" [disabled]="disabled">{{ label }}</button>`,
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() onClick: () => void = () => {};
  @Input() disabled: boolean = false;

  handleClick(): void {
    this.onClick();
  }
}
