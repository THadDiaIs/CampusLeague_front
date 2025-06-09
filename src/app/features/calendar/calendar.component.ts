import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [RouterLink, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  currentDate = new Date();
  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthDays: number[] = [];
  monthName!: string;
  currentYear!: number;
  currentDay = new Date().getDate();
  selectedDay: number | null = null;
  selectedEvent: { day: number, description: string } | null = null;

  events = [
    { day: 5, description: 'Reunión de equipo' }
  ];

  ngOnInit() {
    this.updateCalendar();
  }

  updateCalendar() {
    let month = this.currentDate.getMonth();
    this.monthName = this.currentDate.toLocaleString('es', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();

    let firstDay = new Date(this.currentYear, month, 1).getDay();
    let totalDays = new Date(this.currentYear, month + 1, 0).getDate();

    this.monthDays = Array(firstDay).fill(null).concat([...Array(totalDays).keys()].map(d => d + 1));
  }

  changeMonth(value: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + value);
    this.selectedEvent = null;
    this.selectedDay = null;
    this.updateCalendar();
  }

  selectDay(day: number) {
    this.selectedDay = day;
    let event = this.events.find(e => e.day === day);
    this.selectedEvent = event || { day, description: 'Sin eventos programados' };
  }
}
