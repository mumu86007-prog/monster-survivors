/**
 * Steam-Style Game Cover Generator
 * Rich gradient covers with game titles, badges, and hover effects.
 */

var CATEGORY_GRADIENTS = {
    action:     { from: '#ef4444', via: '#b91c1c', to: '#7f1d1d', accent: '#fca5a5' },
    adventure:  { from: '#10b981', via: '#047857', to: '#064e3b', accent: '#6ee7b7' },
    puzzle:     { from: '#8b5cf6', via: '#6d28d9', to: '#4c1d95', accent: '#c4b5fd' },
    racing:     { from: '#3b82f6', via: '#1d4ed8', to: '#1e3a5f', accent: '#93c5fd' },
    sports:     { from: '#f97316', via: '#c2410c', to: '#7c2d12', accent: '#fdba74' },
    arcade:     { from: '#ec4899', via: '#be185d', to: '#831843', accent: '#f9a8d4' },
    simulation: { from: '#06b6d4', via: '#0e7490', to: '#164e63', accent: '#67e8f9' },
    strategy:   { from: '#eab308', via: '#a16207', to: '#713f12', accent: '#fde047' },
    sandbox:    { from: '#84cc16', via: '#4d7c0f', to: '#365314', accent: '#bef264' }
};

var CATEGORY_ICONS = {
    action: '⚔️', adventure: '🗺️', puzzle: '🧩', racing: '🏎️',
    sports: '⚽', arcade: '🕹️', simulation: '✈️', strategy: '🏰', sandbox: '🏗️'
};

function hashStr(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

/**
 * @param {Object} game
 * @param {Object} [opts]
 * @param {boolean} [opts.showInfo]  - show title + badges on cover
 * @param {string}  [opts.size]     - 'normal' | 'large'
 */
function genCover(game, opts) {
    opts = opts || {};
    var showInfo = opts.showInfo !== false; // default true
    var size = opts.size || 'normal';
    var c = CATEGORY_GRADIENTS[game.category] || CATEGORY_GRADIENTS.action;
    var icon = CATEGORY_ICONS[game.category] || '🎮';
    var seed = hashStr(game.title);
    var angle = 125 + (seed % 70);
    var iconSize = size === 'large' ? '3.2rem' : '2.2rem';
    var titleSize = size === 'large' ? '15px' : '13px';

    return '<div class="cover-root" style="' +
        'width:100%;aspect-ratio:16/10;' +
        'background:linear-gradient(' + angle + 'deg,' + c.from + ' 0%,' + c.via + ' 50%,' + c.to + ' 100%);' +
        'display:flex;align-items:center;justify-content:center;' +
        'position:relative;overflow:hidden;border-radius:inherit;">' +

        /* glow orb — top right */
        '<div style="position:absolute;top:-30%;right:-20%;width:65%;height:80%;' +
            'background:radial-gradient(circle,' + c.accent + '20 0%,transparent 70%);"></div>' +

        /* glow orb — bottom left */
        '<div style="position:absolute;bottom:-20%;left:-10%;width:55%;height:60%;' +
            'background:radial-gradient(circle,rgba(255,255,255,0.06) 0%,transparent 60%);"></div>' +

        /* diagonal stripes */
        '<div style="position:absolute;inset:0;opacity:0.06;' +
            'background:repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(255,255,255,1) 8px,rgba(255,255,255,1) 9px);"></div>' +

        /* center icon */
        '<span style="position:relative;z-index:1;font-size:' + iconSize + ';' +
            'filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));opacity:0.85;">' + icon + '</span>' +

        /* play button (center, subtle) */
        '<div class="cover-play-btn" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;' +
            'width:38px;height:38px;border-radius:50%;background:rgba(0,0,0,0.55);' +
            'display:flex;align-items:center;justify-content:center;' +
            'border:2px solid rgba(255,255,255,0.25);opacity:0;transition:all 0.25s ease;">' +
            '<span style="color:white;font-size:15px;margin-left:2px;">▶</span></div>' +

        (showInfo ?
            /* bottom info bar */
            '<div style="position:absolute;bottom:0;left:0;right:0;z-index:2;' +
                'padding:20px 12px 10px;' +
                'background:linear-gradient(transparent 0%,rgba(0,0,0,0.55) 40%,rgba(0,0,0,0.8) 100%);">' +
                /* category + difficulty badges row */
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                    '<span style="background:' + c.accent + '30;color:' + c.accent + ';' +
                        'font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;' +
                        'text-transform:uppercase;letter-spacing:0.5px;">' + game.category + '</span>' +
                    '<span style="color:rgba(255,255,255,0.7);font-size:9px;font-weight:600;">' + game.difficulty + '</span>' +
                '</div>' +
                /* title */
                '<div style="color:white;font-size:' + titleSize + ';font-weight:700;' +
                    'text-shadow:0 1px 4px rgba(0,0,0,0.6);line-height:1.2;' +
                    'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + game.title + '</div>' +
                /* rating stars */
                '<div style="color:#fbbf24;font-size:10px;margin-top:2px;">' +
                    '★ '.repeat(Math.floor(game.rating || 4)) +
                    '<span style="color:rgba(255,255,255,0.3);">★</span>'.repeat(5 - Math.floor(game.rating || 4)) +
                '</div>' +
            '</div>'
        : '') +

    '</div>';
}
