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

        public UsersController(IUserService userService, CrudService<UserInfo> userCrudService)
        {
            _userService = userService;
            _userCrudService = userCrudService;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("~/api/Authentication")]
        public IActionResult Authentication(string username, string password)
        {
       
            var user = _userService.Authenticate(username, password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect." });

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("~/api/SocialAuthentication")]
        public IActionResult SocialAuthentication(UserInfo model)
        {
       
            var user = _userService.SocialAuthenticate(model);

            if (user == null)
                return BadRequest(new { message = "User cannot be authenticated." });

            return Ok(user);
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
        public IEnumerable<UserInfo> Get(string filter)
        {
            return _userCrudService.Query(filter);
        }
 

        [HttpPut]
        [Route("{userId}/admin")]
        public IActionResult Admin(string userId)
        {
       
            var user = _userCrudService.Get(userId);
            if (user == null)
                return BadRequest(new { message = "User does not exist." });
            user.IsAdmin=true;
            _userCrudService.Update(user.Id, user);
            return Ok(user);
        }
       
    }
}
