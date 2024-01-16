import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ColorSwatchesModule } from 'ngx-color/swatches';
import { HeaderComponent } from './components/header/header.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { ShortcutComponent } from './components/shortcut/shortcut.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CardStatsComponent } from './components/card-stats/card-stats.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ColorSwatchesModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    DragDropModule,
    MatCheckboxModule,
    MatDialogModule,
    CdkAccordionModule,
    MatBottomSheetModule,
    MatListModule,
    MatSnackBarModule,
  ],
  declarations: [
    BottomNavComponent,
    HeaderComponent,
    ShortcutComponent,
    SidenavComponent,
    TopNavComponent,
    SnackbarComponent,
    ConfirmDialogComponent,
    CardStatsComponent,
  ],
  exports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BottomNavComponent,
    HeaderComponent,
    ShortcutComponent,
    SidenavComponent,
    TopNavComponent,
    ColorSwatchesModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    DragDropModule,
    MatCheckboxModule,
    MatDialogModule,
    CdkAccordionModule,
    MatBottomSheetModule,
    MatListModule,
    SnackbarComponent,
    ConfirmDialogComponent,
    CardStatsComponent,

    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
})
export class SharedModule {}
