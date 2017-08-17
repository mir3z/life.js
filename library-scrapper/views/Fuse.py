import re

from .View import View


def extract_speed(speed_expr):
    speed = re.match("\[\[([^|]+)\|(.*?)\]\]", speed_expr)
    return speed.group(1) if speed else speed_expr


class FuseView(View):
    type = "Fuse"
    trans = {
        "period": {"pick": "p"},
        "speed": {"pick": "s", "fn": extract_speed}
    }
