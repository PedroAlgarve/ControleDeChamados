import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  listOutline,
  personAddOutline,
  peopleOutline,
  statsChartOutline,
  informationCircleOutline,
  logOutOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MenuPage {
  menuItems = [
    { title: 'Novo Chamado', icon: 'add-circle-outline', route: '/cadastro-chamado', color: 'primary' },
    { title: 'Lista de Chamados', icon: 'list-outline', route: '/lista-chamados', color: 'secondary' },
    { title: 'Novo Técnico', icon: 'person-add-outline', route: '/cadastro-tecnico', color: 'primary' },
    { title: 'Lista de Técnicos', icon: 'people-outline', route: '/lista-tecnicos', color: 'secondary' },
    { title: 'Resumo', icon: 'stats-chart-outline', route: '/resumo', color: 'primary' },
    { title: 'Sobre', icon: 'information-circle-outline', route: '/sobre', color: 'medium' }
  ];

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) {
    addIcons({
      addCircleOutline,
      listOutline,
      personAddOutline,
      peopleOutline,
      statsChartOutline,
      informationCircleOutline,
      logOutOutline
    });
  }

  navegar(rota: string) {
    this.navCtrl.navigateForward(rota);
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
