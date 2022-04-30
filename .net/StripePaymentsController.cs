using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Sabio.Models.AppSettings;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class StripePaymentsController : BaseApiController
	{
		private AppKeys _appKeys;
		public StripePaymentsController(ILogger<StripePaymentsController> logger, IOptions<AppKeys> appKeys) : base(logger)
		{
			_appKeys = appKeys.Value;
			var appKey = _appKeys.StripeAppKey;
			StripeConfiguration.ApiKey = appKey;
		}

	[HttpPost("create-checkout-session")]
		public async Task<IActionResult> CreateCheckoutSession([FromBody] StripeCheckout req)
		{
			var options = new SessionCreateOptions
			{
				SuccessUrl = "http://localhost:3000/success",
				CancelUrl = "http://localhost:3000/failure",
				PaymentMethodTypes = new List<string>
				{
					"card",
				},
				Mode = "payment",
				LineItems = new List<SessionLineItemOptions>
				{
					new SessionLineItemOptions
					{
						Price = req.PriceId,
						Quantity = 1,
					},
				},
			};

			var service = new SessionService();
			service.Create(options);
			try
			{
				var session = await service.CreateAsync(options);
				return Ok(new StripeCheckoutResponse
				{
					SessionId = session.Id,
				});
			}
			catch (StripeException e)
			{
				Console.WriteLine(e.StripeError.Message);
				return BadRequest(new ErrorResponse(e.Message));
			}
		}
	}
}
