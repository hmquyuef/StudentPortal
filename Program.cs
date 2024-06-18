using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);
Env.Load();
// Add services to the container.
builder.Services.AddRazorPages();

//builder.Services.Configure<RouteOptions>(options =>
//{
//    options.LowercaseUrls = true;
//    options.LowercaseQueryStrings = true;
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
