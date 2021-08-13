import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoIdentificacion } from 'src/app/core/model/tipo-identificacion';
import { MessageService } from 'src/app/service/message.service';
import { TipoIdentificacionService } from 'src/app/service/tipo-identificacion.service';

@Component({
  selector: 'app-tipo-identificacion',
  templateUrl: './tipo-identificacion.component.html',
  styleUrls: ['./tipo-identificacion.component.scss']
})
export class TipoIdentificacionComponent implements OnInit {

  data: TipoIdentificacion[] = [];
  loading = false;
  isOkLoading = false;
  isVisible = false;
  titleModal = '';
  form: FormGroup;
  isCreate = false;

  constructor(private tipoIdeService: TipoIdentificacionService, private fb: FormBuilder, private messageService: MessageService) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.getAll();
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: this.fb.control(null, Validators.nullValidator),
      nombre: this.fb.control(null, Validators.required),
      codigo: this.fb.control(null, Validators.required)
    })
  }

  private getAll(): void {
    this.loading = true;
    this.tipoIdeService.getAll().subscribe(resp => {
      if (resp.success) {
        this.data = resp.data;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  private create(entity: TipoIdentificacion): void {
    this.isOkLoading = true;
    this.tipoIdeService.create(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      this.getAll();
    }, () => {
      this.reset();
    })
  }

  private update(entity: TipoIdentificacion): void {
    this.isOkLoading = true;
    this.tipoIdeService.update(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      this.getAll();
    }, () => {
      this.reset();
    })
  }

  handleShowCreate(): void {
    this.isVisible = true;
    this.titleModal = 'Crear';
    this.isCreate = true;

  }

  handleShowEdit(entity: TipoIdentificacion): void {
    this.isVisible = true;
    this.isCreate = false;
    this.titleModal = 'Editar';
    this.form?.setValue({
      id: entity.id,
      nombre: entity.nombre,
      codigo: entity.codigo
    })
  }


  handleCancel(): void {
    this.isVisible = false;
    this.reset();
  }

  private reset(): void {
    this.isVisible = false;
    this.isOkLoading = false;
    this.form.reset();
    this.isCreate = false;
  }

  submitForm(): void {
    if (this.form?.valid) {
      const entity: TipoIdentificacion = this.form?.value;
      if (this.isCreate) {
        this.create(entity);
      } else {
        this.update(entity);
      }
    } else {
      this.markAndValidate();
    }
  }

  private markAndValidate(): void {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
  }

}
