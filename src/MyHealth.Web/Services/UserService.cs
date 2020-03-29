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
        UserInfo Authenticate(string email, string password = null);
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


        public UserInfo Authenticate(string email, string password = null)
        {
            List<UserInfo> _users = new List<UserInfo>
            {
                new UserInfo { Id = "1", FirstName = "Test", LastName = "User", UserName = "test", Email = "contact.me.manoz@gmail.com", Role = Role.Admin }
            };

            var user = _userCrudService.Query(u=>u.Email==email).FirstOrDefault();


            // if email and password given
            // search database for the user
            // get user, generate token
            // else
            // if email only is given
            // search user by email
            // get token
            // end

            //var user = _users.SingleOrDefault(x => x.Email == email);

            if (user == null)
            {
                return null;
            }
            else if(!string.IsNullOrEmpty(password) && !ValidatePassword(user, password))
            {
                return null;
            }
            else
            {
                return this.GenerateUserToken(user);
            }
        }

        public UserInfo Create(UserInfo user)
        {
            return _userCrudService.Create(UserWithEncryptedPassword(user,user.Password));
        }

        private UserInfo GenerateUserToken(UserInfo user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, user.Email.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(ClaimTypes.Name, user.Id.ToString()) 
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            user.Password=null;
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

        private UserInfo UserWithEncryptedPassword(UserInfo user, string password){
            var saltBytes = GenerateSalt(5);
            var passwordBytes = GenerateHash(Encoding.UTF8.GetBytes(password),saltBytes,5,5);
            user.Salt=Encoding.UTF8.GetString(saltBytes, 0, saltBytes.Length);
            user.Password=Encoding.UTF8.GetString(passwordBytes, 0, passwordBytes.Length);
            return user;
        }
        
        private bool ValidatePassword(UserInfo user, string inputPassword){
            var inputPasswordBytes =  GenerateHash(Encoding.UTF8.GetBytes(inputPassword),Encoding.UTF8.GetBytes(user.Salt),5,5);
            return user.Password==Encoding.UTF8.GetString(inputPasswordBytes);
        }
    }
}
