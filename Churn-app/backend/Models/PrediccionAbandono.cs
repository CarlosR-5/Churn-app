public class PrediccionAbandono
{
	public int Id_Prediccion { get; set; }
	public decimal Probabilidad_abandono { get; set; }
	public string Nivel_riesgo { get; set; }
	public DateTime Fecha_Prediccion { get; set; }

	public int IdClient { get; set; }
}