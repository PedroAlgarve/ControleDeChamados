import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private chamados: any[] = [];
  private tecnicos: any[] = [];

  constructor() {
    this.carregarDados();
  }

  private salvarDados() {
    localStorage.setItem('chamados', JSON.stringify(this.chamados));
    localStorage.setItem('tecnicos', JSON.stringify(this.tecnicos));
  }

  private carregarDados() {
    const chamadosSalvos = localStorage.getItem('chamados');
    const tecnicosSalvos = localStorage.getItem('tecnicos');
    
    if (chamadosSalvos) this.chamados = JSON.parse(chamadosSalvos);
    if (tecnicosSalvos) this.tecnicos = JSON.parse(tecnicosSalvos);
  }

  listarChamados() {
    return this.chamados;
  }

  listarTecnicos() {
    return this.tecnicos;
  }

  obterChamadoPorId(id: number) {
    return this.chamados.find(c => c.id === id);
  }

  adicionarChamado(chamado: any) {
    this.chamados.push(chamado);
    this.salvarDados();
  }

  excluirChamado(id: number) {
    this.chamados = this.chamados.filter(c => c.id !== id);
    this.salvarDados();
  }

  atualizarStatus(id: number, status: string, observacao: string) {
    const chamado = this.chamados.find(c => c.id === id);
    if (chamado) {
      chamado.status = status;
      chamado.observacao = observacao;
      this.salvarDados();
    }
  }

  adicionarTecnico(tecnico: any) {
    this.tecnicos.push(tecnico);
    this.salvarDados();
  }

  excluirTecnico(id: number) {
    this.tecnicos = this.tecnicos.filter(t => t.id !== id);
    this.salvarDados();
  }

  // Método para atualizar um técnico existente
  atualizarTecnico(id: number, tecnicoAtualizado: any) {
    const index = this.tecnicos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tecnicos[index] = tecnicoAtualizado;
      this.salvarDados();
    }
  }
}
