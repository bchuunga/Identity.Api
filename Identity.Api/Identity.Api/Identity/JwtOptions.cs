namespace Identity.Api.Identity
{
    public class JwtOptions
    {
    public string JwtKey { get; set; }
    public string JwtExpiresInDays { get; set; }
    public string JwtIssuer { get; set; }
    }
}
