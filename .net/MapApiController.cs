using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;


namespace Sabio.Web.Api.Controllers
{
    [Route("api/maps")]
    [ApiController]
    public class MapApiController : BaseApiController
    {
        private IMapService _service = null;

        public MapApiController(IMapService service, ILogger<MapApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpGet("states/{id:int}")]
        public ActionResult<ItemResponse<string>> GetById(int id)
        {
            int iCode = 200;

            BaseResponse response = null;

            try
            {

                string state = _service.GetStateById(id);


                if (state == null)
                {
                    iCode = 404;

                    response = new ErrorResponse("State Not Found");

                }
                else
                {
                    response = new ItemResponse<string> { Item = state };
                }
            }

            catch (Exception ex)
            {
                iCode = 500;
               
                response = new ErrorResponse($"Generic Error: { ex.Message}");
                
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);

        }
        [HttpGet]
        public ActionResult<ItemResponse<string>> GetAllStates()
        {
            int iCode = 200;

            BaseResponse response = null;

            try
            {
               string state = _service.GetAllStates();

                if (state == null)
                {
                    iCode = 404;

                    response = new ErrorResponse("State Not Found");
                }
                else
                {
                    response = new ItemResponse<string> { Item = state };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;

                response = new ErrorResponse($"Generic Error: { ex.Message}");

                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);

        }
    }

}
