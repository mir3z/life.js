import collections
import json

import mwparserfromhell

PageLink = collections.namedtuple("PageLink", "name href type")


class Serializable(object):
    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=2)


class Category(Serializable):
    def __init__(self, name, patterns):
        self.name = name
        self.patterns = patterns


class PatternInfo(Serializable):
    def __init__(self, dict):
        self._href = None

        for key in dict:
            setattr(self, key, dict[key])

    @property
    def href(self):
        return self._href

    @href.setter
    def href(self, value):
        self._href = value

    def __getitem__(self, key):
        return self.get(key)

    def get(self, key):
        return self.__dict__.get(key)

    @staticmethod
    def parse(wikitext, type):
        def canonicalize(subject):
            return {
                       "yes": True,
                       "true": True,
                       "no": False,
                       "false": False
                   }.get(subject) or subject

        templates = mwparserfromhell.parse(wikitext).filter_templates()
        pattern_tmpl = next(tmpl for tmpl in templates if tmpl.name.strip() == type)
        as_dict = {param.name.strip(): canonicalize(param.value.strip()) for param in pattern_tmpl.params}
        return PatternInfo(as_dict)
