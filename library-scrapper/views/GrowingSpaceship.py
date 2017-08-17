from .View import View


class GrowingSpaceshipView(View):
    type = "Growing Spaceship"
    trans = {
        "direction": {"pick": "dir"},
        "backPartPeriod": {"pick": "bp"},
        "backPartSpeed": {"pick": "bs"},
        "frontPartPeriod": {"pick": "fp"},
        "frontPartSpeed": {"pick": "fs"},
    }
