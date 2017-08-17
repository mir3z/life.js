from .View import View


class RotorView(View):
    type = "Rotor"
    trans = {
        "period": {"pick": "p"},
        "mod": {"pick": "m"},
        "heat": {"pick": "h"},
        "volatility": {"pick": "v"}
    }
