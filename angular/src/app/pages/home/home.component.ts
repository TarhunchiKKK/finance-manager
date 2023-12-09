import { Component } from '@angular/core';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { TransctionsTableComponent } from '../../components/transctions-table/transctions-table.component';
import { TransctionsFormComponent } from '../../components/transctions-form/transctions-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoriesComponent, TransctionsTableComponent, TransctionsFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
