import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Lendo PDF e retornando Nomes e CEPs ordenados';
  arquivoselecionado = 'Nenhum arquivo selecionado';
  conteudo = 'A lista ordenada de Nomes e CEPs irá aparecer aqui';
  processando = "Processando...";
  loading = false;

  constructor() {
    setInterval(() => {
      if (this.loading)
        if (this.processando.includes("...")) this.processando = "Processando";
        else this.processando += ".";
    }, 500);
  }

  async readPDF(file: any): Promise<void> {
    this.arquivoselecionado = "Arquivo selecionado: " + file.name + " - " + file.size + " bytes 📁";
    console.log(file);
  }

  onChangeFileSelector(event: any): void {
    const fileList = event.target.files;
    this.readPDF(fileList[0]);

    event.target.value = null;
  }

  dragOverHandler(event: any) {
    event.preventDefault();
  }

  dropHandler(event: any) {
    event.preventDefault();

    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item, i) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          this.readPDF(file);
        }
      });
    } else {
      [...event.dataTransfer.files].forEach((file, i) => {
        this.readPDF(file);
      });
    }
  }
}
