using System;
using System.Text;
using FluentValidation;
using FluentValidation.AspNetCore;
using Identity.Api.Data;
using Identity.Api.Dtos;
using Identity.Api.Identity;
using Identity.Api.Models;
using Identity.Api.Services;
using Identity.Api.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var appCors = "_appCors";
var jwtOptions = new JwtOptions();
builder.Configuration.GetSection("JWT").Bind(jwtOptions);

builder.Services.AddSingleton(jwtOptions);

builder.Services.AddCors(options =>
{
    options.AddPolicy(appCors, policy =>
    {
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddScoped<JwtService>();

builder.Services.AddEntityFrameworkSqlite().AddDbContext<IdentityApiContext>();

builder.Services.AddIdentityCore<User>(options =>
{
    options.Password.RequiredLength = 4;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.SignIn.RequireConfirmedEmail = true;
})
    .AddRoles<IdentityRole>()
    .AddRoleManager<RoleManager<IdentityRole>>()
    .AddEntityFrameworkStores<IdentityApiContext>()
    .AddSignInManager<SignInManager<User>>()
    .AddUserManager<UserManager<User>>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.JwtKey)),
            ValidIssuer = jwtOptions.JwtIssuer,
            ValidateIssuer = true,
            ValidateAudience = false
        };
    });

builder.Services.AddControllers().AddFluentValidation();
builder.Services.AddScoped<IValidator<RegisterDto>, RegisterUserValidator>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
