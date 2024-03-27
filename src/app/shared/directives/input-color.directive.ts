import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appInputColor]'
})
export class InputColorDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keyup') onInput() {
    if (this.el.nativeElement.value.length > 5) {
      this.el.nativeElement.style.borderColor = 'green';
    } else {
      this.el.nativeElement.style.borderColor = null;
    } 
  }
}
