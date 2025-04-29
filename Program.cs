using Microsoft.Extensions.DependencyInjection;
using YourNamespace.Services;

var services = new ServiceCollection();

// Configure Refund Protect options
services.Configure<RefundProtectOptions>(options =>
{
    options.ClientId = "your-client-id";
    options.ClientSecret = "your-client-secret";
    // Optionally override the base URL if needed
    // options.BaseUrl = "https://your-custom-url.com";
});

// Register HTTP client
services.AddHttpClient<IRefundProtectService, RefundProtectService>();

// Register the service
services.AddScoped<IRefundProtectService, RefundProtectService>();

// Build the service provider
var serviceProvider = services.BuildServiceProvider();

// Example usage:
/*
using var scope = serviceProvider.CreateScope();
var refundProtectService = scope.ServiceProvider.GetRequiredService<IRefundProtectService>();

var request = new RefundProtectQuoteRequest
{
    Member = "your-member-code",
    CurrencyCode = "USD",
    LanguageCode = "en",
    EventTravelDateTime = "2025-05-01T18:30:00Z",
    NumberOfTickets = 2,
    TotalValue = 100.00
};

var quote = await refundProtectService.GetQuoteAsync(request);
*/ 