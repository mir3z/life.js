from .View import View


class CrawlerView(View):
    type = "Crawler"
    trans = {
        "direction": {"pick": "d", "fn": lambda d: d.lower()},
        "speed": {"pick": "s"},
        "crawlsOn": {"pick": "v", "fn": lambda v: v.title()}
    }
