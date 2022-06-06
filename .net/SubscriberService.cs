using Sabio.Data.Providers;
using Sabio.Models.Domain.Subscribers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Sabio.Data;
using Sabio.Models;
using Sabio.Services.Interfaces;

namespace Sabio.Services
{
    public class SubscriberService : ISubscriberService
    {
        IDataProvider _data = null;
        public SubscriberService(IDataProvider data)
        {
            _data = data;
        }
        public Paged<Subscriber> GetAll(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Subscribers_SelectAllPaginated]";

            Paged<Subscriber> pagedList = null;

            List<Subscriber> list = null;

            int totalCount = 0;

            

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@pageIndex", pageIndex);
                paramCollection.AddWithValue("@pageSize", pageSize);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Subscriber aSubscriber = MapSubscriber(reader, ref startingIndex);


                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<Subscriber>();
                }

                list.Add(aSubscriber);
            });

            if (list != null)
            {
                pagedList = new Paged<Subscriber>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        private static Subscriber MapSubscriber(IDataReader reader, ref int startingIndex)
        {
            Subscriber aSubscriber = new Subscriber();
      
            aSubscriber.Id = reader.GetSafeInt32(startingIndex++);
            aSubscriber.Email = reader.GetSafeString(startingIndex++);
            aSubscriber.StripeCustomerId = reader.GetSafeString(startingIndex++);
            aSubscriber.SubscriptionType = reader.GetSafeString(startingIndex++);
            aSubscriber.SubscriptionEnd = reader.GetSafeDateTime(startingIndex++);
            return aSubscriber;
        }
    }
}
