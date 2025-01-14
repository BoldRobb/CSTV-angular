import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  isOrganizer: boolean = false;
  isReportero: boolean = false;
  routesOrganizer = [
    { path: '/admin/teamsForm', label: 'Teams' },
    { path: '/admin/playersForm', label: 'Players' },
    { path: '/admin/eventsForm', label: 'Events' },


  ];
  routesReportero = [

    { path: '/admin/newsForm', label: 'News' }
  ]

  visibleRoutes: { path: string; label: string; }[] = [];
  collapsedRoutes: { path: string; label: string; }[] = [];
  dropdownOpen = false;

  constructor(private authService: AuthService){}
  ngOnInit(): void {
    
    this.checkRol();
    this.updateRoutes();
  }

  checkRol(): void{
    this.authService.getUserRolObservable().subscribe(userRole => {
      this.isOrganizer = userRole === 'organizador';
      this.isReportero = userRole === 'reportero'
      console.log(this.isOrganizer)
      console.log(this.isReportero)
    }); // Método para obtener el rol del usuario
  }

  updateRoutes(): void {
    
      if(this.isOrganizer){
        this.visibleRoutes = this.routesOrganizer;
        this.collapsedRoutes = this.routesOrganizer;
      }else if(this.isReportero){
        this.visibleRoutes = this.routesReportero;
        this.collapsedRoutes = this.routesReportero;
      }
  
    
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}