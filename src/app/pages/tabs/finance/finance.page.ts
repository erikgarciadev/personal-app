import { Component, OnInit } from '@angular/core';
import { FREQUENCIES, options_frequencies } from 'src/app/utils/constants';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  optionsFrequencies = options_frequencies;
  selectedFrequency: string = FREQUENCIES.DAILY;

  constructor() {}

  ngOnInit() {}

  handleSelectFrequency(frequency: string) {
    this.selectedFrequency = frequency;
  }
}
