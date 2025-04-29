using System;

namespace YourNamespace.Models
{
    public class RefundProtectQuoteRequest
    {
        public string AccommodationName { get; set; }
        public string Airline { get; set; }
        public string ArrivalAirportCode { get; set; }
        public string ArrivalCountry { get; set; }
        public string CurrencyCode { get; set; }
        public string CustomerDateOfBirth { get; set; }
        public string CustomerGender { get; set; }
        public string DepartureAirportCode { get; set; }
        public string DepartureCountry { get; set; }
        public string EventName { get; set; }
        public string EventTravelClass { get; set; }
        public string EventTravelDateTime { get; set; }
        public string FlightType { get; set; }
        public string LanguageCode { get; set; }
        public string Member { get; set; }
        public int NumberOfTickets { get; set; }
        public string RiskType { get; set; }
        public string TicketType { get; set; }
        public double TotalValue { get; set; }
        public string TourOperator { get; set; }
        public string Venue { get; set; }
        public string Source { get; set; }
        public bool ReturnHtml { get; set; } = true;
        public bool ReturnContent { get; set; }
        public double? SalesTax { get; set; }
        public string Client { get; set; }
    }
}