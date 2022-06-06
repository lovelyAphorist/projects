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
using System.IO;
using Sabio.Models.Domain.Stripe;
using Sabio.Services;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class StripePaymentsController : BaseApiController
	{
		private IStripePaymentsService _service;
		private IAuthenticationService<int> _authService;

		private AppKeys _appKeys;
		public StripePaymentsController(ILogger<StripePaymentsController> logger, IOptions<AppKeys> appKeys, IAuthenticationService<int> authService, IStripePaymentsService service) : base(logger)
		{
			_appKeys = appKeys.Value;
			var appKey = _appKeys.StripeAppKey;
			StripeConfiguration.ApiKey = appKey;
			var whKey = _appKeys.WHStripeKey;
			_authService = authService;
			_service = service;
		}

	[HttpPost("single")]
		public async Task<IActionResult> CreateSingleCheckoutSession([FromBody] StripeCheckout req)
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

		[HttpPost("subscription")]
		public async Task<IActionResult> CreateSubscriptionCheckoutSession([FromBody] StripeCheckout req)
		{
			var options = new SessionCreateOptions
			{
				SuccessUrl = "https://localhost:3000/",
				CancelUrl = "https://localhost:3000/failure",
				PaymentMethodTypes = new List<string>
				{
					"card",
				},
				Mode = "subscription",
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
		[HttpPost("webhook")]
		public async Task<IActionResult> WebHook()
		{
			var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

			try
			{
				var stripeEvent = EventUtility.ConstructEvent(
				 json,
				 Request.Headers["Stripe-Signature"],
				 _appKeys.WHStripeKey
			   );
				
				if (stripeEvent.Type == Events.CustomerSubscriptionCreated)
				{
					var subscription = stripeEvent.Data.Object as Subscription;

					var customer = stripeEvent.Data.Object as Customer;

					 AddSubscriptionToDb(subscription, customer);
				}
				else
				{
					Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
				}
				return Ok();
			}
			catch (StripeException e)
			{
				Console.WriteLine(e.StripeError.Message);

				return BadRequest();
			}
		}
		private void AddSubscriptionToDb(Subscription subscription, Customer customer)
		{
			ObjectResult result;
			try
			{
				
				int userId = _authService.GetCurrentUserId();

				DateTime currentPeriodEnd = subscription.CurrentPeriodEnd;


				var subscriber = new Subscriber
				{
					Email = customer.Email,

					StripeCustomerId = subscription.CustomerId,

					SubscriptionType = 1,
					
				};			
				_service.AddSubscriber(subscriber, userId, currentPeriodEnd);
			}
			catch (System.Exception ex)
			{
				Logger.LogError(ex.ToString());
				ErrorResponse response = new ErrorResponse(ex.Message);
				result = StatusCode(500, response);
			}
		}
	}
}
