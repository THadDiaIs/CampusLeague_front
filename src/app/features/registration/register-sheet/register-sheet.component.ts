import { NgFor } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Team } from '../../../types/team';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-sheet',
  imports: [NgFor],
  templateUrl: './register-sheet.component.html',
  styleUrl: './register-sheet.component.css'
})
export class RegisterSheetComponent {

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  @Input() team: Team | null = null;

  constructor(private router: Router) {}

  replaceOklchColors = (element: HTMLElement) => {
    const elements = element.querySelectorAll('*');
    elements.forEach(el => {
      const style = getComputedStyle(el);
      for (let prop of ['color', 'backgroundColor', 'borderColor']) {
        const val = style.getPropertyValue(prop);
        if (val.includes('oklch')) {
          (el as HTMLElement).style.setProperty(prop, '#000');
        }
      }
    });
  };

  downloadPdf(): void {
    this.replaceOklchColors(this.pdfContent.nativeElement);
    html2canvas(this.pdfContent.nativeElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('formulario-inscripcion-equipo.pdf');
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
