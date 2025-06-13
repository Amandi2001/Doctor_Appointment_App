import { Component, inject } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-appointment',
  imports: [FormsModule],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.css'
})
export class NewAppointmentComponent {

  masterServ = inject(MasterService);

  apointmentObj: any = {
    patientId: 0,
    patientName: "",
    MobileNo: "",   // ✅ Make sure this is 'MobileNo'
    email: "",
    city: "",
    address: "",
    appointmentDate: "",
  }

  onSave() {
    this.masterServ.createNewAppointment(this.apointmentObj).subscribe((res: any) => {
      alert("Appointment Create Success");
    }, (error: any) => {   // ✅ Declare 'error' type
      console.error("Error occurred", error);
    });
  }

  getPatientInfo() {
    this.apointmentObj.patientName="";
    
    this.apointmentObj.email="";
    this.apointmentObj.city="";
    this.apointmentObj. address="";
    this.apointmentObj.email="";
    this.masterServ.searchPatientByMobile(this.apointmentObj.MobileNo).subscribe((res: any) => {
      this.apointmentObj.patientName = res.patientName;
      this.apointmentObj.email = res.email;
      this.apointmentObj.city = res.city;
      this.apointmentObj.address = res.address;
    }, (error: any) => {
      alert("This is a new customer.");
    });
  }
}
