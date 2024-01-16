import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarComponent } from './snackbar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

describe('Snackbar', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [SnackbarComponent],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: { message: 'Test Message' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('display the message', () => {
    fixture.detectChanges();

    const spanElement = fixture.nativeElement.querySelector('span');
    expect(spanElement.textContent).toEqual('Test Message');
  });

  it('call dismiss() method when the close button is clicked', () => {
    const dismissSpy = spyOn(component, 'dismiss');
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();

    expect(dismissSpy).toHaveBeenCalled();
  });
});
