import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cadastro-chamado',
  templateUrl: './cadastro-chamado.page.html',
  styleUrls: ['./cadastro-chamado.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CadastroChamadoPage implements OnInit {
  chamado = {
    solicitante: '',
    setor: '',
    titulo: '',
    descricao: '',
    prioridade: '',
    dataAbertura: new Date().toISOString(),
    tecnico: '',
    status: 'Aberto'
  };

  prioridades = ['Baixa', 'Média', 'Alta', 'Urgente'];
  statusOpcoes = ['Aberto', 'Em atendimento', 'Concluído', 'Cancelado'];
  tecnicos: any[] = [];

  constructor(
    private dataService: DataService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.carregarTecnicos();
  }

  ionViewWillEnter() {
    this.carregarTecnicos();
  }

  carregarTecnicos() {
    this.tecnicos = this.dataService.listarTecnicos();
  }

  async salvarChamado() {
    if (!this.chamado.solicitante || !this.chamado.titulo || !this.chamado.descricao || !this.chamado.prioridade || !this.chamado.tecnico) {
      this.exibirToast('Preencha os campos obrigatórios!', 'warning');
      return;
    }

    const novoChamado = {
      ...this.chamado,
      id: Date.now(),
      dataAbertura: this.chamado.dataAbertura.split('T')[0] // Formata data
    };

    this.dataService.adicionarChamado(novoChamado);
    this.exibirToast('Chamado registrado com sucesso!', 'success');
    this.navCtrl.back();
  }

  async exibirToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor,
      position: 'bottom'
    });
    toast.present();
  }
}
