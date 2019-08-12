import { Component, OnInit } from '@angular/core';
import { projectLabels } from 'src/environments/flight-search-engine-labels';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  title: string;
  constructor() { }

  ngOnInit() {
    this.title = projectLabels.title;
  }

}
