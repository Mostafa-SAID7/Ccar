using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Abstractions;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<UserActivity> UserActivities { get; }
    DbSet<Car> Cars { get; }
    DbSet<Post> Posts { get; }
    DbSet<Comment> Comments { get; }
    DbSet<Like> Likes { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
