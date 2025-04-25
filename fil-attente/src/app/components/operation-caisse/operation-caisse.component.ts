import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QrCodeModule } from 'ng-qrcode';

@Component({
  selector: 'app-operation-caisse',
  standalone: true,
  templateUrl: './operation-caisse.component.html',
  styleUrls: ['./operation-caisse.component.css'],
  imports: [QrCodeModule]
})
export class OperationCaisseComponent implements OnInit {
  numeroTicket = '';
  dateHeure = '';
  qrCodeValue = '';
  enAttente = 0;

  @ViewChild('qrCodeElement', { static: false }) qrCodeElement!: ElementRef;

  ngOnInit(): void {
    const now = new Date();
    this.dateHeure = now.toLocaleString();

    // Récupération du ticket courant dans le localStorage
    let lastTicket = Number(localStorage.getItem('lastTicket') || '0');
    lastTicket = (lastTicket % 500) + 1; // Repartir à 1 après 500
    localStorage.setItem('lastTicket', lastTicket.toString());

    this.numeroTicket = lastTicket.toString();
    this.qrCodeValue = `Ticket ${this.numeroTicket} - ${this.dateHeure}`;

    // Nombre de personnes devant vous
    this.enAttente = lastTicket - 1;
  }

  getQRCodeDataUrl(): string | null {
    const canvas = this.qrCodeElement?.nativeElement?.querySelector('canvas');
    return canvas ? canvas.toDataURL() : null;
  }
}
