from .View import View


class WaveView(View):
    type = "Wave"

    trans = {
        "period": {"pick": "p", "fn": lambda p: int(p)},
        "direction": {"pick": "dir", "fn": lambda dir: dir.title()},
        "speed": {"pick": "s"},
        "mod": {"pick": "m"},
        "supportedBy": {"pick": "sup"},
        "heat": {"pick": "h"},
        "slope": {},
    }
