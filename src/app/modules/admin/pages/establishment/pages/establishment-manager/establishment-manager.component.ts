import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../../../../shared/components/snackbar/snackbar.service';
import { ConfirmDialogService } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.service';
import { CreateEstablishmentDialogComponent } from '../../components/create-establishment-dialog/create-establishment-dialog.component';
import { Establishment } from '../../interfaces/establishment.interface';
import { EstablishmentService } from '../../establishment.service';
import { CreateVehicleDialogComponent } from './components/create-vehicle-dialog/create-vehicle-dialog.component';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { VehicleCreate } from '../../interfaces/vehicle-create.interface';

interface FlashCard {
  id: string;
  brand: string;
  model: string;
  color: string;
  plate: string;
  type: string;
}

@Component({
  selector: 'app-establishment-manager',
  templateUrl: './establishment-manager.component.html',
  styleUrls: ['./establishment-manager.component.scss'],
})
export class EstablishmentManagerComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'type',
    'brand',
    'color',
    'model',
    'plate',
    'actions',
  ];
  dataSource = new MatTableDataSource<FlashCard>();
  selection = new SelectionModel<FlashCard>(true, []);
  result = '';

  activityUnityCreateForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  establishmentDetails: {
    id: string;
    name: string;
    cnpj: string;
    address: string;
    phone: string;
    amountyCar: string;
    amountyMotorcycle: string;
  } = {
    id: '',
    name: '',
    cnpj: '',
    address: '',
    phone: '',
    amountyCar: '',
    amountyMotorcycle: '',
  };

  constructor(
    private establishmentService: EstablishmentService,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService,
    private confirmDialogService: ConfirmDialogService
  ) {
    if (!this.router.getCurrentNavigation()) {
      this.router.navigate(['/admin/establishment']);
    } else {
      //@ts-ignore
      this.establishmentDetails =
        this.router.getCurrentNavigation()?.extras.state;
    }
  }

  ngOnInit() {
    this.loadFlashCards(this.establishmentDetails.id);
  }

  loadFlashCards(id: string) {
    if (!id) return;
    this.establishmentService
      .getAllFlashCards(id)
      .subscribe((response: any) => {
        this.dataSource = response;
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected?.length;
    const numRows = this.dataSource.data?.length;
    return numSelected === numRows;
  }

  isOneSelected() {
    const numSelected = this.selection.selected?.length;
    return numSelected === 1;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  removeAllVehicles() {
    const ids: FlashCard[] = this.selection.selected;
    ids.forEach((a) => {
      console.log(a.id);
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FlashCard): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  openAddVehicleDialog() {
    const dialogRef = this.dialog.open(CreateVehicleDialogComponent, {
      width: '800px',
      data: {
        dialogTitle: 'Criar Veículo',
      },
    });
    dialogRef.afterClosed().subscribe((vehicle: VehicleCreate) => {
      if (!vehicle) return;
      const vehicleCreate: VehicleCreate = {
        brand: vehicle.brand,
        model: vehicle.model,
        color: vehicle.color,
        type: vehicle.type,
        plate: vehicle.plate,
        establishmentId: this.establishmentDetails.id!.toString(),
      };

      this.establishmentService.createVehicle(vehicleCreate).subscribe({
        next: () => {
          this.snackbarService.showSnackbar('Sucesso', 'Veículo criado!', 3000);
          this.loadFlashCards(this.establishmentDetails.id!);
        },
        error: () =>
          this.snackbarService.showSnackbar(
            'Erro',
            'Não foi possível criar o veículo!',
            3000
          ),
      });
    });
  }

  openEditVehicleDialog(item: Vehicle) {
    const dialogRef = this.dialog.open(CreateVehicleDialogComponent, {
      width: '800px',
      data: {
        dialogTitle: 'Editar Veículo',
        id: item.id,
        brand: item.brand,
        model: item.model,
        color: item.color,
        type: item.type,
        plate: item.plate,
      },
    });
    dialogRef.afterClosed().subscribe((vehicle: Vehicle) => {
      if (!vehicle) return;
      console.log(vehicle);
      const vehicleData: Vehicle = {
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        color: vehicle.color,
        type: vehicle.type,
        plate: vehicle.plate,
      };

      this.establishmentService.updateVehicle(vehicleData).subscribe({
        next: () => {
          this.snackbarService.showSnackbar(
            'Sucesso',
            'Veículo atualizado!',
            3000
          );
          this.loadFlashCards(this.establishmentDetails.id!);
        },
        error: () =>
          this.snackbarService.showSnackbar(
            'Erro',
            'Não foi possível atualizar o veículo!',
            3000
          ),
      });
    });
  }

  openEditEstablishmentDialog() {
    const dialogRef = this.dialog.open(CreateEstablishmentDialogComponent, {
      width: '1280px',
      data: {
        dialogTitle: 'Editar Estabelecimento',
        name: this.establishmentDetails.name,
        cnpj: this.establishmentDetails.cnpj,
        address: this.establishmentDetails.address,
        phone: this.establishmentDetails.phone,
        amountyCar: this.establishmentDetails.amountyCar,
        amountyMotorcycle: this.establishmentDetails.amountyMotorcycle,
      },
    });
    dialogRef.afterClosed().subscribe((establishment: Establishment) => {
      if (!establishment) return;
      this.establishmentService
        .updateEstablishment(this.establishmentDetails.id, establishment)
        .subscribe({
          next: () => {
            this.snackbarService.showSnackbar(
              'Sucesso',
              'Estabelecimento atualizada!',
              3000
            );
          },
          error: () =>
            this.snackbarService.showSnackbar(
              'Erro',
              'Não foi possível atualizar o Estabelecimento!',
              3000
            ),
        });
    });
  }

  openRemoveFlashCardDialog() {
    const id = this.selection.selected[0].id;
    const title = this.selection.selected[0].model;
    this.confirmDialogService
      .openDialog(title)
      .subscribe((confirmDialogService) => {
        if (confirmDialogService.deleteResponse) {
          this.establishmentService.removeFlashCard(id).subscribe({
            next: () => {
              this.snackbarService.showSnackbar(
                'Sucesso',
                'Flashcard removido!',
                3000
              );
              this.loadFlashCards(this.establishmentDetails.id!);
            },
            error: (error) =>
              this.snackbarService.showSnackbar(
                'Erro',
                'Não foi possível remover o flashcard!',
                3000
              ),
          });
        }
      });
  }
}
