import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import { create, power, powerOutline, trashBin, saveOutline, personAddOutline, callOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cadastro-tecnico',
  templateUrl: './cadastro-tecnico.page.html',
  styleUrls: ['./cadastro-tecnico.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CadastroTecnicoPage implements OnInit {
  tecnico = {
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    situacao: 'Ativo'
  };

  tecnicos: any[] = [];
  especialidades = ['Hardware', 'Software', 'Rede', 'Impressora', 'Sistema interno', 'Outros'];
  isEditing: boolean = false;
  editingId: number | null = null;

  constructor(
    private dataService: DataService,
    private toastController: ToastController
  ) {
    addIcons({ create, power, powerOutline, trashBin, saveOutline, personAddOutline, callOutline });
  }

  ngOnInit() {
    this.carregarTecnicos();
  }

  carregarTecnicos() {
    this.tecnicos = this.dataService.listarTecnicos();
  }

  async cadastrarTecnico() {
    if (!this.tecnico.nome || !this.tecnico.email || !this.tecnico.telefone || !this.tecnico.especialidade) {
      this.exibirToast('Preencha todos os campos obrigatórios!', 'warning');
      return;
    }

    const novoTecnico = {
      ...this.tecnico,
      id: this.isEditing ? this.editingId : Date.now(),
      contato: `${this.tecnico.telefone} | ${this.tecnico.email}`
    };

    if (this.isEditing) {
      this.dataService.atualizarTecnico(this.editingId!, novoTecnico);
      this.exibirToast('Dados atualizados!', 'success');
    } else {
      this.dataService.adicionarTecnico(novoTecnico);
      this.exibirToast('Técnico cadastrado com sucesso!', 'success');
    }
    
    this.cancelarEdicao();
    this.carregarTecnicos();
  }

  prepararEdicao(t: any) {
    this.isEditing = true;
    this.editingId = t.id;
    // Extrair telefone do contato se possível ou apenas usar o que tem
    const [tel, email] = t.contato.split(' | ');
    this.tecnico = {
      nome: t.nome,
      email: email || t.email,
      telefone: tel || t.telefone,
      especialidade: t.especialidade,
      situacao: t.situacao
    };
  }

  cancelarEdicao() {
    this.isEditing = false;
    this.editingId = null;
    this.tecnico = {
      nome: '',
      email: '',
      telefone: '',
      especialidade: '',
      situacao: 'Ativo'
    };
  }

  toggleSituacao(t: any) {
    t.situacao = t.situacao === 'Ativo' ? 'Inativo' : 'Ativo';
    this.exibirToast(`Técnico agora está ${t.situacao}`, 'medium');
  }

  async excluirTecnico(id: number) {
    this.dataService.excluirTecnico(id);
    this.carregarTecnicos();
    this.exibirToast('Técnico removido!', 'medium');
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
