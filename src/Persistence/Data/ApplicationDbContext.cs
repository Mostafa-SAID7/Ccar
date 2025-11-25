using Application.Abstractions;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Data;

public class ApplicationDbContext : IdentityDbContext<User, Role, string>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<UserActivity> UserActivities { get; set; } = null!;
    public DbSet<Car> Cars { get; set; } = null!;
    public DbSet<Post> Posts { get; set; } = null!;
    public DbSet<Comment> Comments { get; set; } = null!;
    public DbSet<Like> Likes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Configure Car decimal properties
        builder.Entity<Car>()
            .Property(c => c.Mileage)
            .HasPrecision(18, 2);

        builder.Entity<Car>()
            .Property(c => c.PricePerDay)
            .HasPrecision(18, 2);

        builder.Entity<Like>()
            .HasKey(l => new { l.PostId, l.UserId });

        builder.Entity<Like>()
            .HasOne(l => l.Post)
            .WithMany(p => p.Likes)
            .HasForeignKey(l => l.PostId)
            .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete cycle

        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
