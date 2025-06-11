import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../services/match/match.service';
import { Match } from '../../types/match';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthDays: (number | null)[] = [];
  monthName!: string;
  currentYear!: number;
  currentDay = new Date().getDate();
  selectedDay: number | null = null;
  matches: Match[] = [];
  matchesByDate: { [key: string]: Match[] } = {};

  constructor(private matchService: MatchService) {}

  // Nueva propiedad para verificar si es el mes actual
  get isCurrentMonth(): boolean {
    return this.currentDate.getMonth() === new Date().getMonth() && 
           this.currentYear === new Date().getFullYear();
  }

  async ngOnInit() {
    await this.loadMatches();
    this.updateCalendar();
  }

  async loadMatches() {
    try {
      this.matches = await this.matchService.getAllMatches();
      this.groupMatchesByDate();
    } catch (error) {
      console.error('Error loading matches:', error);
    }
  }

  groupMatchesByDate() {
    this.matchesByDate = {};
    this.matches.forEach(match => {
      const date = new Date(match.match_date);
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      
      if (!this.matchesByDate[dateKey]) {
        this.matchesByDate[dateKey] = [];
      }
      this.matchesByDate[dateKey].push(match);
    });
  }

  updateCalendar() {
    const month = this.currentDate.getMonth();
    this.monthName = this.currentDate.toLocaleString('es', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();

    const firstDay = new Date(this.currentYear, month, 1).getDay();
    const totalDays = new Date(this.currentYear, month + 1, 0).getDate();

    this.monthDays = Array(firstDay).fill(null).concat(
      [...Array(totalDays).keys()].map(d => d + 1)
    );
  }

  changeMonth(value: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + value);
    this.selectedDay = null;
    this.updateCalendar();
  }

  selectDay(day: number | null) {
    if (!day) return;
    
    this.selectedDay = day;
  }

  getMatchesForSelectedDay(): Match[] {
    if (!this.selectedDay) return [];
    
    const dateKey = `${this.currentYear}-${this.currentDate.getMonth()}-${this.selectedDay}`;
    return this.matchesByDate[dateKey] || [];
  }

  hasMatches(day: number | null): boolean {
    if (!day) return false;
    
    const dateKey = `${this.currentYear}-${this.currentDate.getMonth()}-${day}`;
    return !!this.matchesByDate[dateKey];
  }

  formatMatchTime(date: Date): string {
    return new Date(date).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
}