import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  // Import RouterModule here
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms'; // ✅ Add this


@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],  // <-- Add RouterModule here
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  masterServ = inject(MasterService);
  private router = inject(Router);

  patientList: any[] = [];

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.masterServ.getAllPatient().subscribe((res: any) => {
      this.patientList = res as any[];
      this.filteredPatients = res;
    });
  }

  deletePatient(id: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.masterServ.deletePatient(id).subscribe(() => {
        alert("Patient deleted!");
        this.getAllPatients(); // Refresh list
      }, error => {
        alert("Error deleting patient.");
        console.error(error);
      });
    }
  }


  searchTerm: string = '';
filteredPatients: any[] = [];


onSearch() {
  const term = this.searchTerm.toLowerCase();
  this.filteredPatients = this.patientList.filter(patient =>
    patient.patientName.toLowerCase().includes(term) ||
    patient.mobileNo.includes(term) ||
    patient.email.toLowerCase().includes(term) ||
    patient.city.toLowerCase().includes(term)
  );
}

}
