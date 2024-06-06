import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export class BreadCrumItem {
  private _id: number;
  private _text: string;
  private _link: string;

  constructor(level: number, text: string, link: string) {
    this._id = level;
    this._text = text;
    this._link = link;
  }

  get level(): number{
    return this._id;
  }

  get text(): string{
    return this._text;
  }

  get link(): string{
    return this._link;
  }
}

@Component({
  selector: 'app-breadcrum',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss'],
})
export class BreadcrumComponent implements OnInit {
  @Input()
  items!: BreadCrumItem[];
  @Input()
  seperator?: string;

  defaultSeperator: string = 'chevron_right';

  constructor() {}
  ngOnInit(): void {
    console.log(this.items.length);
  }
}
