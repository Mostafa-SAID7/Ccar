using Application.Abstractions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataSeeding.Seeders;

public class CarSeeder
{
    private readonly IApplicationDbContext _context;

    public CarSeeder(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SeedCarsAsync(User owner)
    {
        if (await _context.Cars.AnyAsync())
            return;

        var cars = new List<Car>
        {
            new Car
            {
                Make = "Tesla",
                Model = "Model 3",
                Year = 2023,
                Color = "Pearl White",
                LicensePlate = "ABC-1234",
                VIN = "5YJ3E1EA1JF123456",
                Mileage = 1500,
                Description = "Standard Range Plus, Autopilot included.",
                ImageUrl = "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                IsAvailable = true,
                PricePerDay = 120,
                OwnerId = owner.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Car
            {
                Make = "Ford",
                Model = "Mustang GT",
                Year = 2022,
                Color = "Race Red",
                LicensePlate = "MUS-5678",
                VIN = "1FA6P8CF5M5123456",
                Mileage = 5000,
                Description = "5.0L V8, 6-speed manual transmission.",
                ImageUrl = "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                IsAvailable = true,
                PricePerDay = 150,
                OwnerId = owner.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Car
            {
                Make = "Toyota",
                Model = "Camry",
                Year = 2021,
                Color = "Celestial Silver",
                LicensePlate = "CAM-9012",
                VIN = "4T1B11HK4MU123456",
                Mileage = 25000,
                Description = "Reliable daily driver, excellent fuel economy.",
                ImageUrl = "https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                IsAvailable = true,
                PricePerDay = 60,
                OwnerId = owner.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Car
            {
                Make = "BMW",
                Model = "M4 Competition",
                Year = 2024,
                Color = "Isle of Man Green",
                LicensePlate = "MPO-WR1",
                VIN = "WBS33AZ050FK12345",
                Mileage = 500,
                Description = "High performance coupe, carbon bucket seats.",
                ImageUrl = "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                IsAvailable = true,
                PricePerDay = 300,
                OwnerId = owner.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Car
            {
                Make = "Mercedes-Benz",
                Model = "G-Class",
                Year = 2023,
                Color = "Obsidian Black",
                LicensePlate = "GWA-GON",
                VIN = "W1N4632341X123456",
                Mileage = 3000,
                Description = "Luxury SUV, off-road capable.",
                ImageUrl = "https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                IsAvailable = false,
                PricePerDay = 450,
                OwnerId = owner.Id,
                CreatedAt = DateTime.UtcNow
            }
        };

        await _context.Cars.AddRangeAsync(cars);
        await _context.SaveChangesAsync();
    }
}
