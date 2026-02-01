import feedparser
import urllib.parse

def fetch_growth_news(country="India"):
    """
    Fetches real-time news related to Urban Growth, Economy, and Infrastructure
    for a specific country using Google News RSS.
    """
    # URL Encode country
    encoded_query = urllib.parse.quote(f"Urban Development Economy Infrastructure {country}")
    rss_url = f"https://news.google.com/rss/search?q={encoded_query}&hl=en-US&gl=US&ceid=US:en"
    
    feed = feedparser.parse(rss_url)
    
    news_items = []
    for entry in feed.entries[:10]: # Top 10 headlines
        news_items.append({
            "title": entry.title,
            "link": entry.link,
            "source": entry.source.title if hasattr(entry, 'source') else "Google News",
            "published": entry.published if hasattr(entry, 'published') else ""
        })
        
    return news_items
