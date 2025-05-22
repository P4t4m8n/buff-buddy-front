import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { IProgram } from '../../models/iProgram';
import { DAY_OF_WEEK, TDayOfWeek } from '../../../../core/types/app.type';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { ActiveProgramDataService } from '../../../active-program/services/active-program-data.service';

@Component({
  selector: 'app-program-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.css',
})
export class ProgramDetailsComponent {
  programService = inject(ProgramService);
  activeProgramDataService = inject(ActiveProgramDataService);
  program: IProgram | null = null;
  daysOfWeek = DAY_OF_WEEK;
  router = inject(Router);
  @Input()
  set id(id: string) {
    if (!id) {
      console.error('id is null');
      return;
    }

    this.programService.getById(id).subscribe((program) => {
      this.program = program;
      console.log(" program:", program)
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

  startExercises(day: TDayOfWeek): void {
    if (!this.program || !this.program.programExercises) {
      return;
    }
    console.log(
      ' this.program.programExercises:',
      this.program.programExercises
    );

    console.log(' this.program:', this.program);
    const exercisesForDay = this.program.programExercises.filter((pe) =>
      pe.daysOfWeek?.includes(day)
    );
    console.log(' exercisesForDay:', exercisesForDay);

    if (exercisesForDay.length > 0) {
      this.activeProgramDataService.setActiveData({
        exercises: exercisesForDay,
        programName: this.program.name || 'exercise',
        day: day,
      });
      this.router.navigate(['/active-program']);
    } else {
      console.warn(`No exercises found for ${day} to start.`);
    }
  }
}
