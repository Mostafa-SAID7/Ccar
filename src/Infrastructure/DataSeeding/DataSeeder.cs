using Application.Interfaces;
using Infrastructure.DataSeeding.Seeders;

namespace Infrastructure.DataSeeding;

public class DataSeeder : IDataSeeder
{
    private readonly UserSeeder _userSeeder;
    private readonly CarSeeder _carSeeder;

    public DataSeeder(UserSeeder userSeeder, CarSeeder carSeeder)
    {
        _userSeeder = userSeeder;
        _carSeeder = carSeeder;
    }

    public async Task SeedAsync()
    {
        var user = await _userSeeder.SeedUsersAndRolesAsync();
        await _carSeeder.SeedCarsAsync(user);
    }
}
