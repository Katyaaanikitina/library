import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBorderColor]'
})
export class BorderColorDirective {
  borderColor!: string;

  @Input('appBorderColor') tagsNumber!: number;

  constructor(private el: ElementRef) { 
  }

  ngOnInit(): void {
    switch (this.tagsNumber) {
      case 1:
        this.borderColor = 'black';
        break;
      case 2:
        this.borderColor = 'grey';
        break;
      default:
        this.borderColor = 'green';
    }
    
    this.el.nativeElement.style.borderColor = this.borderColor;
  }
}
