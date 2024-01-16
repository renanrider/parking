import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { ConfirmDialogService } from '../../../../shared/components/confirm-dialog/confirm-dialog.service';
import { UsersService } from './users.service';
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component';
import { User } from './interfaces/user.interface';
import { uniqueEmailValidator } from '../../../../core/validators/uniqueEmailValidator';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'firstName',
    'lastName',
    'email',
    'role',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private confirmDialogService: ConfirmDialogService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe((response: any) => {
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

  removeAllUsers() {
    const ids: User[] = this.selection.selected;
    ids.forEach((a) => {
      console.log(a.id);
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id! + 1
    }`;
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '800px',
      data: {
        dialogTitle: 'Adicionar Usuário',
      },
    });
    dialogRef.afterClosed().subscribe((user: User) => {
      if (!user) return;
      const userCreate: User = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      };

      this.usersService.createUser(userCreate).subscribe({
        next: () => {
          this.snackbarService.showSnackbar('Sucesso', 'usuário criado!', 3000);
          this.loadUsers();
        },
        error: () =>
          this.snackbarService.showSnackbar(
            'Erro',
            'Não foi possível criar o usuário!',
            3000
          ),
      });
    });
  }

  openEditUserDialog(user: User) {
    console.log(user);
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '800px',
      data: {
        dialogTitle: 'Editar Usuário',
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
    dialogRef.afterClosed().subscribe((user: User) => {
      if (!user) return;
      const userData: User = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      this.usersService.updateUser(userData).subscribe({
        next: () => {
          this.snackbarService.showSnackbar(
            'Sucesso',
            'Usuário atualizado!',
            3000
          );
          this.loadUsers();
        },
        error: () =>
          this.snackbarService.showSnackbar(
            'Erro',
            'Não foi possível atualizar o usuário!',
            3000
          ),
      });
    });
  }

  openRemoveUserDialog() {
    const id = this.selection.selected[0].id;
    const firstName = this.selection.selected[0].firstName;
    this.confirmDialogService
      .openDialog(firstName)
      .subscribe((confirmDialogService) => {
        if (confirmDialogService.deleteResponse) {
          this.usersService.removeFlashCard(id!).subscribe({
            next: () => {
              this.snackbarService.showSnackbar(
                'Sucesso',
                'Usuário removido!',
                3000
              );
              this.loadUsers();
            },
            error: () =>
              this.snackbarService.showSnackbar(
                'Erro',
                'Não foi possível remover o usuário!',
                3000
              ),
          });
        }
      });
  }
}
