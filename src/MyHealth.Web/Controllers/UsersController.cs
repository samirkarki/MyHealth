using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using MyHealth.Web.Helpers;
using MyHealth.Web.Models;
using Microsoft.AspNetCore.Identity;
using MyHealth.Web.Services;

namespace MyHealth.Web.Controllers
{
    public class UsersController : MyHealthController
    {
        private readonly IUserService _userService;
        private readonly CrudService<UserInfo> _userCrudService;
        private readonly AppSettings _settings;
        public UsersController(IUserService userService, CrudService<UserInfo> userCrudService, IOptions<AppSettings> settings)
        {
            _userService = userService;
            _userCrudService = userCrudService;
            _settings = settings.Value;
        }


        // [AllowAnonymous]
        // [HttpPost]
        // [Route("~/api/Authentication")]
        // public IActionResult UserAuthentication(string username, string password)
        // {

        //     var user = _userService.Authenticate(username, password);

        //     if (user == null)
        //         return BadRequest(new { message = "Username or password is incorrect." });

        //     UserDTO userInfo = new UserDTO();
        //     userInfo.Email = user.Email;
        //     userInfo.FirstName = user.FirstName;
        //     userInfo.LastName = user.LastName;
        //     userInfo.UserName = user.UserName;
        //     userInfo.UserId = user.Id;
        //     userInfo.Token = user.Token;
        //     return Ok(userInfo);
        // }

        [AllowAnonymous]
        [HttpGet]
        [Route("~/api/settings")]
        public IActionResult GetSettings()
        {
            return Ok(_settings);
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("~/api/authentication")]
        public IActionResult Authentication(UserInfo model)
        {
            UserInfo user = new UserInfo();
            if (String.IsNullOrEmpty(model.Password))
                user = _userService.SocialAuthenticate(model);
            else
                user = _userService.Authenticate(model.UserName, model.Password);

            if (user == null)
                return BadRequest(new { message = "User cannot be authenticated." });

            UserDTO userInfo = new UserDTO();
            userInfo.Email = user.Email;
            userInfo.FirstName = user.FirstName;
            userInfo.LastName = user.LastName;
            userInfo.UserName = user.UserName;
            userInfo.UserId = user.Id;
            userInfo.IsAdmin = user.IsAdmin;
            userInfo.Token = user.Token;
            return Ok(userInfo);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Post(UserInfo user)
        {
            var createdUser = _userService.Create(user);

            if (user == null)
                return BadRequest(new { message = "User registration failed." });

            return Ok(user);
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<UserInfo> Get(string filter)
        {
            return string.IsNullOrEmpty(filter) ? _userCrudService.Get() : _userCrudService.Query(filter);
        }


        [HttpPut]
        [Route("{userId}/admin")]
        public IActionResult Admin(string userId)
        {

            var user = _userCrudService.Get(userId);
            if (user == null)
                return BadRequest(new { message = "User does not exist." });
            user.IsAdmin = !user.IsAdmin;
            _userCrudService.Update(user.Id, user);
            return Ok(user);
        }


        [Authorize]
        [HttpPost]
        [Route("~/api/user/logout")]
        public IActionResult Logout(string filter)
        {
            return Ok();
        }

    }
}
