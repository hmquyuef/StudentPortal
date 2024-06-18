using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace StudentPortal.Pages
{
    public class SettingsModel : PageModel
    {
        [BindProperty]
        public string FileName { get; set; }

        public void OnGet()
        {
        }
        [HttpPost]
        public JsonResult OnPostCreateFile(string fileName)
        {
            try
            {
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "createdFiles", fileName + ".cshtml");
                if (!System.IO.File.Exists(filePath))
                {
                    return new JsonResult(new { success = true, message = "File created successfully." });
                }
                else
                {
                    return new JsonResult(new { success = false, message = "File already exists." });
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, message = ex.Message });
            }
        }
    }
}
