import { TreeNode } from "./TreeNode";

export function Universe(root, generation = 0) {
    const isAlive = node => node.population > 0;

    function read(node, x, y) {
        if (node.level === 0) {
            return isAlive(node);
        }

        const offset = 1 << (node.level - 2);

        if (x < 0) {
            return y < 0
                ? read(node.nw, x + offset, y + offset)
                : read(node.sw, x + offset, y - offset);
        } else {
            return y < 0
                ? read(node.ne, x - offset, y + offset)
                : read(node.se, x - offset, y - offset);
        }
    }

    function write(node, x, y, alive) {
        if (node.level === 0) {
            return TreeNode.fromLiving(alive);
        }

        const offset = 1 << (node.level - 2);

        const { nw, ne, sw, se } = node;

        if (x < 0) {
            return y < 0
                ? TreeNode.fromSubnodes(write(nw, x + offset, y + offset, alive), ne, sw, se)
                : TreeNode.fromSubnodes(nw, ne, write(sw, x + offset, y - offset, alive), se);
        } else {
            return y < 0
                ? TreeNode.fromSubnodes(nw, write(ne, x - offset, y + offset, alive), sw, se)
                : TreeNode.fromSubnodes(nw, ne, sw, write(se, x - offset, y - offset, alive));
        }
    }

    function expand(node) {
        const { level, nw, ne, sw, se } = node;
        const border = TreeNode.ofGivenLevel(level - 1);
        return TreeNode.fromSubnodes(
            TreeNode.fromSubnodes(border, border, border, nw),
            TreeNode.fromSubnodes(border, border, ne, border),
            TreeNode.fromSubnodes(border, sw, border, border),
            TreeNode.fromSubnodes(se, border, border, border),
        );
    }

    function getSize(node) {
        return Math.pow(2, node.level - 1);
    }

    function oneGen(bitmask) {
        if (bitmask === 0) {
            return TreeNode.dead();
        }

        const selfCell = (bitmask >> 5) & 1;
        bitmask &= 0x757;

        let aliveCount = 0;
        while (bitmask !== 0) {
            aliveCount++;
            bitmask &= bitmask - 1 ;
        }

        if (aliveCount === 3 || (aliveCount === 2 && selfCell !== 0))
            return TreeNode.alive();
        else
            return TreeNode.dead();
    }

    function level2NextGen(node) {
        let bitmask = 0 ;
        for (let y = -2; y < 2; y++) {
            for (let x = -2; x < 2; x++) {
                bitmask = (bitmask << 1) + (read(node, x, y) ? 1 : 0);
            }
        }

        return TreeNode.fromSubnodes(
            oneGen(bitmask >> 5), oneGen(bitmask >> 4),
            oneGen(bitmask >> 1), oneGen(bitmask)
        );
    }

    function centeredSubnode(node) {
        return TreeNode.fromSubnodes(node.nw.se, node.ne.sw, node.sw.ne, node.se.nw);
    }

    function centeredHorizontal(w, e) {
        return TreeNode.fromSubnodes(w.ne.se, e.nw.sw, w.se.ne, e.sw.nw);
    }

    function centeredVertical(n, s) {
        return TreeNode.fromSubnodes(n.sw.se, n.se.sw, s.nw.ne, s.ne.nw);
    }

    function centeredSubSubnode(node) {
        return TreeNode.fromSubnodes(node.nw.se.se, node.ne.sw.sw, node.sw.ne.ne, node.se.nw.nw);
    }

    function nextGeneration(node) {
        if (node.__memoized) {
            return node.__memoized;
        }

        if (node.population === 0) {
            return node.nw;
        }

        if (node.level === 2) {
            return level2NextGen(node);
        }

        const { nw, ne, sw, se } = node;

        const n00 = centeredSubnode(nw);
        const n01 = centeredHorizontal(nw, ne);
        const n02 = centeredSubnode(ne);
        const n10 = centeredVertical(nw, sw);
        const n11 = centeredSubSubnode(node);
        const n12 = centeredVertical(ne, se);
        const n20 = centeredSubnode(sw);
        const n21 = centeredHorizontal(sw, se);
        const n22 = centeredSubnode(se);

        node.__memoized = TreeNode.fromSubnodes(
            nextGeneration(TreeNode.fromSubnodes(n00, n01, n10, n11)),
            nextGeneration(TreeNode.fromSubnodes(n01, n02, n11, n12)),
            nextGeneration(TreeNode.fromSubnodes(n10, n11, n20, n21)),
            nextGeneration(TreeNode.fromSubnodes(n11, n12, n21, n22))
        );

        return node.__memoized;
    }

    function nextSuperGeneration(node) {
        if (node.__superMemoized) {
            return node.__superMemoized;
        }

        if (node.level === 2) {
            node.__superMemoized = level2NextGen(node);
            return node.__superMemoized;
        }

        const { nw, ne, sw, se } = node;

        const n00 = nextSuperGeneration(nw);
        const n01 = nextSuperGeneration(TreeNode.fromSubnodes(nw.ne, ne.nw, nw.se, ne.sw));
        const n02 = nextSuperGeneration(ne);
        const n10 = nextSuperGeneration(TreeNode.fromSubnodes(nw.sw, nw.se, sw.nw, sw.ne));
        const n11 = nextSuperGeneration(TreeNode.fromSubnodes(nw.se, ne.sw, sw.ne, se.nw));
        const n12 = nextSuperGeneration(TreeNode.fromSubnodes(ne.sw, ne.se, se.nw, se.ne));
        const n20 = nextSuperGeneration(sw);
        const n21 = nextSuperGeneration(TreeNode.fromSubnodes(sw.ne, se.nw, sw.se, se.sw));
        const n22 = nextSuperGeneration(se);

        node.__superMemoized = TreeNode.fromSubnodes(
            nextSuperGeneration(TreeNode.fromSubnodes(n00, n01, n10, n11)),
            nextSuperGeneration(TreeNode.fromSubnodes(n01, n02, n11, n12)),
            nextSuperGeneration(TreeNode.fromSubnodes(n10, n11, n20, n21)),
            nextSuperGeneration(TreeNode.fromSubnodes(n11, n12, n21, n22))
        );

        return node.__superMemoized;
    }

    function shouldExpand(node) {
        return node.level < 3
            || node.nw.population !== node.nw.se.se.population
            || node.ne.population !== node.ne.sw.sw.population
            || node.sw.population !== node.sw.ne.ne.population
            || node.se.population !== node.se.nw.nw.population;
    }

    function expandIfNeeded(node) {
        if (!shouldExpand(node)) {
            return node;
        }

        return expandIfNeeded(expand(node));
    }

    return {
        root,
        generation,

        read(x, y) {
            return read(root, x, y);
        },

        getBoundaries() {
            const visit = (node, x, y, boundary) => {
                if (!node) {
                    return;
                }

                if (node.level === 0) {
                    if (node.population) {
                        if (x < boundary.left) {
                            boundary.left = x;
                        }

                        if (x > boundary.right) {
                            boundary.right = x;
                        }

                        if (y < boundary.top) {
                            boundary.top = y;
                        }

                        if (y > boundary.bottom) {
                            boundary.bottom = y;
                        }
                    }

                } else {
                    const offset = getSize(node);

                    visit(node.nw, x, y, boundary);
                    visit(node.ne, x + offset, y, boundary);
                    visit(node.sw, x, y + offset, boundary);
                    visit(node.se, x + offset, y + offset, boundary);
                }
            };

            const offset = getSize(root);
            const boundary = {
                top: Infinity,
                bottom: -Infinity,
                left: Infinity,
                right: -Infinity
            };

            visit(root, -offset, -offset, boundary);
            return boundary;
        },

        toggleCell(x, y) {
            let nextRoot = root;

            while (true) {
                const max = getSize(nextRoot);

                if (-max <= x && x <= max - 1 && -max <= y && y <= max - 1) {
                    break;
                }

                nextRoot = expand(nextRoot);
            }

            return Universe(write(nextRoot, x, y, !read(nextRoot, x, y)), generation);
        },

        evolve() {
            return Universe(nextGeneration(expandIfNeeded(root)), generation + 1);
        },

        superEvolve() {
            const expanded = expandIfNeeded(root);
            const nextRoot = nextSuperGeneration(expanded);
            return Universe(nextRoot, generation + Math.pow(2, expanded.level - 2));
        }
    };
}

Universe.create = () => Universe(TreeNode.ofGivenLevel(3), 0);