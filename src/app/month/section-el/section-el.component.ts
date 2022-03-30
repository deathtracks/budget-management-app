import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/class/base/section';

@Component({
  selector: 'app-section-el',
  templateUrl: './section-el.component.html',
  styleUrls: ['./section-el.component.scss'],
})
export class SectionElComponent implements OnInit {
  @Input() s: Section;
  @Input() totalSection: number;
  @Input() budgetSection: number;

  constructor() { }

  ngOnInit() {}

}
