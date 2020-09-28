using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CompliancePlatform_IdentityServer.Models;
using FlightManegement_IdentityServer.Data;

namespace CompliancePlatform_IdentityServer.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.seed();


        }
        public DbSet<tbl_FlightDetails> tbl_FlightDetails { get; set; }

        public DbSet<tbl_BookingDetails> tbl_BookingDetails { get; set; }
    }
}
