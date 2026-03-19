const spriteModules = import.meta.glob('../assets/sprites/*.png', { eager: true });

const sprites = Object.fromEntries(
    Object.entries(spriteModules).map(([path, module]) => {
        const name = path.split('/').pop().split('.')[0];
        return [name, module.default];
    })
);

export default sprites;