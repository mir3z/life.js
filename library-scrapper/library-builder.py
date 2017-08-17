import pickle
import os
import re

from models import Serializable, Category, PatternInfo
from views import FuseView, CrawlerView, AgarView, GrowingSpaceshipView, WaveView, GunView, InductionCoilView, \
    MethuselahView, MovingBreederView, OscillatorView, MiscPatternView, PufferView, ReflectorView, RotorView, \
    SawtoothView, SpaceshipView, StillLifeView, UnitCellView, WickView, WickstretcherView

view_map = {
    "Agar": AgarView,
    "Crawler": CrawlerView,
    "Fuse": FuseView,
    "Growingspaceship": GrowingSpaceshipView,
    "Gun": GunView,
    "InductionCoil": InductionCoilView,
    "Methuselah": MethuselahView,
    "MovingBreeder": MovingBreederView,
    "Oscillator": OscillatorView,
    "Pattern": MiscPatternView,
    "Puffer": PufferView,
    "Reflector": ReflectorView,
    "Rotor": RotorView,
    "Sawtooth": SawtoothView,
    "Spaceship": SpaceshipView,
    "Stilllife": StillLifeView,
    "UnitCell": UnitCellView,
    "Wave": WaveView,
    "Wick": WickView,
    "Wickstretcher": WickstretcherView
}


class Library(Serializable):
    def __init__(self):
        self.library = []

    def add_category(self, category):
        self.library.append(category)


def find_extra_rle_files(patterns_dir, rle_lookup):
    all_rle = os.listdir(patterns_dir)

    extra = []
    for rle in all_rle:
        if not rle_lookup.get(rle):
            with open("%s/%s" % (patterns_dir, rle)) as f:
                content = f.read()
                match = re.match("#N\s+(.*?)\r?\n", content)
                name = match.group(1) if match else rle.replace(".rle", "")

                extra.append({"name": name, "rle": rle})
                print "Extra rle file found: %s [%s]" % (rle, name.title())

    return extra


def main(pickle_filename, patterns_dir, out_file):
    categories = pickle.load(open(pickle_filename, "r"))
    lib = Library()
    rle_lookup = {}

    for category in categories:
        patterns = []
        for pattern in category.patterns:
            view_cls = view_map.get(category.name)
            view = view_cls(pattern)

            if hasattr(view, "rle"):
                rle_lookup[view.rle] = True
                path = "%s/%s" % (patterns_dir, view.rle)
                if not os.path.exists(path):
                    print "%s is missing in %s, skipping..." % (view.rle, patterns_dir)
                    delattr(view, "rle")

            patterns.append(view)

        lib.add_category(Category(category.name, patterns))

    extra = find_extra_rle_files(patterns_dir, rle_lookup)
    lib.add_category(Category("Assorted", extra))

    with open(out_file, "w") as jsonfile:
        jsonfile.write(lib.to_json())


if __name__ == "__main__":
    main("scraper.output.p", "../patterns", "library.json")
