using FluentValidation;
using Identity.Api.Data;
using Identity.Api.Dtos;

namespace Identity.Api.Validators
{
    public class RegisterUserValidator : AbstractValidator<RegisterDto>
    {
        public RegisterUserValidator()
        {
            RuleFor(x => x.Password)
                .MinimumLength(5)
                .MaximumLength(14)
                .NotEmpty();
            RuleFor(x => x.ConfirmPassword)
                .NotEmpty();
            RuleFor(x => x.LastName)
                .MaximumLength(128)
                .NotEmpty();
            RuleFor(x => x.FirstName)
                .MaximumLength(128)
                .NotEmpty();
            RuleFor(x => x.Email)
                .MaximumLength(128)
                .NotEmpty();
        }
    }
}
