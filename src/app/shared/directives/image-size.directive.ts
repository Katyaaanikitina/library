import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImageSize]'
})
export class ImageSizeDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  
  ngOnInit(): void {
    this.renderer.listen(this.el.nativeElement,'load', () => {
      
      const isImgHorizontal = this.el.nativeElement.width > this.el.nativeElement.height;
      if (isImgHorizontal) this.el.nativeElement.style.width = '100%';
      else this.el.nativeElement.style.height = '100%';
    })
  }
}
