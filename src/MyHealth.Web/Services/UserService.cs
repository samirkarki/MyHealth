using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyHealth.Web.Helpers;
using MyHealth.Web.Models;

namespace MyHealth.Web.Services
{

    public interface IUserService
    {
        UserInfo Authenticate(string username, string password);
        UserInfo SocialAuthenticate(UserInfo userIn);
        UserInfo Create(UserInfo user);

    }


    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        // private readonly UserManager<UserInfo> _userManager;
        // private readonly SignInManager<UserInfo> _signInManager;
        private readonly CrudService<UserInfo> _userCrudService;
        public UserService(
            IOptions<AppSettings> appSettings,
             // UserManager<UserInfo> userManager,
             //  SignInManager<UserInfo> signInManager,
             CrudService<UserInfo> userCrudService
             )
        {
            _appSettings = appSettings.Value;
            // _userManager = userManager;
            // _signInManager = signInManager;
            _userCrudService = userCrudService;
        }


        public UserInfo Authenticate(string username, string password)
        {
            var user = _userCrudService.Query(u => u.UserName == username).FirstOrDefault();
            if (user == null)
            {
                return null;
            }
            else if (!string.IsNullOrEmpty(password) && !ValidatePassword(user, password))
            {
                return null;
            }
            return this.GenerateUserToken(user.WithoutPassword());
        }

        public UserInfo SocialAuthenticate(UserInfo userIn)
        {

            var user = _userCrudService.Query(u => u.UserName == userIn.UserName).FirstOrDefault();
            if (user == null)
            {
                user = Create(userIn);
            }
            return this.GenerateUserToken(user.WithoutPassword());
        }

        public UserInfo Create(UserInfo user)
        {
            if (!String.IsNullOrEmpty(user.Password))
                return _userCrudService.Create(UserWithEncryptedPassword(user, user.Password));
            else
                return _userCrudService.Create(user);
        }

        private UserInfo GenerateUserToken(UserInfo user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin":"Guest"),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim("UserName", user.UserName),
                    new Claim("FirstName", user.FirstName),
                    new Claim("LastName", user.LastName),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            user.Password = null;
            return user;
        }



        private byte[] GenerateSalt(int length)
        {
            var bytes = new byte[length];

            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(bytes);
            }

            return bytes;
        }

        private byte[] GenerateHash(byte[] password, byte[] salt, int iterations, int length)
        {
            using (var deriveBytes = new Rfc2898DeriveBytes(password, salt, iterations))
            {
                return deriveBytes.GetBytes(length);
            }
        }

        private UserInfo UserWithEncryptedPassword(UserInfo user, string password)
        {
            var saltBytes = GenerateSalt(5);
            var passwordBytes = GenerateHash(Encoding.UTF8.GetBytes(password), saltBytes, 5, 5);
            user.Salt = Encoding.UTF8.GetString(saltBytes, 0, saltBytes.Length);
            user.Password = Encoding.UTF8.GetString(passwordBytes, 0, passwordBytes.Length);
            return user;
        }

        private bool ValidatePassword(UserInfo user, string inputPassword)
        {
            var inputPasswordBytes = GenerateHash(Encoding.UTF8.GetBytes(inputPassword), Encoding.UTF8.GetBytes(user.Salt), 5, 5);
            return user.Password == Encoding.UTF8.GetString(inputPasswordBytes);
        }
    }
}
