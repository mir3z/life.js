from models import Serializable


class View(Serializable):
    trans = {}

    def __init__(self, pattern):
        self.__dict__ = {}
        self.build_common_view(pattern)
        self.build_view(pattern)

    def update(self, other):
        self.__dict__.update(other)

    def set(self, key, value):
        self.__dict__[key] = value

    def build_common_view(self, p):
        self.update({
            "name": p.name,
            "href": p._href
        })

        if hasattr(self, "type"):
            self.set("type", self.type)

        if bool(p.get("rle")):
            self.set("rle", "%s.rle" % p.pname)

        if hasattr(p, "discoverer"):
            self.set("discoveredBy", p.discoverer)

        if hasattr(p, "discoveryear") and p.discoveryear:
            self.set("discoveredAt", int(p.discoveryear))

        if hasattr(p, "c"):
            self.set("cells", p.c)

        if hasattr(p, "synthesis"):
            self.set("synth", int(p.synthesis))

    def build_view(self, pattern):
        for (target_key, spec) in self.trans.iteritems():
            pick = spec.get("pick") or target_key
            target_val = pattern.get(pick)

            if target_val:
                fn = spec.get("fn")
                target_val = fn(target_val) if fn else target_val
                self.set(target_key, target_val)
