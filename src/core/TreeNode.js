import safeMemoryCache from "safe-memory-cache";

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
    const cache = safeMemoryCache({
        maxTTL: 15 * 1000
    });

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
        reset() {
            cache.clear();
        },

        upsert(node) {
            const hash = String(hashCode(node));
            const nodeList = cache.get(hash);

            if (nodeList) {
                const cached = nodeList.find(equals(node));

                if (!cached) {
                    nodeList.push(node);
                    return node;
                }

                return cached;
            } else {
                cache.set(hash, [node]);
                return node;
            }
        }
    };
}

TreeNode.__cache = NodeCache();

function canonicalize(node, cache) {
    return cache.upsert(node);
}

