using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Abstractions;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<UserActivity> UserActivities { get; }
    DbSet<Car> Cars { get; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
