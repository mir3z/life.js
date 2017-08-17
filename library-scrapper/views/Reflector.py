from .View import View


class ReflectorView(View):
    type = "Reflector"
    trans = {
        "period": {"pick": "p"},
        "angle": {"pick": "a"},
        "heat": {"pick": "h"}
    }
