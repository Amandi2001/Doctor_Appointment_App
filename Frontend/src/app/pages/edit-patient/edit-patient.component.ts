import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  editForm!: FormGroup;
  patientId!: number;

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    // Get patient ID from route params
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));

    this.editForm = this.fb.group({
      patientId: [this.patientId], // Add patientId here
      patientName: [''],
      MobileNo: [''],
      email: [''],
      city: [''],
      address: ['']
    });

    // Optionally: Load patient data from API to fill the form here
    this.loadPatientData();
  }

  loadPatientData() {
    this.http.get<any>(`https://localhost:7024/api/Appointment/${this.patientId}`)
      .subscribe(data => {
        this.editForm.patchValue(data);
      });
  }

 onSubmit() {
  if (this.editForm.valid) {
    const payload = { patientId: this.patientId, ...this.editForm.value };
    this.http.put(`https://localhost:7024/api/Appointment/${this.patientId}`, payload)
      .subscribe(() => {
        alert('Patient updated successfully!');
        this.router.navigate(['/patient-list']);
      }, error => {
        alert('Failed to update patient.');
        console.error(error);
      });
  }
}
}
