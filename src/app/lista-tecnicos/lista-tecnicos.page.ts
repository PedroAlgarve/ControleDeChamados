import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-lista-tecnicos',
  templateUrl: './lista-tecnicos.page.html',
  styleUrls: ['./lista-tecnicos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ListaTecnicosPage implements OnInit {
  tecnicos: any[] = [];

  constructor(
    private dataService: DataService,
    private navCtrl: NavController,
    private alertController: AlertController
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

  async excluirTecnico(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Deseja realmente excluir este técnico?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.dataService.excluirTecnico(id);
            this.carregarTecnicos();
          }
        }
      ]
    });
    await alert.present();
  }

  irParaCadastro() {
    this.navCtrl.navigateForward('/cadastro-tecnico');
  }
}
