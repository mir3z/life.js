from .View import View


class SpaceshipView(View):
    type = "Spaceship"
    trans = {
        "period":       {"pick": "p",   "fn": lambda p: int(p)},
        "mod":          {"pick": "m",   "fn": lambda m: int(m)},
        "direction":    {"pick": "dir", "fn": lambda dir: dir.title()},
        "heat":         {"pick": "h"},
        "speed":        {"pick": "s"},
        "slope":        {}
    }

