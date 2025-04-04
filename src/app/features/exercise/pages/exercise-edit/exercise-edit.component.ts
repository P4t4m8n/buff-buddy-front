import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { TExercise } from '../../types/exercise.type';
import { ExerciseUtilService } from '../../services/util/exercise-util.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputImgComponent } from "../../../../core/components/form/input-img/input-img.component";

@Component({
  selector: 'app-exercise-edit',
  imports: [ReactiveFormsModule, InputImgComponent],
  templateUrl: './exercise-edit.component.html',
  styleUrl: './exercise-edit.component.css',
})
export class ExerciseEditComponent implements OnInit {
  @Inject('exerciseUtilService') exerciseUtilService: ExerciseUtilService =
    new ExerciseUtilService();
  @Input()
  exercise: TExercise | undefined;

  isEditOpen: boolean = false;
  buttonText: string = 'Edit';

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', { validators: [Validators.required] }),
    youtubeUrl: new FormControl<string>(''),
    imgBulb: new FormControl<File | null>(null),
    type: new FormControl<string>(''),
    equipment: new FormControl<string>(''),
    targetMuscle: new FormControl<string>(''),
  });
  ngOnInit(): void {
    if (!this.exercise) {
      this.buttonText = 'Create';
      this.exercise = this.exerciseUtilService.getEmpty();
    }
    this.form.patchValue(this.exercise);
  }

  toggleEdit() {
    this.isEditOpen = !this.isEditOpen;
  }

  handleImgBulb(file: File | null) {
    this.form.controls.imgBulb.setValue(file);
  }

  save() {
    this.exercise = this.form.value as TExercise;
    // this.isEditOpen = false;
    console.log(this.exercise);
  }
}
