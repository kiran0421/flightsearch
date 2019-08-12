import { Component, OnInit } from '@angular/core';
import { SearchDetails } from './models/search-details';
import { Flight } from './models/flight';
import { FlightsService } from './services/flights.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FlightSearchEngine';
  flights: Array<Flight> = new Array<Flight>();
  filteredFlights: Array<Flight> = new Array<Flight>();
  searchDetails: SearchDetails;
  constructor(private flightsService: FlightsService) {

  }
  ngOnInit() {
    this.getFlights();
  }
  search(searchDetails: SearchDetails) {
    this.searchDetails = searchDetails;
    console.log(searchDetails);
    this.filteredFlights = new Array<Flight>();
    this.flights.forEach(element => {
      if (element.source == this.searchDetails.origin && element.destination == this.searchDetails.destination) {
        if (this.searchDetails.priceRange == 0) {
          this.filteredFlights.push(element);
        } else if (this.searchDetails.searchType == 'oneWay') {
          if (this.searchDetails.priceRange >= element.toFare) {
            this.filteredFlights.push(element);
          }
        } else if (this.searchDetails.searchType == 'twoWay') {
          if (this.searchDetails.priceRange >= element.toFroFare) {
            this.filteredFlights.push(element);
          }
        }
      }
    });
  }
  getFlights() {
    this.flightsService.getFlights().subscribe(
      (res) => {
        //@ts-ignore
        this.flights = res;
      },
      (err) => { console.log(err); },
      () => {
        console.log(this.flights);
      }
    );
  }
}
