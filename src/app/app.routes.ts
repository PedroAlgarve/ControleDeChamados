import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'cadastro-usuario',
    loadComponent: () => import('./cadastro-usuario/cadastro-usuario.page').then((m) => m.CadastroUsuarioPage),
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then((m) => m.MenuPage),
  },
  {
    path: 'cadastro-chamado',
    loadComponent: () => import('./cadastro-chamado/cadastro-chamado.page').then((m) => m.CadastroChamadoPage),
  },
  {
    path: 'lista-chamados',
    loadComponent: () => import('./lista-chamados/lista-chamados.page').then((m) => m.ListaChamadosPage),
  },
  {
    path: 'cadastro-tecnico',
    loadComponent: () => import('./cadastro-tecnico/cadastro-tecnico.page').then((m) => m.CadastroTecnicoPage),
  },
  {
    path: 'lista-tecnicos',
    loadComponent: () => import('./lista-tecnicos/lista-tecnicos.page').then((m) => m.ListaTecnicosPage),
  },
  {
    path: 'detalhes-chamado/:id',
    loadComponent: () => import('./detalhes-chamado/detalhes-chamado.page').then((m) => m.DetalhesChamadoPage),
  },
  {
    path: 'resumo',
    loadComponent: () => import('./resumo/resumo.page').then((m) => m.ResumoPage),
  },
  {
    path: 'sobre',
    loadComponent: () => import('./sobre/sobre.page').then((m) => m.SobrePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
