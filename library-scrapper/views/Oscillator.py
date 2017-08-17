from .View import View


class OscillatorView(View):
    type = "Oscillator"
    trans = {
        "period": {"pick": "p"},
        "heat": {"pick": "h"},
        "volatility": {"pick": "v"},
        "mod": {"pick": "m"},
    }
