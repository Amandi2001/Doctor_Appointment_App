using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Doctor_Appoinment.Model


{
    public class AppointmentDbContextcs:DbContext
    {
        public AppointmentDbContextcs(DbContextOptions<AppointmentDbContextcs> options) :base(options)
        {
        }

        public DbSet<Appointments> Appointments { get; set; }

        public DbSet<Patient> Patients   { get; set; }

    }
    [Table("patient")]

    public class Patient
    {
        [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int patientId { get; set; }
        [Required]
        public string patientName { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        [Required]
        public string city { get; set; }= string.Empty;
        [Required]
        public string address { get; set; }= string.Empty;

    }

    public class NewAppintmentModel
    {
        public int patientId { get; set; }
        [Required]
        public string patientName { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        [Required]
        public string city { get; set; } = string.Empty;
        [Required]
        public string address { get; set; } = string.Empty;
        public DateTime appointmentDate { get; set; }


    }


    [Table("appointments")]

    public class Appointments
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int appointmentId { get; set; }
        [Required]
        public int patientId { get; set; }
        [Required]
        public DateTime appointmentDate{ get; set; }
        [Required]
        public bool isDone { get; set; } 
        public Nullable  <double> fees { get; set; } 

    }



}



