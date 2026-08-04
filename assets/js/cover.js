/**
 * Game Cover Generator
 * Creates beautiful gradient covers for games without needing actual image files.
 * Each game gets a unique gradient based on its category + title hash.
 */

const CATEGORY_GRADIENTS = {
    action:    ['#dc2626', '#991b1b', '#7f1d1d'],  // Red
    adventure: ['#059669', '#065f46', '#064e3b'],  // Emerald
    puzzle:    ['#7c3aed', '#6d28d9', '#5b21b6'],  // Purple
    racing:    ['#2563eb', '#1d4ed8', '#1e40af'],  // Blue
    sports:    ['#ea580c', '#c2410c', '#9a3412'],  // Orange
    arcade:    ['#db2777', '#be185d', '#9d174d'],  // Pink
    simulation:['#0891b2', '#0e7490', '#155e75'],  // Cyan
    strategy:  ['#ca8a04', '#a16207', '#854d0e'],  // Gold
    sandbox:   ['#65a30d', '#4d7c0f', '#3f6212'],  // Lime
};

const CATEGORY_ICONS = {
    action: '⚔️', adventure: '🗺️', puzzle: '🧩', racing: '🏎️',
    sports: '⚽', arcade: '🕹️', simulation: '✈️', strategy: '🏰', sandbox: '🏗️'
};

function hashStr(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

/**
 * Generate a cover card HTML string for a game.
 * @param {Object} game - game object from games.json
 * @param {Object} opts - { showTitle?: boolean, size?: 'normal'|'large' }
 */
function genCover(game, opts = {}) {
    const { showTitle = false, size = 'normal' } = opts;
    const colors = CATEGORY_GRADIENTS[game.category] || CATEGORY_GRADIENTS.action;
    const icon = CATEGORY_ICONS[game.category] || '🎮';
    const seed = hashStr(game.title);
    const angle = 120 + (seed % 80);
    const iconSize = size === 'large' ? '3.5rem' : '2.8rem';

    return `
    <div style="
        width: 100%;
        aspect-ratio: 16/10;
        background: linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${iconSize};
        position: relative;
        overflow: hidden;
    ">
        <!-- Pattern overlay -->
        <div style="
            position: absolute;
            inset: 0;
            background:
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 40%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, transparent 70%);
        "></div>
        <!-- Grid lines -->
        <div style="
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 30px 30px;
        "></div>
        <!-- Icon -->
        <span style="position: relative; z-index: 1; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">${icon}</span>
        ${showTitle ? `
        <div style="
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 12px 14px;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            z-index: 1;
        ">
            <span style="color: white; font-size: 14px; font-weight: 700; text-shadow: 0 1px 3px rgba(0,0,0,0.5);">${game.title}</span>
        </div>` : ''}
    </div>`;
}
