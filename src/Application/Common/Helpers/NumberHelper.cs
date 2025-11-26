namespace Application.Common.Helpers;

public static class NumberHelper
{
    public static string FormatNumber(long number)
    {
        if (number >= 1_000_000_000)
            return $"{number / 1_000_000_000.0:0.#}B";

        if (number >= 1_000_000)
            return $"{number / 1_000_000.0:0.#}M";

        if (number >= 1_000)
            return $"{number / 1_000.0:0.#}K";

        return number.ToString();
    }

    public static string FormatBytes(long bytes, int decimals = 2)
    {
        if (bytes == 0) return "0 Bytes";

        const int k = 1024;
        var sizes = new[] { "Bytes", "KB", "MB", "GB", "TB" };
        var i = (int)Math.Floor(Math.Log(bytes) / Math.Log(k));

        return $"{Math.Round(bytes / Math.Pow(k, i), decimals)} {sizes[i]}";
    }

    public static decimal CalculatePercentage(decimal value, decimal total)
    {
        if (total == 0) return 0;
        return Math.Round((value / total) * 100, 2);
    }

    public static decimal CalculatePercentageChange(decimal oldValue, decimal newValue)
    {
        if (oldValue == 0) return 0;
        return Math.Round(((newValue - oldValue) / oldValue) * 100, 2);
    }

    public static bool IsInRange(decimal value, decimal min, decimal max)
    {
        return value >= min && value <= max;
    }

    public static decimal Clamp(decimal value, decimal min, decimal max)
    {
        return Math.Max(min, Math.Min(max, value));
    }

    public static int GenerateRandomNumber(int min, int max)
    {
        var random = new Random();
        return random.Next(min, max + 1);
    }

    public static decimal RoundToNearest(decimal value, decimal nearest)
    {
        return Math.Round(value / nearest) * nearest;
    }
}
