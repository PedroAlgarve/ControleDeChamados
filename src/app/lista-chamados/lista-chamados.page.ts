import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-lista-chamados',
  templateUrl: './lista-chamados.page.html',
  styleUrls: ['./lista-chamados.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ListaChamadosPage implements OnInit {
  chamados: any[] = [];

  constructor(
    private dataService: DataService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.carregarChamados();
  }

  ionViewWillEnter() {
    this.carregarChamados();
  }

  carregarChamados() {
    const todosChamados = this.dataService.listarChamados();
    
    // Mapeamento de peso para ordenação por prioridade
    const pesos: { [key: string]: number } = {
      'Urgente': 1,
      'Alta': 2,
      'Média': 3,
      'Baixa': 4
    };

    // Ordenar por prioridade
    this.chamados = [...todosChamados].sort((a, b) => {
      return (pesos[a.prioridade] || 5) - (pesos[b.prioridade] || 5);
    });
  }

  getPriorityColor(prioridade: string): string {
    switch (prioridade) {
      case 'Urgente': return 'danger';
      case 'Alta': return 'warning';
      case 'Média': return 'secondary';
      case 'Baixa': return 'success';
      default: return 'medium';
    }
  }

  verDetalhes(chamado: any) {
    this.navCtrl.navigateForward(['/detalhes-chamado', chamado.id]);
  }
}
