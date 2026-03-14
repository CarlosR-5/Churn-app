public class Pedido
{
    public int IdPedido { get; set; }
    public DateTime Fecha { get; set; }
    public decimal Monto { get; set; }
    public string Metodo_pago { get; set; }

    public int IdClient { get; set; }
    public int IdUser { get; set; }
}