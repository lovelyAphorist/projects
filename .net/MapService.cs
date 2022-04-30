using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class MapService : IMapService
    {
        IDataProvider _data = null;
        public MapService(IDataProvider data)
        {
            _data = data;
        }
        public string GetAllStates()
        {
            StringBuilder geojsonAll = new StringBuilder();

            string procName = "[dbo].[States_SelectAllGeoJson]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                string aState = reader.GetSafeString(startingIndex++);

                geojsonAll.Append(aState);
            });

            return geojsonAll.ToString();
        }
        public string GetStateById(int id)
        {
            StringBuilder geojson = new StringBuilder();

            string procName = "[dbo].[States_SelectByIDGeoJson2]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                string aState = reader.GetSafeString(startingIndex++);

                geojson.Append(aState);
            });

            return geojson.ToString();
        }

    }
}
