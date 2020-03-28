using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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
        UserInfo Authenticate(string email);
        UserInfo Authenticate(string email, string password);
        void Create(UserInfo model);
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


        public UserInfo Authenticate(string email, string password)
        {
            List<UserInfo> _users = new List<UserInfo>
            {
                new UserInfo { Id = "1", FirstName = "Test", LastName = "User", UserName = "test", Email = "contact.me.manoz@gmail.com" }
            };

            // if email and password given
            // search database for the user
            // get user, generate token
            // else
            // if email only is given
            // search user by email
            // get token
            // end

            var user = _users.SingleOrDefault(x => x.Email == email);

            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return user.WithoutPassword();
        }

        public UserInfo Authenticate(string email)
        {
            List<UserInfo> _users = new List<UserInfo>
            {
                new UserInfo { Id = "1", FirstName = "Test", LastName = "User", UserName = "test", Email = "contact.me.manoz@gmail.com" }
            };

            // if email and password given
            // search database for the user
            // get user, generate token
            // else
            // if email only is given
            // search user by email
            // get token
            // end

            var user = _users.SingleOrDefault(x => x.Email == email);

            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return user.WithoutPassword();
        }

        public void Create(UserInfo model)
        {
            throw new NotImplementedException();
        }
    }
}
