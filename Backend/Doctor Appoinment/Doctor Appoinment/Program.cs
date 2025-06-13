using Doctor_Appoinment.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Correct origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Other services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppointmentDbContextcs>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AppointmentCon")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS before authorization and routing
app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
