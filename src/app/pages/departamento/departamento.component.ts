import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Departamento } from 'src/app/core/model/departamento';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  data: Departamento[] = [];
  loading = false;
  isOkLoading = false;
  isVisible = false;
  titleModal = '';
  form: FormGroup;
  isCreate = false;

  constructor(private depaService: DepartamentoService, private fb: FormBuilder, private messageService: MessageService) {
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
    this.depaService.getAll().subscribe(resp => {
      if (resp.success) {
        this.data = resp.data;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  private create(entity: Departamento): void {
    this.isOkLoading = true;
    this.depaService.create(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      this.getAll();
    }, () => {
      this.reset();
    })
  }

  private update(entity: Departamento): void {
    this.isOkLoading = true;
    this.depaService.update(entity).subscribe(resp => {
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

  handleShowEdit(entity: Departamento): void {
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
      const entity: Departamento = this.form?.value;
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
