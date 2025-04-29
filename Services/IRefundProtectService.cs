using System.Threading.Tasks;
using YourNamespace.Models;

namespace YourNamespace.Services
{
    public interface IRefundProtectService
    {
        Task<RefundProtectQuoteResponse> GetQuoteAsync(RefundProtectQuoteRequest request);
    }
}