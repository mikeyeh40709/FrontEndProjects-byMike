﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebFrontEnd.Controllers
{
    public class MacController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
