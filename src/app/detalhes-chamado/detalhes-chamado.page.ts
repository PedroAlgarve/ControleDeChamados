import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-detalhes-chamado',
  templateUrl: './detalhes-chamado.page.html',
  styleUrls: ['./detalhes-chamado.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalhesChamadoPage implements OnInit {
  chamado: any;
  statusOpcoes = ['Aberto', 'Em atendimento', 'Concluído', 'Cancelado'];
  novoStatus: string = '';
  novaObservacao: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chamado = this.dataService.obterChamadoPorId(id);
    
    if (this.chamado) {
      this.novoStatus = this.chamado.status;
      this.novaObservacao = this.chamado.observacao || '';
    } else {
      this.exibirToast('Chamado não encontrado!', 'danger');
      this.navCtrl.back();
    }
  }

  salvarAlteracoes() {
    this.dataService.atualizarStatus(this.chamado.id, this.novoStatus, this.novaObservacao);
    this.exibirToast('Status atualizado com sucesso!', 'success');
    this.navCtrl.back();
  }

  excluirChamado() {
    this.dataService.excluirChamado(this.chamado.id);
    this.exibirToast('Chamado excluído!', 'success');
    this.navCtrl.back();
  }

  async exibirToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor
    });
    toast.present();
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
}
