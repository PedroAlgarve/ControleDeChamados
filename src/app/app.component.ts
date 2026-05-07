import { Component } from '@angular/core';
import { IonicModule, NavController, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) {}

  navegar(rota: string) {
    this.menuCtrl.close();
    this.navCtrl.navigateForward(rota);
  }

  irParaLogin() {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot('/login');
  }
}
