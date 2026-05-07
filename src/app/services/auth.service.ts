import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios: any[] = [
    { nome: 'Administrador', usuario: 'ADMIN', senha: 'PatoLino', email: 'admin@email.com' }
  ];
  private isAuthenticated = false;

  constructor() { }

  login(usuario: string, senha: string): boolean {
    const user = this.usuarios.find(u => u.usuario === usuario && u.senha === senha);
    if (user) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  registrar(dados: any) {
    this.usuarios.push(dados);
    this.isAuthenticated = true; // Auto-login after registration
  }

  atualizarUsuario(usuarioOriginal: string, novosDados: any) {
    const index = this.usuarios.findIndex(u => u.usuario === usuarioOriginal);
    if (index !== -1) {
      this.usuarios[index] = novosDados;
    }
  }

  excluirUsuario(usuario: string) {
    const index = this.usuarios.findIndex(u => u.usuario === usuario);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
    }
  }

  getUsuarios() {
    return this.usuarios;
  }


  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
