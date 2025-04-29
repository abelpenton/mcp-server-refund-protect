using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using YourNamespace.Models;

namespace YourNamespace.Services
{
    public class RefundProtectOptions
    {
        public string BaseUrl { get; set; } = "https://test.aus.api.protectgroup.com";
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }

    public class RefundProtectService : IRefundProtectService
    {
        private readonly HttpClient _httpClient;
        private readonly RefundProtectOptions _options;
        private readonly JsonSerializerOptions _jsonOptions;

        public RefundProtectService(HttpClient httpClient, IOptions<RefundProtectOptions> options)
        {
            _httpClient = httpClient;
            _options = options.Value;
            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            _httpClient.BaseAddress = new Uri(_options.BaseUrl);
            _httpClient.DefaultRequestHeaders.Add("x-pg-client-id", _options.ClientId);
            _httpClient.DefaultRequestHeaders.Add("x-pg-client-secret", _options.ClientSecret);
        }

        public async Task<RefundProtectQuoteResponse> GetQuoteAsync(RefundProtectQuoteRequest request)
        {
            try
            {
                var content = new StringContent(
                    JsonSerializer.Serialize(request, _jsonOptions),
                    System.Text.Encoding.UTF8,
                    "application/json");

                var response = await _httpClient.PostAsync("/quote", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<RefundProtectQuoteResponse>(responseContent, _jsonOptions);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    var error = JsonSerializer.Deserialize<RefundProtectErrorResponse>(errorContent, _jsonOptions);
                    throw new Exception($"Bad request: {error.Message}");
                }

                if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    throw new Exception("Invalid or expired membership credentials");
                }

                throw new Exception($"Request failed with status code: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to get Refund Protect quote", ex);
            }
        }
    }
}