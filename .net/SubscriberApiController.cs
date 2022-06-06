using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Subscribers;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/subscribers")]
    [ApiController]
    public class SubscriberApiController : BaseApiController
    {
        private ISubscriberService _service = null;
        public SubscriberApiController(ISubscriberService service, ILogger<SubscriberApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Subscriber>>> GetAll(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Subscriber> page = _service.GetAll(pageIndex, pageSize);


                if (page == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found");

                }
                else
                {
                    response = new ItemResponse<Paged<Subscriber>> { Item = page };

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
