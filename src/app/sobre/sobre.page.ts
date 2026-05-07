import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SobrePage {
  projeto = {
    nome: 'Controle de Chamados Técnicos',
    disciplina: 'Desenvolvimento Mobile',
    objetivo: 'Praticar conceitos de Angular e Ionic, como navegação, services, formulários e manipulação de arrays.',
    tecnologias: ['Ionic Framework', 'Angular', 'TypeScript', 'Capacitor']
  };

  constructor() { }
}
