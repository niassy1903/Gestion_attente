import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { OperationCaisseComponent } from './components/operation-caisse/operation-caisse.component';

export const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'operation-caisse', component: OperationCaisseComponent },
  { path: '**', redirectTo: 'connexion' }
];