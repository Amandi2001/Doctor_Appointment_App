using Doctor_Appoinment.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;



namespace Doctor_Appoinment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAngularApp")]
    public class AppointmentController : ControllerBase
    {
        private readonly  AppointmentDbContextcs _context;

        public AppointmentController(AppointmentDbContextcs context)
        {
            _context = context;
        }
        [Route("GetAllAppointment")]
        [HttpGet]

        public IActionResult GetAllAppointment()
        {
            var list = ( from appointment in _context.Appointments
                         join patient in _context.Patients on appointment.patientId equals patient.patientId
                         select new
                         {
                             patientName = patient.patientName,
                             MobileNo = patient.MobileNo,
                             city = patient.city,
                             appointmentId = appointment.appointmentId,
                             appointmentDate = appointment.appointmentDate,
                             isDone = appointment.isDone,



                         }
                ).ToList();
            return Ok(list);

        }


        [Route("GetNewAppointment")]
        [HttpGet]

        public IActionResult GetNewAppointment()
        {
            var list = (from appointment in _context.Appointments
                        where appointment.isDone == false
                        join patient in _context.Patients on appointment.patientId equals patient.patientId
                        select new
                        {
                            patientName = patient.patientName,
                            MobileNo = patient.MobileNo,
                            city = patient.city,
                            appointmentId = appointment.appointmentId,
                            appointmentDate = appointment.appointmentDate,
                            isDone = appointment.isDone,



                        }
                ).ToList();
            return Ok(list);

        }


        [Route("GetDoneAppointment")]
        [HttpGet]

        public IActionResult GetDoneAppointment()
        {
            var list = (from appointment in _context.Appointments
                        where appointment.isDone == true
                        join patient in _context.Patients on appointment.patientId equals patient.patientId
                        select new
                        {
                            patientName = patient.patientName,
                            MobileNo = patient.MobileNo,
                            city = patient.city,
                            appointmentId = appointment.appointmentId,
                            appointmentDate = appointment.appointmentDate,
                            isDone = appointment.isDone,



                        }
                ).ToList();
            return Ok(list);

        }

        [Route("ChangeStatus")]
        [HttpGet]

        public IActionResult ChangeStatus(int appointmentid)
        {
            var data = _context.Appointments.SingleOrDefault(m => m.appointmentId == appointmentid);
            data.isDone = true;

            _context.SaveChanges();
            return Ok(data);

        }

        [Route("getPatientByMobileNo")]
        [HttpGet]

        public IActionResult getPatientByMobileNo(string mobile)
        {
            var data = _context.Patients.SingleOrDefault(m => m.MobileNo == mobile);
            if(data != null)
            {
                return Ok(data);
            }
            else
            {
                return NotFound();
            }
               


        }

        // 🟢 Get all patients
        [HttpGet("getAllPatient")]
        public IActionResult GetAllPatient()
        {
            var list = _context.Patients.ToList();
            return Ok(list);
        }

        // ✅ GET single patient by ID (this was missing)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
                return NotFound("Patient not found");

            return Ok(patient);
        }


        [Route("CreateNewAppointment")]
        [HttpPost]
        public IActionResult CreateNewAppointment([FromBody] NewAppintmentModel obj)
        {
            var isPatientExist = _context.Patients.SingleOrDefault(m => m.MobileNo == obj.MobileNo);
            if (isPatientExist == null)
            {
                Patient _newPat = new Patient()
                {
                    MobileNo = obj.MobileNo,
                    address = obj.address,
                    city = obj.city,
                    email = obj.email,
                    patientName = obj.patientName,
                };
                _context.Patients.Add(_newPat);
                _context.SaveChanges();

                Appointments _newAppoint = new Appointments()
                {
                    patientId = _newPat.patientId,
                    appointmentDate = obj.appointmentDate,
                    isDone = false
                };
                _context.Appointments.Add(_newAppoint);
                _context.SaveChanges();
            }
            else
            {
                Appointments _newAppoint = new Appointments()
                {
                    patientId = isPatientExist.patientId,
                    appointmentDate = obj.appointmentDate,
                    isDone = false
                };
                _context.Appointments.Add(_newAppoint);
                _context.SaveChanges();
            }

            // ✅ Return JSON object instead of plain string
            return Ok(new { message = "Appointment Created" });
        }




        // 🟢 PUT update patient
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] Patient model)
        {
            if (id != model.patientId)
                return BadRequest("Patient ID mismatch");

            var existing = await _context.Patients.FindAsync(id);
            if (existing == null)
                return NotFound("Patient not found");

            existing.patientName = model.patientName;
            existing.MobileNo = model.MobileNo;
            existing.email = model.email;
            existing.city = model.city;
            existing.address = model.address;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 🟢 DELETE patient
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null) return NotFound();

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }



}

