using Sabio.Data.Providers;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class StripePaymentService : IStripePaymentsService
    {
        private IDataProvider _dataProvider;
        private ILookUpService _lookUpService;
        public StripePaymentService(IDataProvider dataProvider, ILookUpService lookUpService)
        {
            _dataProvider = dataProvider;
            _lookUpService = lookUpService;
        }
        public int AddSubscriber(SubscriberAddRequest model, int userId, DateTime currentPeriodEnd)
        {
            int id = 0;
            string procName = "[dbo].[Subscribers_Insert]";

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                MapSubscriberParams(model, col, userId, currentPeriodEnd);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }
        private static void MapSubscriberParams(SubscriberAddRequest model, SqlParameterCollection col, int userId, DateTime currentPeriodEnd)
        {
            col.AddWithValue("@UserId", userId);
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@StripeCustomerId", model.StripeCustomerId);
            col.AddWithValue("@SSubscriptionType", model.SubscriptionType);
            col.AddWithValue("@SubscriptionEnd", currentPeriodEnd);
        }
    }
}
