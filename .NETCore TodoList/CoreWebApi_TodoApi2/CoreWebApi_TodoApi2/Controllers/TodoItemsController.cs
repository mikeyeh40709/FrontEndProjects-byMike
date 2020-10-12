using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreWebApi_TodoApi2.Data;
using CoreWebApi_TodoApi2.Models;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Hosting;

namespace CoreWebApi_TodoApi2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        //private readonly TodoContext _context;
        private readonly TodoItemContext _context;
        private readonly ILogger<TodoItemsController> _logger;
        private readonly IWebHostEnvironment _env;
        public TodoItemsController(TodoItemContext context, ILogger<TodoItemsController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("~/api/todoitems/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<TodoItem>> PostTodoItem(/*[FromForm]*/TodoItem todoItem)
        {
            var actionType = Request.Method;

            if(_env.EnvironmentName == "Development")
            {
                //微軟內建序列化功能,效能可能會提高,編碼之後為亂碼
                _logger.LogWarning(2001, $"{actionType}方法被呼叫,傳入資料為:{System.Text.Json.JsonSerializer.Serialize(todoItem)}");

                //Newtonsoft.Json,編碼之後正常
                _logger.LogWarning(2001, $"{actionType}方法被呼叫,傳入資料為:{JsonConvert.SerializeObject(todoItem)}");
            }

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            //送出Status Code: 201  location: https://localhost:5001/api/TodoItems/4
            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        private bool TodoItemExists(long id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
