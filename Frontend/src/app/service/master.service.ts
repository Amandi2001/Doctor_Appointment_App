import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  createNewAppointment(code: any) {
  return this.http.post("https://localhost:7024/api/Appointment/CreateNewAppointment", code);
}

searchPatientByMobile(mob: string) {
  return this.http.get("https://localhost:7024/api/Appointment/getPatientByMobileNo?mobile="+mob);
}

getAllAppointment(){
  return this.http.get("https://localhost:7024/api/Appointment/GetAllAppointment");
}

GetNewAppointment(){
  return this.http.get("https://localhost:7024/api/Appointment/GetNewAppointment");
}

GetDoneAppointment(){
  return this.http.get("https://localhost:7024/api/Appointment/GetDoneAppointment");
}

ChangeStatus(appointmentId: number) {
  return this.http.get("https://localhost:7024/api/Appointment/ChangeStatus?appointmentid=" + appointmentId);
}

// 🟢 Get all patients
  getAllPatient() {
    return this.http.get('https://localhost:7024/api/Appointment/getAllPatient');
  }

  // ✅ Get patient by ID
  getPatientById(id: number) {
    return this.http.get('https://localhost:7024/api/Appointment/${id}');
  }

  // ✏️ Update patient
  updatePatient(id: number, patient: any) {
    return this.http.put(`https://localhost:7024/api/Appointment/${id}`, patient);
  }

  // ❌ Delete patient
  deletePatient(id: number) {
    return this.http.delete(`https://localhost:7024/api/Appointment/${id}`);
  }



}
