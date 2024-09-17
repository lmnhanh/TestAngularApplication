import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appTemplateHover]'
})
export class TemplateHoverDirective implements OnInit {

  @Input({required: true})
  appTemplateHoverFrom!: any[];

  constructor(private _templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.appTemplateHoverFrom.forEach(element => {
      this._viewContainerRef.createEmbeddedView(this._templateRef, { $implicit: element })
    });
  }
}
