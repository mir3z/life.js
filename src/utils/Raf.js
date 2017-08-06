export default function Raf(window) {
    let frame;
    let hnd;
    let cancelled = false;

    return {
        register(fn) {
            frame = fn;
        },

        request() {
            if (!frame) {
                return;
            }

            hnd = window.requestAnimationFrame(() => {
                if (cancelled) {
                    cancelled = false;
                    return;
                }

                frame();
            });
        },

        cancel() {
            cancelled = true;
            window.cancelAnimationFrame(hnd);
        }
    }
}
