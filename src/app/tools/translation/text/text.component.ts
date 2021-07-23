import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit,OnDestroy {
  @Input() id: string;

  public text: string;
  private translationSub: Subscription;
  constructor(
    private translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.translationSub = this.translation.translation
    .subscribe(value => this.text = this.translation.getText(this.id));
    this.translation.updateTranslation();
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }

}
