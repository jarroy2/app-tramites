import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from 'src/app/core/model/departamento';
import { Empleado } from 'src/app/core/model/empleado';
import { Persona } from 'src/app/core/model/persona';
import { TipoIdentificacion } from 'src/app/core/model/tipo-identificacion';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { MessageService } from 'src/app/service/message.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TipoIdentificacionService } from 'src/app/service/tipo-identificacion.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  data: Empleado[] = [];
  loading = false;
  isOkLoading = false;
  isVisible = false;
  titleModal = '';
  form: FormGroup;
  isCreate = false;
  tipoIdenficacion: TipoIdentificacion[] = [];
  departamentos: Departamento[] = [];

  constructor(private personaService: PersonaService, private empleadoService: EmpleadoService,
    private departamentoService: DepartamentoService,
    private tipoIdeService: TipoIdentificacionService,
    private fb: FormBuilder, private messageService: MessageService) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllTipoIdentificacion();
    this.getAllDepartamento();
    this.initForm();
  }

  compareFn = (o1: TipoIdentificacion, o2: TipoIdentificacion) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  private initForm(): void {
    this.form = this.fb.group({
      id: this.fb.control(null, Validators.nullValidator),
      persona: this.fb.group({
        id: this.fb.control(null, Validators.nullValidator),
        tipoIdentificacion: this.fb.control(null, Validators.required),
        numeroIdentificacion: this.fb.control(null, Validators.required),
        nombres: this.fb.control(null, Validators.required),
        apellidos: this.fb.control(null, Validators.required),
        telefono: this.fb.control(null, Validators.required),
        email: this.fb.control(null, Validators.required),
        direccion: this.fb.control(null, Validators.nullValidator)
      }),
      departamento: this.fb.control(null, Validators.required)
    })
  }

  private getAll(): void {
    this.loading = true;
    this.empleadoService.getAll().subscribe(resp => {
      if (resp.success) {
        this.data = resp.data;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  private getAllTipoIdentificacion(): void {
    this.tipoIdeService.getAll().subscribe(resp => {
      if (resp.success) {
        this.tipoIdenficacion = resp.data;
      }
    }, () => {
    })
  }

  private getAllDepartamento(): void {
    this.departamentoService.getAll().subscribe(resp => {
      if (resp.success) {
        this.departamentos = resp.data;
      }
    }, () => {
    })
  }

  private create(entity: Empleado): void {
    this.isOkLoading = true;
    this.empleadoService.create(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      this.getAll();
    }, () => {
      this.reset();
    })
  }

  private update(entity: Empleado): void {
    this.isOkLoading = true;
    this.empleadoService.update(entity).subscribe(resp => {
      if (resp.success) {
        this.messageService.success(resp.message);
      }
      this.reset();
      this.getAll();
    }, () => {
      this.reset();
    })
  }

  public searchPersona(): void {
    const empleado: Empleado = this.form.value;

    if (empleado.persona.tipoIdentificacion && empleado.persona.numeroIdentificacion) {
      this.personaService.getPersonaByTipoIdentificacionAndNumeroid(empleado.persona.tipoIdentificacion.codigo, empleado.persona.numeroIdentificacion).subscribe(resp => {
        if (resp.success) {
          if (resp.data) {
            this.form.setValue({
              id: this.form.controls.id,
              persona: {
                id: resp.data.id,
                tipoIdentificacion: resp.data.tipoIdentificacion,
                numeroIdentificacion: resp.data.numeroIdentificacion,
                nombres: resp.data.nombres,
                apellidos: resp.data.apellidos,
                telefono: resp.data.telefono,
                email: resp.data.email,
                direccion: resp.data.direccion
              },
              departamento: this.form.controls.departamento
            });
          } else {
            this.form.setValue({
              persona: null,
              departamento: this.form.controls.departamento
            });
          }
        }

      });
    }
  }

  handleShowCreate(): void {
    this.isVisible = true;
    this.titleModal = 'Crear';
    this.isCreate = true;

  }

  handleShowEdit(entity: Empleado): void {
    this.isVisible = true;
    this.isCreate = false;
    this.titleModal = 'Editar';
    this.form?.setValue({
      id: entity.id,
      persona: {
        id: entity.persona.id,
        tipoIdentificacion: entity.persona.tipoIdentificacion,
        numeroIdentificacion: entity.persona.numeroIdentificacion,
        nombres: entity.persona.nombres,
        apellidos: entity.persona.apellidos,
        telefono: entity.persona.telefono,
        email: entity.persona.email,
        direccion: entity.persona.direccion
      },
      departamento: entity.departamento
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
      const entity: Empleado = this.form?.value;
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
