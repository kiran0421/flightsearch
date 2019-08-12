import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../models/flight';
import { SearchDetails } from '../models/search-details';

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['./content-body.component.css']
})
export class ContentBodyComponent implements OnInit {
  @Input("flights") flights: Array<Flight> = new Array<Flight>();
  @Input("searchDetails") searchDetails: SearchDetails;
  constructor() { }

  ngOnInit() {
  }

}
