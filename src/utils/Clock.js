export default function Clock(raf, fpsLimit = 60) {
    const fpsInterval = 1000 / fpsLimit;

    const frame = onTick => {
        let then = Date.now();

        return () => {
            const now = Date.now();
            const elapsed = now - then;

            if (elapsed > fpsInterval) {
                then = now - (elapsed % fpsInterval);

                onTick();
            }

            raf.request();
        }
    };

    return {
        start(onTick) {
            raf.register(frame(onTick));
            raf.request();
        },

        stop() {
            raf.cancel();
        }
    };
}
