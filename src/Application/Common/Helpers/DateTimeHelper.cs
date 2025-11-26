namespace Application.Common.Helpers;

public static class DateTimeHelper
{
    public static string TimeAgo(DateTime dateTime)
    {
        var timeSpan = DateTime.UtcNow - dateTime;

        if (timeSpan.TotalSeconds < 60)
            return "just now";

        if (timeSpan.TotalMinutes < 60)
        {
            var minutes = (int)timeSpan.TotalMinutes;
            return $"{minutes} {(minutes == 1 ? "minute" : "minutes")} ago";
        }

        if (timeSpan.TotalHours < 24)
        {
            var hours = (int)timeSpan.TotalHours;
            return $"{hours} {(hours == 1 ? "hour" : "hours")} ago";
        }

        if (timeSpan.TotalDays < 7)
        {
            var days = (int)timeSpan.TotalDays;
            return $"{days} {(days == 1 ? "day" : "days")} ago";
        }

        if (timeSpan.TotalDays < 30)
        {
            var weeks = (int)(timeSpan.TotalDays / 7);
            return $"{weeks} {(weeks == 1 ? "week" : "weeks")} ago";
        }

        if (timeSpan.TotalDays < 365)
        {
            var months = (int)(timeSpan.TotalDays / 30);
            return $"{months} {(months == 1 ? "month" : "months")} ago";
        }

        var years = (int)(timeSpan.TotalDays / 365);
        return $"{years} {(years == 1 ? "year" : "years")} ago";
    }

    public static DateTime StartOfDay(DateTime dateTime)
    {
        return dateTime.Date;
    }

    public static DateTime EndOfDay(DateTime dateTime)
    {
        return dateTime.Date.AddDays(1).AddTicks(-1);
    }

    public static DateTime StartOfWeek(DateTime dateTime, DayOfWeek startOfWeek = DayOfWeek.Monday)
    {
        var diff = (7 + (dateTime.DayOfWeek - startOfWeek)) % 7;
        return dateTime.AddDays(-1 * diff).Date;
    }

    public static DateTime EndOfWeek(DateTime dateTime, DayOfWeek startOfWeek = DayOfWeek.Monday)
    {
        return StartOfWeek(dateTime, startOfWeek).AddDays(7).AddTicks(-1);
    }

    public static DateTime StartOfMonth(DateTime dateTime)
    {
        return new DateTime(dateTime.Year, dateTime.Month, 1);
    }

    public static DateTime EndOfMonth(DateTime dateTime)
    {
        return StartOfMonth(dateTime).AddMonths(1).AddTicks(-1);
    }

    public static DateTime StartOfYear(DateTime dateTime)
    {
        return new DateTime(dateTime.Year, 1, 1);
    }

    public static DateTime EndOfYear(DateTime dateTime)
    {
        return new DateTime(dateTime.Year, 12, 31, 23, 59, 59, 999);
    }

    public static bool IsToday(DateTime dateTime)
    {
        return dateTime.Date == DateTime.UtcNow.Date;
    }

    public static bool IsYesterday(DateTime dateTime)
    {
        return dateTime.Date == DateTime.UtcNow.Date.AddDays(-1);
    }

    public static bool IsThisWeek(DateTime dateTime)
    {
        var now = DateTime.UtcNow;
        var startOfWeek = StartOfWeek(now);
        var endOfWeek = EndOfWeek(now);
        return dateTime >= startOfWeek && dateTime <= endOfWeek;
    }

    public static bool IsThisMonth(DateTime dateTime)
    {
        var now = DateTime.UtcNow;
        return dateTime.Year == now.Year && dateTime.Month == now.Month;
    }

    public static int GetAge(DateTime birthDate)
    {
        var today = DateTime.Today;
        var age = today.Year - birthDate.Year;
        if (birthDate.Date > today.AddYears(-age))
            age--;
        return age;
    }

    public static int GetBusinessDays(DateTime startDate, DateTime endDate)
    {
        var days = 0;
        var current = startDate;

        while (current <= endDate)
        {
            if (current.DayOfWeek != DayOfWeek.Saturday && current.DayOfWeek != DayOfWeek.Sunday)
                days++;
            current = current.AddDays(1);
        }

        return days;
    }
}
