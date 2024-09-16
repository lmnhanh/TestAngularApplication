import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { AppComponent } from 'app/app.component';
import { AuthService } from 'app/modules/auth/services/auth.service';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent]
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const spy = jasmine.createSpyObj('AuthService', ['login']);  // Create a spy
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: spy }]  // Provide the spy
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Auth service', () => {
    authServiceSpy.logIn({ username: 'LMA', password: '123454' }, () => {});

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(authServiceSpy.logIn).toHaveBeenCalled();
  });
});
