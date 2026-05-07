import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ResumoPage implements OnInit {
  totalChamados: number = 0;
  porStatus: any[] = [];
  porPrioridade: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.calcularResumo();
  }

  ionViewWillEnter() {
    this.calcularResumo();
  }

  calcularResumo() {
    const chamados = this.dataService.listarChamados();
    this.totalChamados = chamados.length;

    // Contagem por Status
    const statusCounts: any = {};
    chamados.forEach(c => {
      statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
    });
    this.porStatus = Object.keys(statusCounts).map(key => ({
      label: key,
      count: statusCounts[key]
    }));

    // Contagem por Prioridade
    const priorityCounts: any = {};
    chamados.forEach(c => {
      priorityCounts[c.prioridade] = (priorityCounts[c.prioridade] || 0) + 1;
    });
    this.porPrioridade = Object.keys(priorityCounts).map(key => ({
      label: key,
      count: priorityCounts[key]
    }));
  }
}
