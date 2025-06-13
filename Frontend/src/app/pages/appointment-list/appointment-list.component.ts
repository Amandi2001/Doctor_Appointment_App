import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  masterServ = inject(MasterService);

  appointmentList: any[] = [];
  filteredAppointments: any[] = [];
  activeBtnName: string = "All";
  searchTerm: string = '';

  ngOnInit(): void {
    this.getAllAppointment();
  }

  getAllAppointment() {
    this.activeBtnName = "All";
    this.masterServ.getAllAppointment().subscribe((res: any) => {
      this.appointmentList = res;
      this.filteredAppointments = res;
      this.onSearch(); // Apply current search term if any
    });
  }

  getNewAppointment() {
    this.activeBtnName = "New";
    this.masterServ.GetNewAppointment().subscribe((res: any) => {
      this.appointmentList = res;
      this.filteredAppointments = res;
      this.onSearch();
    });
  }

  getDoneAppointment() {
    this.activeBtnName = "Done";
    this.masterServ.GetDoneAppointment().subscribe((res: any) => {
      this.appointmentList = res;
      this.filteredAppointments = res;
      this.onSearch();
    });
  }

  onMarkDone(id: number) {
    this.masterServ.ChangeStatus(id).subscribe(() => {
      this.getAllAppointment();
    });
  }

onSearch() {
  const term = this.searchTerm.toLowerCase();
  this.filteredAppointments = this.appointmentList.filter(item =>
    item.patientName.toLowerCase().includes(term) ||
    item.mobileNo.includes(term) ||
    item.city.toLowerCase().includes(term) ||
    item.appointmentId.toString().includes(term)
  );
}

}
