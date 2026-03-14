using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Churn_app.Models
{
    [Table("Cliente")]
    public class Cliente
    {
        [Key]
        public int IdClient { get; set; }

        public string Nombre { get; set; }

        public string Email { get; set; }

        public string? Telefono { get; set; }

        public DateTime? Fecha_Registro { get; set; }

        public DateTime? Ultima_Visita { get; set; }

        public int Total_Visitas { get; set; }

        public decimal? Total_Gastos { get; set; }

        public DateTime? Ultimo_Pedido { get; set; }

        public int Total_Pedidos { get; set; }
    }
}