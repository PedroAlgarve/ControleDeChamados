import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CadastroUsuarioPage implements OnInit {
  nome: string = '';
  usuario: string = '';
  senha: string = '';
  email: string = '';
  usuariosCadastrados: any[] = [];
  mostrarSenha = false;
  editandoUsuarioId: string | null = null;

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuariosCadastrados = this.authService.getUsuarios();
  }

  async salvarUsuario() {
    if (!this.nome || !this.usuario || !this.senha || !this.email) {
      this.exibirToast('Todos os campos são obrigatórios!', 'warning');
      return;
    }

    const dadosUsuario = {
      nome: this.nome,
      usuario: this.usuario,
      senha: this.senha,
      email: this.email
    };

    if (this.editandoUsuarioId) {
      this.authService.atualizarUsuario(this.editandoUsuarioId, dadosUsuario);
      this.exibirToast('Usuário atualizado com sucesso!', 'success');
    } else {
      this.authService.registrar(dadosUsuario);
      this.exibirToast('Usuário cadastrado com sucesso!', 'success');
    }

    this.carregarUsuarios();
    this.limparFormulario();
  }

  limparFormulario() {
    this.nome = '';
    this.usuario = '';
    this.senha = '';
    this.email = '';
    this.editandoUsuarioId = null;
  }

  editarUsuario(u: any) {
    this.nome = u.nome;
    this.usuario = u.usuario;
    this.senha = u.senha;
    this.email = u.email;
    this.editandoUsuarioId = u.usuario;
  }

  excluirUsuario(u: any) {
    this.authService.excluirUsuario(u.usuario);
    this.carregarUsuarios();
    this.exibirToast('Usuário excluído!', 'success');
    if (this.editandoUsuarioId === u.usuario) {
      this.limparFormulario();
    }
  }

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }


  voltar() {
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
