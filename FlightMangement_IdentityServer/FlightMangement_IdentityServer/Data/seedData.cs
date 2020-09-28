using CompliancePlatform_IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightManegement_IdentityServer.Data
{
    public static class ModelBuilderExtension
    {
        public static void seed(this ModelBuilder modelBuilder)
        {
            string adminRoldId = Guid.NewGuid().ToString();
            string userRoleId = Guid.NewGuid().ToString();
            string adminId = Guid.NewGuid().ToString();
            modelBuilder.Entity<IdentityRole>().HasData(
               new IdentityRole
               {
                   Id = adminRoldId,
                   Name = "admin",
                   NormalizedName = "ADMIN"

               },
               new IdentityRole
               {
                   Id = userRoleId,
                   Name = "user",
                   NormalizedName = "USER"
               });
            var hasher = new PasswordHasher<ApplicationUser>();
            modelBuilder.Entity<ApplicationUser>().HasData(
               new ApplicationUser
               {
                   Id = adminId,
                   UserName = "admin@yopmail.com",
                   NormalizedUserName = "ADMIN",
                   Email = "admin@yopmail.com",
                   Name="admin",
                   PasswordHash = hasher.HashPassword(null, "Pass@123")

               }
               );
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
               new IdentityUserRole<string>
               {
                   RoleId = adminRoldId,
                   UserId = adminId

               }
               );
        }
    }
}
