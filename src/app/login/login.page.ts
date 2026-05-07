import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  usuario: string = '';
  senha: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    public navCtrl: NavController
  ) { }

  ngOnInit() { }

  async realizarLogin() {
    if (!this.usuario || !this.senha) {
      this.exibirToast('Preencha todos os campos!', 'warning');
      return;
    }

    const sucesso = this.authService.login(this.usuario, this.senha);

    if (sucesso) {
      this.exibirToast('Login realizado com sucesso!', 'success');
      this.navCtrl.navigateRoot('/menu'); 
    } else {
      this.exibirToast('Usuário ou senha inválidos!', 'danger');
    }
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
