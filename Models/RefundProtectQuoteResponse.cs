using System.Collections.Generic;

namespace YourNamespace.Models
{
    public class RefundProtectQuoteResponse
    {
        public string QuoteId { get; set; }
        public string LanguageCode { get; set; }
        public List<RefundProtectProduct> Products { get; set; }
        public double TotalProductPrice { get; set; }
    }

    public class RefundProtectProduct
    {
        public int ProductId { get; set; }
        public double ProductPrice { get; set; }
        public bool PricePerTicket { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public string OptInLabel { get; set; }
        public string OptOutLabel { get; set; }
        public List<RefundProtectFeature> Features { get; set; }
        public string TsAndCsUrl { get; set; }
        public string OfferingMethod { get; set; }
        public string CurrencyCode { get; set; }
        public string Html { get; set; }
        public string BookingStage { get; set; }
    }

    public class RefundProtectFeature
    {
        public string Text { get; set; }
    }

    public class RefundProtectErrorResponse
    {
        public string Message { get; set; }
        public List<PropertyError> Detail { get; set; }
    }

    public class PropertyError
    {
        public string Property { get; set; }
        public List<string> Errors { get; set; }
    }
}