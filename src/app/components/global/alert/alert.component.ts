import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  @Input() message: string | undefined;
  @Input()type!: 'success' | 'error';

  ngOnInit(): void {
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}