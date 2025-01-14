import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiaModel } from '../../models/noticia-model';
import { UsuarioModel } from '../../models/usuario-model';
import { NoticiaService } from '../../services/noticia-service.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "../../components/global/alert/alert.component";
import { UsuarioService } from '../../services/usuario-service.service';
import { NoticiaDTO } from '../../models/DTO/noticiaDTO';
import { JugadorService } from '../../services/jugador.service';
import { EquipoService } from '../../services/equipo.service';
import { TorneoService } from '../../services/torneo.service';
import { EquipoModel } from '../../models/equipo-model';
import { JugadorModel } from '../../models/jugador-model';
import { TorneoModel } from '../../models/torneo-model';

@Component({
  selector: 'app-noticia-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './noticia-form.component.html',
  styleUrl: './noticia-form.component.css'
})
export class NoticiaFormComponent implements OnInit{
  noticiaForm: FormGroup;
  alertMessage!: string;
  alertType!: 'success' | 'error';
  htmlContent: string = '';
  usuariosFiltrados: UsuarioModel[] = [];
  equiposFiltrados: EquipoModel[] = [];
  jugadoresFiltrados: JugadorModel[] = [];
  torneosFiltrados: TorneoModel[] = [];
  equiposSeleccionados: number[] = [];
  jugadoresSeleccionados: number[] = [];
  torneosSeleccionados: number[] = [];

  constructor(private fb: FormBuilder, private noticiaService: NoticiaService, 
    private usuariosService: UsuarioService, private jugadorService: JugadorService,
    private equipoService: EquipoService, private torneoService: TorneoService
  ) {
    this.noticiaForm = this.fb.group({
      usuario: ['', Validators.required],
      imagen: ['', Validators.required],
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      html: ['', Validators.required],
      jugadores: [''],
      equipos: [''],
      torneos: ['']
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.htmlContent = e.target.result;
        this.noticiaForm.patchValue({ html: this.htmlContent });
      };
      reader.readAsText(file);
    }
  }

  onUsuarioInput(): void {
    const usuarioInput = this.noticiaForm.get('usuario')?.value;
    if (usuarioInput) {
      this.usuariosService.getUsuarioByNombre(usuarioInput).subscribe(
        (usuarios: UsuarioModel[]) => {
          this.usuariosFiltrados = usuarios;
        },
        error => {
          console.error('Error al buscar usuarios', error);
        }
      );
    } else {
      this.usuariosFiltrados = [];
    }
  }

  onSubmit(): void {
    if (this.noticiaForm.valid) {
      
      const formValue = this.noticiaForm.value;
      const usuario = this.usuariosFiltrados.find(u => u.username === formValue.usuario);
      console.log(formValue);
      console.log(usuario);
      if (!usuario) {
        this.showAlert('Usuario no encontrado', 'error');
        return;
      }
      const nuevaNoticia = new NoticiaDTO(
        usuario.id,
        formValue.imagen,
        this.htmlContent,
        new Date(formValue.fecha),
        formValue.titulo,
        this.equiposSeleccionados,
        this.torneosSeleccionados,
        this.jugadoresSeleccionados
      );
      console.log(nuevaNoticia);
      this.noticiaService.addNoticia(nuevaNoticia).subscribe(
        response => {
          this.showAlert('Noticia guardada', 'success');
        },
        error => {
          this.showAlert('Error al guardar la noticia', 'error');
        }
      );
    }
  }
  onEquipoInput(): void {
    const query = this.noticiaForm.get('equipos')?.value;
    if (query.length > 1) {
      this.equipoService.getEquiposNombre(query).subscribe((results) => {
        this.equiposFiltrados = results;
      });
    } else {
      this.equiposFiltrados = [];
    }
  }
  onTorneoInput(): void {
    const query = this.noticiaForm.get('torneos')?.value;
    if (query.length > 1) {
      this.torneoService.getTorneosByNombre(query).subscribe((results) => {
        this.torneosFiltrados = results;
      });
    } else {
      this.torneosFiltrados = [];
    }
  }
  addTorneo(): void {
    const torneoNombre = this.noticiaForm.get('torneos')?.value;
    const torneo = this.torneosFiltrados.find(t => t.nombre === torneoNombre);
    if (torneo) {
      this.torneosSeleccionados.push(torneo.id);
      console.log(this.torneosSeleccionados);
      this.noticiaForm.patchValue({ torneos: '' });
    }
  }

  addEquipo(): void {
    const equipoNombre = this.noticiaForm.get('equipos')?.value;
    const equipo = this.equiposFiltrados.find(e => e.nombre === equipoNombre);
    if (equipo) {
      this.equiposSeleccionados.push(equipo.id);
      this.noticiaForm.patchValue({ equipos: '' });
    }
  }

  addJugador(): void {
    const jugadorNombre = this.noticiaForm.get('jugadores')?.value;
    const jugador = this.jugadoresFiltrados.find(j => j.mote === jugadorNombre);
    if (jugador) {
      this.jugadoresSeleccionados.push(jugador.id);
      this.noticiaForm.patchValue({ jugadores: '' });
    }
  }
  onJugadorInput(): void {
    const query = this.noticiaForm.get('jugadores')?.value;
    if (query.length > 1) {
      this.jugadorService.getPlayerByNombre(query).subscribe((results) => {
        this.jugadoresFiltrados = results;
        console.log(results);
      });
    } else {
      this.jugadoresFiltrados = [];
    }
  }
  async getEquipoIdByName(nombre: string): Promise<number> {
    let equipoId = 0;
    const results = await this.equipoService.getEquiposNombre(nombre).toPromise();
    if (results && results.length > 0) {
      equipoId = results[0].id;
    }
    return equipoId;
  }

  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }
}
