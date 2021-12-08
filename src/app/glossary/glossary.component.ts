import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
})
export class GlossaryComponent implements OnInit {
  terms = [
    {
      word: 'energy efficient',
      type: 'adjective',
      definition: 'Describing something as having a high energy efficiency',
    },
    {
      word: 'energy efficiency',
      type: 'noun',
      definition:
        'A percentage that shows how much input energy is converted to useful output',
    },
    {
      word: 'insulator',
      type: 'noun',
      definition: 'A material that prevents energy transfer',
    },
    {
      word: 'solar energy',
      type: 'noun',
      definition: 'Energy that is produced by the sun (light and heat)',
    },
    {
      word: 'energy transfer',
      type: 'noun',
      definition: 'The process of moving energy from one place to another',
    },
    {
      word: 'energy transformation',
      type: 'noun',
      definition: 'The process of converting energy from one form to another',
    },
    {
      word: 'side product',
      type: 'noun',
      definition:
        'An output product of a process that is not the intended output',
    },
  ].sort((x, y) => x.word.localeCompare(y.word));

  displayedTerms = [];

  searchTerm = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.displayedTerms = this.terms;
    this.searchTerm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((key) => {
        if (!key) this.displayedTerms = this.terms;
        this.displayedTerms = this.terms
          .map((x) => {
            let titleMatch = false;
            let titleContains = false;
            let definitionContains = (
              x.definition.match(new RegExp(key, 'g')) || []
            ).length;
            if (x.word === key) titleMatch = true;
            if (x.word.includes(key)) titleContains = true;
            return {
              value: x,
              titleMatch: titleMatch,
              titleContains: titleContains,
              definitionContains: definitionContains,
            };
          })
          .filter(
            (x) => x.titleMatch || x.titleContains || x.definitionContains
          )
          .sort((x, y) => {
            if (x.titleMatch && !y.titleMatch) return -1;
            if (!x.titleMatch && y.titleMatch) return 1;
            if (x.titleContains && !y.titleContains) return -1;
            if (!x.titleContains && y.titleContains) return 1;
            const defDiff = x.definitionContains - y.definitionContains;
            if (defDiff) return defDiff;
            return x.value.word.localeCompare(y.value.word);
          })
          .map((x) => x.value);
      });
  }
}
