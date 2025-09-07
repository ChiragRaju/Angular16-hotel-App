import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomNumber: ['', [Validators.required, Validators.min(1)]],
    });
    const reservationId = this.route.snapshot.paramMap.get('id');
    if (reservationId) {
      // this is without backend
      // const reservation =
      //   this.reservationService.getReservationById(reservationId);

      // this is with backend
      this.reservationService
        .getReservationById(reservationId)
        .subscribe((reservation) => {
          if (reservation) this.reservationForm.patchValue(reservation);
        });

      //this is used to populate the form with existing reservation data for editing
      // if (reservation) {
      //   this.reservationForm.patchValue(reservation);
      // }
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  reservationForm: FormGroup = new FormGroup({});

  onSubmit() {
    let reservation: Reservation = this.reservationForm.value;
    const reservationId = this.route.snapshot.paramMap.get('id');
    if (reservationId) {
      this.reservationService
        .updateReservation(reservationId, reservation)
        .subscribe(() => {
          console.log('Reservation updated successfully');
        });
      // Update
      // this is without backend
      // this.reservationService.updateReservation(reservationId, reservation);
    } else {
      // Add
      // this is with backend
      this.reservationService.addReservation(reservation).subscribe(() => {
        console.log('Reservation added successfully');
      });
      // this is without backend
      // this.reservationService.addReservation(reservation);
    }

    this.router.navigate(['/list']);
    console.log('Reservation added:', reservation);
  }
}
