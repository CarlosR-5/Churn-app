using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Churn_app.Data; // Asegúrate de que este namespace coincida con tu carpeta Data
using Churn_app.Models; // Asegúrate de que este namespace coincida con tu carpeta Models

namespace Churn_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientesController(AppDbContext context)
        {
            _context = context;
        }

        // 1. LEER TODOS (GET)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> LeerTodos()
        {
            return await _context.Cliente.ToListAsync();
        }

        // 2. LEER POR ID (GET)
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> LeerPorId(int id)
        {
            var cliente = await _context.Cliente.FindAsync(id);
            if (cliente == null) return NotFound("Cliente no encontrado.");
            return cliente;
        }

        // 3. AGREGAR (POST)
        [HttpPost]
        public async Task<ActionResult<Cliente>> Agregar(Cliente cliente)
        {
            _context.Cliente.Add(cliente);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(LeerPorId), new { id = cliente.IdClient }, cliente);
        }

        // 4. ACTUALIZAR (PUT)
        [HttpPut("{id}")]
        public async Task<IActionResult> Actualizar(int id, Cliente cliente)
        {
            if (id != cliente.IdClient) return BadRequest("El ID no coincide.");

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cliente.Any(e => e.IdClient == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // 5. ELIMINAR (DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var cliente = await _context.Cliente.FindAsync(id);
            if (cliente == null) return NotFound();

            _context.Cliente.Remove(cliente);
            await _context.SaveChangesAsync();

            return Ok($"Cliente con ID {id} eliminado correctamente.");
        }
    }
}