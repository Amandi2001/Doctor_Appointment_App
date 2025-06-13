import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AppointmentListComponent } from './pages/appointment-list/appointment-list.component';
import { NewAppointmentComponent } from './pages/new-appointment/new-appointment.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { EditPatientComponent } from './pages/edit-patient/edit-patient.component';  // <-- Import the new component

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "appointment-list",
        component: AppointmentListComponent
      },
      {
        path: "new-appointment",
        component: NewAppointmentComponent
      },
      {
        path: "patient-list",
        component: PatientListComponent
      },
      {
        path: "edit-patient/:id",     // <-- Add this route here
        component: EditPatientComponent
      }
    ]
  }
];
