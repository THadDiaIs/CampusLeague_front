import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [NgClass],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css',
})
export class QuoteComponent implements OnInit, OnDestroy {
  @Input() authorSize: string = 'text-3xl';
  @Input() quoteSize: string = 'text-4xl';

  phrases = [
    { author: 'Pep Guardiola', quote: 'El talento depende de la inspiración, pero el esfuerzo depende de cada uno.' },
    { author: 'San Juan Bosco', quote: 'Que los jóvenes no solo jueguen para divertirse, sino para aprender a ser mejores.' },
    { author: 'San Juan Bosco', quote: 'El deporte no solo forja cuerpos fuertes, sino también almas valientes.' },
    { author: 'Michael Jordan', quote: 'El talento gana partidos, pero el trabajo en equipo y la inteligencia ganan campeonatos.' },
    { author: 'Nelson Mandela', quote: 'La educación es el arma más poderosa que puedes usar para cambiar el mundo.' },
    { author: 'Jim Rohn', quote: 'La disciplina es el puente entre las metas y los logros.' },
    { author: 'Magic Johnson', quote: 'No preguntes qué puede hacer tu equipo por ti. Pregunta qué puedes hacer tú por tu equipo.' },
    { author: 'Nelson Mandela', quote: 'El deporte tiene el poder de transformar el mundo. Tiene el poder de inspirar, de unir a las personas de una manera que pocas cosas lo hacen.' },
    { author: 'Vince Lombardi', quote: 'Ganar no lo es todo, pero querer ganar sí lo es.' },
    { author: 'Vince Lombardi', quote: 'No se trata de si te derriban, se trata de si te levantas.' },
    { author: 'Anónimo', quote: 'La educación y el deporte son los dos pilares fundamentales para la formación de una juventud fuerte y con valores.' }
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
    }, 15000); 
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
