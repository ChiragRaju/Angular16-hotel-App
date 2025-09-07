import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    //this is without backend
    // this.reservations = this.reservationService.getReservations();

    //this is with backend
    this.reservationService.getReservations().subscribe((data) => {
      this.reservations = data;
    });
  }
  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe(() => {
      console.log('Reservation deleted successfully');
      this.reservations = this.reservations.filter(
        (reservation) => reservation.id !== id
      );
    });
    //this is without backend
    // this.reservationService.deleteReservation(id);
  }
}
