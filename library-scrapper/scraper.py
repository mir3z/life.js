import pickle
from time import sleep

from bs4 import BeautifulSoup
from requests import get

from models import Category, PageLink, PatternInfo

BASE_URL = "http://www.conwaylife.com"
what_links_to_template_url = (BASE_URL + "/w/index.php?title=Special:WhatLinksHere/Template:{}&limit=500").format
raw_page = (BASE_URL + "/wiki?title={}&action=raw").format


def make_soup(html):
    return BeautifulSoup(html, "html.parser")


def fetch_text(url):
    print "\t- Fetching %s" % url
    return get(url).text


def pages_with_template(tmpl):
    html = fetch_text(what_links_to_template_url(tmpl))
    soup = make_soup(html)
    anchors = [it.select("a")[0] for it in soup.select("#mw-whatlinkshere-list li") if "transclusion" in it.text]

    return [PageLink(name=a.string.encode("utf-8"), href=BASE_URL + a["href"], type=tmpl) for a in anchors]


def read_pattern_infobox(pattern_link):
    wikitext = fetch_text(raw_page(pattern_link.name))
    info = PatternInfo.parse(wikitext, pattern_link.type)
    info.href = pattern_link.href
    return info


def fetch_patterns_with_type(type):
    print "=== Discovering pages containing template '%s' ===" % type
    pages = pages_with_template(type)
    print "=== %s pages found - fetching details ===" % len(pages)
    infos = [read_pattern_infobox(page) for page in pages]
    return Category(name=type, patterns=infos)


def fetch_all(types, pause_duration=2):
    categories = []

    for t in types:
        category = fetch_patterns_with_type(t)
        categories.append(category)
        sleep(pause_duration)

    return categories


if __name__ == "__main__":
    types = (
        "Agar", "Crawler", "Fuse", "Growingspaceship", "Gun", "InductionCoil", "Methuselah", "MovingBreeder",
        "Oscillator", "Pattern", "Puffer", "Reflector", "Rotor", "Sawtooth", "Spaceship", "Stilllife", "UnitCell",
        "Wave", "Wick", "Wickstretcher"
    )

    library = fetch_all(types)

    out_filename = "scraper.output.p"
    print "=== Saving output to %s" % out_filename
    pickle.dump(library, open(out_filename, "wb"))
    print "=== Done ==="
