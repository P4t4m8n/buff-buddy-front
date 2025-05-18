import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { IProgram } from '../../models/iProgram';
import { DAY_OF_WEEK, TDayOfWeek } from '../../../../core/types/app.type';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatListModule } from '@angular/material/list'; // Import MatListModule
import { MatChipsModule } from '@angular/material/chips'; // Import MatChipsMod

@Component({
  selector: 'app-program-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.css',
})
export class ProgramDetailsComponent {
  programService = inject(ProgramService);
  program: IProgram | null = null;
  daysOfWeek = DAY_OF_WEEK;
  @Input()
  set id(id: string) {
    console.log(' id:', id);
    if (!id) {
      console.error('id is null');
      return;
    }

    this.programService.getById(id).subscribe((program) => {
      this.program = program;
    });
  }

  hasExercisesForDay(day: TDayOfWeek): boolean {
    if (!this.program) {
      return false;
    }

    if (!this.program.programExercises) {
      return false;
    }

    return this.program.programExercises.some((pe) =>
      (pe.daysOfWeek || []).includes(day)
    );
  }
}
