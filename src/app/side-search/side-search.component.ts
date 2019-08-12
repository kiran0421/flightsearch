import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SearchDetails } from '../models/search-details';

@Component({
  selector: 'app-side-search',
  templateUrl: './side-search.component.html',
  styleUrls: ['./side-search.component.css']
})
export class SideSearchComponent implements OnInit {
  way: string;
  form: FormGroup;
  form2: FormGroup;
  minRange: number;
  maxRange: number;
  selectedRange: number;
  today: string;
  departureDate: string;
  searchDetails: SearchDetails;
  @Output() search: EventEmitter<SearchDetails> = new EventEmitter<SearchDetails>();
  constructor() { }

  ngOnInit() {
    this.searchDetails = new SearchDetails();
    this.way = 'twoWay';
    this.selectedRange = 0;
    this.minRange = 0;
    this.maxRange = 10000;
    const datee = new DatePipe('en-us');
    this.today = datee.transform(new Date(),'yyyy-MM-dd');
    this.createFrom();
  }
  createFrom() {
    if(this.way == 'twoWay') {
    this.form = new FormGroup({
      origin : new FormControl('',[Validators.required]),
      destination : new FormControl('',[Validators.required]),
      departureDate : new FormControl('',[Validators.required]),
      returnDate : new FormControl('',[Validators.required]),
      numberOfPassengers : new FormControl('',[Validators.required]),
    });
  } else {
    this.form = new FormGroup({
      origin : new FormControl('',[Validators.required]),
      destination : new FormControl('',[Validators.required]),
      departureDate : new FormControl('',[Validators.required]),
      numberOfPassengers : new FormControl('',[Validators.required]),
    });
  }
    this.form2 = new FormGroup({
      range : new FormControl('',[Validators.required])
    });
    this.form2.get('range').setValue(0);
  }
  selectedWay(way: string) {
    this.way = way;
    this.createFrom();
  }
  selectedDep() {
    this.departureDate = this.form.get('departureDate').value;
  }
  modifyRange() {
    this.selectedRange = this.form2.get('range').value;
  }
  searchFlight(){
   this.searchDetails = new SearchDetails();
   this.searchDetails.searchType = this.way;
   if(this.way=='oneWay') {
    this.searchDetails.returnDate = null;
   } else {
    this.searchDetails.returnDate = this.form.get('returnDate').value;
   }
   this.searchDetails.origin = this.form.get('origin').value.toLowerCase();
   this.searchDetails.destination = this.form.get('destination').value.toLowerCase();
   this.searchDetails.departureDate = this.form.get('departureDate').value;
   this.searchDetails.numberOfPassengers = this.form.get('numberOfPassengers').value;
   this.searchDetails.priceRange = this.form2.get('range').value;
   this.search.emit(this.searchDetails);
  }
  
}
