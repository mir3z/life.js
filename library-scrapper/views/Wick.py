from .View import View

import re


def extract_speed(speed_expr):
    speed = re.match("\[\[([^|]+)\|(.*?)\]\]", speed_expr)
    return speed.group(1) if speed else speed_expr


class WickView(View):
    type = "Wick"
    trans = {
        "period": {"pick": "p"},
        "speed": {"pick": "s", "fn": extract_speed}
    }
