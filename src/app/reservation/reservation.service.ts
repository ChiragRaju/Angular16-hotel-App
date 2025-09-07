import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  //this is the api url took from Mockoon app link: https://mockoon.com/download/
  //create a new environment and start the server

  private apiUrl = 'http://localhost:3001';
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {
    // let savedReservations = localStorage.getItem('reservations');
    // this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  getReservations(): Observable<Reservation[]> {
    // return this.reservations;
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`);
  }

  getReservationById(id: string): Observable<Reservation | undefined> {
    // return this.reservations.find((reservation) => reservation.id === id);
    return this.http.get<Reservation>(`${this.apiUrl}/reservations/${id}`);
  }

  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reservations`, reservation);
    // this is without backend
    // reservation.id = Date.now().toString();
    // reservation.id = Math.random().toString(36).substring(2, 9);
    // this.reservations.push(reservation);
    // localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reservations/${id}`);
    // let index = this.reservations.findIndex((res) => res.id === id);
    // if (index !== -1) {
    //   this.reservations.splice(index, 1);
    // }
  }

  updateReservation(
    id: string,
    updatedReservation: Reservation
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/reservations/${id}`,
      updatedReservation
    );

    //this is without backend
    // let index = this.reservations.findIndex((res) => res.id === id);
    // this.reservations[index] = updatedReservation;
    // localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
