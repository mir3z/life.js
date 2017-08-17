from .View import View


class MovingBreederView(View):
    type = "Moving Breeder"
    trans = {
        "period": {"pick": "p"},
        "speed": {"pick": "s"},
        "direction": {"pick": "dir", "fn": lambda dir: dir.title()},
    }
