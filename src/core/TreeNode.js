export function TreeNode({ nw, ne, sw, se, level = 0, population = 0 } = {}) {
    return canonicalize({
        nw, ne, sw, se,
        level,
        population
    }, TreeNode.__cache);
}

TreeNode.fromSubnodes = (nw, ne, sw, se) => {
    const population = [nw, ne, sw, se].reduce((acc, n) => acc + n.population, 0);
    return TreeNode({
        nw, ne, sw, se,
        population,
        level: nw.level + 1
    });
};

TreeNode.fromLiving = (alive = true) => {
    return TreeNode({
        population: alive ? 1 : 0,
        level: 0
    });
};

TreeNode.alive = () => TreeNode.fromLiving(true);
TreeNode.dead = () => TreeNode.fromLiving(false);

TreeNode.ofGivenLevel = level => {
    if (level === 0) {
        return TreeNode.dead();
    }

    const n = TreeNode.ofGivenLevel(level - 1);
    return TreeNode.fromSubnodes(n, n, n, n);
};

function NodeCache() {
    let __id = 1;
    let size = 0;
    let cache = {};

    function assignId(node) {
        node.__id = node.__id || __id++;
        node.nw.__id = node.nw.__id || __id++;
        node.ne.__id = node.ne.__id || __id++;
        node.sw.__id = node.sw.__id || __id++;
        node.se.__id = node.se.__id || __id++;
    }

    function hashCode(node) {
        if (node.level === 0) {
            return node.population;
        }

        assignId(node);

        let hcode = 17;

        hcode = hcode + node.nw.__id;
        hcode = 31 * hcode + node.ne.__id;
        hcode = 31 * hcode + node.sw.__id;
        hcode = 31 * hcode + node.se.__id;

        return hcode;
    }

    const equals = n1 => n2 => n1.nw === n2.nw && n1.ne === n2.ne && n1.sw === n2.sw && n1.se === n2.se;

    return {
        get size() {
            return size;
        },

        reset() {
            __id = 1;
            size = 0;
            cache = {};
        },

        foo() {
            let s = 0;
            console.time("ref")
            for (const key in cache) {
                for (const idx in cache[key]) {
                    s += hashCode(cache[key][idx]);
                }
            }
            console.timeEnd("ref")
            console.warn(s);
        },

        setOrGet(node) {
            const hash = hashCode(node);
            const nodeList = cache[hash];

            if (nodeList) {
                const cached = nodeList.find(equals(node));

                if (!cached) {
                    nodeList.push(node);
                    size++;
                    return node;
                }

                return cached;
            } else {
                cache[hash] = [node];
                size++;
                return node;
            }
        }
    };
}

TreeNode.__cache = NodeCache();

TreeNode.recache = (root) => {
    console.time("recache");
    console.warn("recaching", TreeNode.__cache.size);

    TreeNode.__cache.reset();

    // const _cache = {
    //     size: 0,
    //     store: {}
    // };

    function re(node) {
        if (!node) {
            return;
        }

        canonicalize(node, TreeNode.__cache);

        re(node.nw);
        re(node.ne);
        re(node.sw);
        re(node.se);
        re(node.memoized);
        re(node.superMemoized);
    }

    re(root);

    console.warn("recaching done", TreeNode.__cache.size);
    console.timeEnd("recache");
};

window.t = TreeNode;

setInterval(() => console.warn("cache", window.t.__cache.size), 500);

function canonicalize(node, cache) {
    return cache.setOrGet(node);
}

