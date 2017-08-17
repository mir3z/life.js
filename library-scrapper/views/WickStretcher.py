from .View import View


class WickstretcherView(View):
    type = "Wickstretcher"
    trans = {
        "period": {"pick": "p"},
        "speed": {"pick": "s"},
        "direction": {"pick": "p", "fn": lambda dir: dir.title()}
    }
