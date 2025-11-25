using Domain.Constants;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.DataSeeding.Seeders;

public class UserSeeder
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<User> _userManager;

    public UserSeeder(RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    public async Task<User> SeedUsersAndRolesAsync()
    {
        // Ensure all roles exist
        var roles = new[]
        {
            Roles.Anonymous,
            Roles.User,
            Roles.Admin,
            Roles.Expert,
            Roles.Reviewer,
            Roles.Author,
            Roles.Instructor,
            Roles.Mechanic,
            Roles.GarageOwner,
            Roles.Vendor,
            Roles.Affiliate
        };

        foreach (var roleName in roles)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        // Seed default user
        var defaultEmail = "role.cc@gmail.com";
        var defaultPassword = "Car@1234";

        var existingUser = await _userManager.FindByEmailAsync(defaultEmail);
        if (existingUser == null)
        {
            var user = new User
            {
                UserName = defaultEmail,
                Email = defaultEmail,
                EmailConfirmed = true,
                FirstName = "Default",
                LastName = "User"
            };

            var result = await _userManager.CreateAsync(user, defaultPassword);
            if (result.Succeeded)
            {
                // Assign all roles to the default user
                await _userManager.AddToRolesAsync(user, roles);
            }
            return user;
        }
        else
        {
            // Ensure the user has all roles
            var userRoles = await _userManager.GetRolesAsync(existingUser);
            var missingRoles = new List<string>();
            foreach (var roleName in roles)
            {
                if (!userRoles.Contains(roleName))
                    missingRoles.Add(roleName);
            }
            if (missingRoles.Count > 0)
            {
                await _userManager.AddToRolesAsync(existingUser, missingRoles);
            }
            return existingUser;
        }
    }
}
