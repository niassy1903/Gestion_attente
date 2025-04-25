import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { OperationCaisseComponent } from './../../components/operation-caisse/operation-caisse.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  standalone: true,
  imports: [OperationCaisseComponent]
})
export class AccueilComponent implements AfterViewInit {
  @ViewChild('operationCaisseComponent') operationCaisseComponent!: OperationCaisseComponent;

  ngAfterViewInit() {
    this.operationCaisseComponent.ngOnInit();
  }

  async imprimerTicket() {
    await this.operationCaisseComponent.ngOnInit();

    setTimeout(() => {
      const ticketElement = document.getElementById('ticketSection');
      const qrCanvas = ticketElement?.querySelector('canvas') as HTMLCanvasElement;
      const qrImage = qrCanvas ? `<img src="${qrCanvas.toDataURL()}" style="width:200px;height:200px;margin-top:10px;" />` : '';

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Ticket</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .card { border: 1px solid #ccc; padding: 20px; text-align: center; }
              </style>
            </head>
            <body>
              <div class="card">
                <h3>Votre Ticket</h3>
                <img src="assets/logo.png" alt="Logo" style="max-width:150px;"><br/>
                <div><strong>N° :</strong> ${this.operationCaisseComponent.numeroTicket}</div>
                <div><strong>Date :</strong> ${this.operationCaisseComponent.dateHeure}</div>
                <div><strong>En attente :</strong> ${this.operationCaisseComponent.enAttente}</div>
                ${qrImage}
                <footer style="margin-top: 20px;">© 2025 Votre Banque. Tous droits réservés.</footer>
              </div>
              <script>
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 1000);
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }, 500); // Attendre le rendu du QR
  }
}
