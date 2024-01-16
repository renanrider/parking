import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { ConfirmDialogService } from '../../../../shared/components/confirm-dialog/confirm-dialog.service';
import { CreateEstablishmentDialogComponent } from './components/create-establishment-dialog/create-establishment-dialog.component';
import { EstablishmentService } from './establishment.service';
import { Establishment } from './interfaces/establishment.interface';

@Component({
  selector: 'app-establishment-manager',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss'],
})
export class EstablishmentComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'name',
    'amountyMotorcycle',
    'amountyCar',
    'actions',
  ];
  dataSource = new MatTableDataSource<Establishment>();
  selection = new SelectionModel<Establishment>(true, []);
  result = '';

  constructor(
    private establishmentService: EstablishmentService,
    private snackbarService: SnackbarService,
    private confirmDialogService: ConfirmDialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEstablishments();
  }

  loadEstablishments() {
    this.establishmentService
      .getAllEstablishments()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  }

  openDialogAddEstablishments() {
    const dialogRef = this.dialog.open(CreateEstablishmentDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((establishment: Establishment) => {
      this.establishmentService.createEstablishment(establishment).subscribe({
        next: () => {
          this.snackbarService.showSnackbar(
            'Sucesso',
            'Estabelecimento criado!',
            3000
          );
          this.loadEstablishments();
        },
        error: (err) => {
          this.snackbarService.showSnackbar(
            'Erro',
            'Não foi possível criar o estabelecimento!',
            3000
          );
          console.log(err);
        },
      });
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

  removeOneEstablishment() {
    const id = this.selection.selected[0].id;
    const title = this.selection.selected[0].name;
    this.confirmDialogService
      .openDialog(title)
      .subscribe((confirmDialogService) => {
        if (confirmDialogService.deleteResponse) {
          this.establishmentService.Establishment(id).subscribe({
            next: () => {
              this.snackbarService.showSnackbar(
                'Sucesso',
                'Deck removido!',
                3000
              );
              this.loadEstablishments();
            },
            error: () =>
              this.snackbarService.showSnackbar(
                'Erro',
                'Não foi possível remover o deck!',
                3000
              ),
          });
        }
      });
  }

  removeAllEstablishments() {
    const ids: Establishment[] = this.selection.selected;
    ids.forEach((a) => {
      console.log(a.id);
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Establishment): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
