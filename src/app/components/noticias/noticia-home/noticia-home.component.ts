import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NoticiaPrincipalComponent } from '../noticia-principal/noticia-principal.component';
import { RecentActivityComponent } from '../../foros/recent-activity/recent-activity.component';


@Component({
  selector: 'app-noticia-home',
  standalone: true,
  imports: [NavbarComponent, NoticiaPrincipalComponent, RecentActivityComponent],
  templateUrl: './noticia-home.component.html',
  styleUrl: './noticia-home.component.css'
})
export class NoticiaHomeComponent {

}
