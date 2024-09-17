import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHightlightHover]',
})
export class HightlightHoverDirective {
  private _classNames: Set<string> = new Set<string>();
  @Input('active') set activeClass(className: string) {
    this.addClass(className);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setHoverEffect();
  }

  // Listen for mouseleave event
  @HostListener('mouseleave') onMouseLeave() {
    this.removeHoverEffect();
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
    this.addClass('text-blue-500')
  }

  private setHoverEffect(): void {
    this._classNames.forEach((className) => {
      this._renderer.addClass(this._el.nativeElement, className);
    });
  }

  private removeHoverEffect(): void {
    this._classNames.forEach((className) => {
      this._renderer.removeClass(this._el.nativeElement, className);
    });
  }

  public addClass(className: string): void {
    className.split(' ').forEach((x) => this._classNames.add(x));
  }

  public clearClass(): void {
    this._classNames.clear();
  }
}
