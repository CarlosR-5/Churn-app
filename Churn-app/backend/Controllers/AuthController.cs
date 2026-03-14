using Churn_app.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Churn_app.Controllers
{
    [ApiController]
    [Route("Auth")]
    public class AuthController : Controller
    {
        private ConexionBD db = new ConexionBD();

        // login
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest data)
        {
            using (SqlConnection conn = db.ConectarDB())
            {
                string query = "SELECT Username FROM Usuario WHERE Username=@user AND Contrasena=@pass";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@user", data.user);
                cmd.Parameters.AddWithValue("@pass", data.pass);

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    HttpContext.Session.SetString("usuario", reader["Username"].ToString());

                    return Json(new { success = true });
                }
            }

            return Json(new { success = false });
        }

        // registro
        [HttpPost("Register")]
        public IActionResult Register([FromBody] LoginRequest data)
        {
            using (SqlConnection conn = db.ConectarDB())
            {
                string query = "INSERT INTO Usuario (Username, Contrasena, RolUser, Estado) VALUES (@user,@pass,'user','A')";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@user", data.user);
                cmd.Parameters.AddWithValue("@pass", data.pass);

                cmd.ExecuteNonQuery();
            }

            return Json(new { success = true });
        }

        // logout
        [HttpGet("Logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Json(new { success = true });
        }
    }

    // Clase para recibir datos del JS
    public class LoginRequest
    {
        public string user { get; set; }
        public string pass { get; set; }
    }
}