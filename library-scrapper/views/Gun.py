from .View import View


class GunView(View):
    type = "Gun"
    trans = {
        "period": {"pick": "p"},
        "barrels": {"pick": "b"}
    }
