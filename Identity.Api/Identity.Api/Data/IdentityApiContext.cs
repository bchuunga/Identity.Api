using Identity.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Identity.Api.Data
{
    public class IdentityApiContext : IdentityDbContext<User>
    {
        private readonly IConfiguration _configuration;

        public IdentityApiContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            base.OnConfiguring(options);
            options.UseSqlite(_configuration.GetConnectionString("IdentityApiContext"));
        }

        public DbSet<User> Users { get; set; }
    }
}
