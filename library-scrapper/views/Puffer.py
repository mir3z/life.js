from .View import View


class PufferView(View):
    type = "Puffer"
    trans = {
        "period": {"pick": "p"},
        "speed": {"pick": "s"},
        "direction": {"pick": "dir", "fn": lambda dir: dir.title()},
    }

