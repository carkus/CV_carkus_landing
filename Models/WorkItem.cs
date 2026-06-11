namespace CV_carkus_landing;

public record WorkLink(string Label, string Url);
public record WorkCredit(string Name, string Url);

public record WorkItem(
    string Title,
    string[] Tags,
    string ImageUrl,
    string ImageAlt,
    string Description,
    bool Featured,
    WorkLink[] Links,
    WorkCredit? Credit = null,
    string? ImagePosition = null);
