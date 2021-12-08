import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {
  terms = [
    {
      word: 'energy efficient',
      type: 'adjective',
      definition: 'Describing something as having a high energy efficiency'
    },
    {
      word: 'energy efficieny',
      type: 'noun',
      definition: 'A percentage that shows how much input energy is converted to useful output'
    },
    {
      word: 'insulator',
      type: 'noun',
      definition: 'Something that doesn\'t let heat through easily'
    },
    {
      word: 'solar energy',
      type: 'noun',
      definition: 'Energy that is produced by the sun (light and heat)'
    },
    {
      word: 'energy transfer',
      type: 'noun',
      definition: 'The process of moving energy from one place to another'
    },
    {
      word: 'energy transformation',
      type: 'noun',
      definition: 'The process of converting energy from one form to another'
    },
    {
      word: 'side product',
      type: 'noun',
      definition: 'An output product of a process that is not the intended output'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
