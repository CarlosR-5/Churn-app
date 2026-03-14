using Churn_app.Models;
using Microsoft.Data.SqlClient;

namespace Churn_app.Data
{
    public class ConexionBD
    {
        string connectionString = "Server=.\\SQLEXPRESS;Database=RestauranteChurn;Trusted_Connection=True;TrustServerCertificate=True";

        public SqlConnection ConectarDB()
        {
            SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            return conn;
        }
    }
}