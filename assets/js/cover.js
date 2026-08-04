/**
 * Unique Game Cover Generator v2
 * Each game gets a distinct cover: unique icon, shifted gradient, and title.
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

// Tag-specific icons — matched in order, first match wins
var TAG_ICONS = [
    { tags: ['zombie'], icon: '🧟' },
    { tags: ['horror','fnaf','jumpscare'], icon: '👻' },
    { tags: ['sniper'], icon: '🎯' },
    { tags: ['drift'], icon: '🏎️' },
    { tags: ['basketball'], icon: '🏀' },
    { tags: ['soccer','football'], icon: '⚽' },
    { tags: ['pool','billiard'], icon: '🎱' },
    { tags: ['golf'], icon: '⛳' },
    { tags: ['fps','shooting','gun','war','military'], icon: '🔫' },
    { tags: ['survival','roguelite'], icon: '⚔️' },
    { tags: ['crafting','mine','block','minecraft-like','sandbox'], icon: '⛏️' },
    { tags: ['parkour','platformer','running'], icon: '🏃' },
    { tags: ['card','solitaire'], icon: '🃏' },
    { tags: ['chess'], icon: '♟️' },
    { tags: ['snake'], icon: '🐍' },
    { tags: ['dinosaur','dino'], icon: '🦖' },
    { tags: ['puzzle','brain','logic','match','merge','numbers','mahjong','hidden-object','drawing'], icon: '🧠' },
    { tags: ['rhythm','music','fnf'], icon: '🎵' },
    { tags: ['cat','animal','pet'], icon: '🐱' },
    { tags: ['cooking','food','restaurant'], icon: '🍔' },
    { tags: ['farming','agriculture','tractor'], icon: '🚜' },
    { tags: ['flying','airplane','aviation','flight'], icon: '✈️' },
    { tags: ['car','driving','traffic','supercar','police','kart','racing'], icon: '🚗' },
    { tags: ['bike','motorcycle','moto'], icon: '🏍️' },
    { tags: ['stunt'], icon: '🔥' },
    { tags: ['pinball'], icon: '🕹️' },
    { tags: ['gta','crime','open-world'], icon: '🏙️' },
    { tags: ['io','battle-royale','arena','multiplayer'], icon: '🌐' },
    { tags: ['stickman'], icon: '🧍' },
    { tags: ['tank'], icon: '🪖' },
    { tags: ['tower-defense','defense','strategy'], icon: '🏰' },
    { tags: ['clicker','idle'], icon: '👆' },
    { tags: ['co-op','2-player','teamwork'], icon: '🤝' },
    { tags: ['physics','ragdoll','destruction'], icon: '💥' },
    { tags: ['funny','troll'], icon: '😂' },
    { tags: ['simulator','tycoon'], icon: '🎯' },
    { tags: ['skibidi','viral'], icon: '🚽' },
    { tags: ['moba','hero','fantasy','rpg'], icon: '⚡' },
    { tags: ['cow','cattle'], icon: '🐄' },
    { tags: ['doctor','hospital','surgery'], icon: '🏥' },
    { tags: ['diving','water','backflip'], icon: '🤸' },
    { tags: ['tennis','pong'], icon: '🎾' },
    { tags: ['bowling'], icon: '🎳' },
    { tags: ['retro','pixel'], icon: '👾' },
    { tags: ['neon'], icon: '💜' }
];

function hashStr(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function pickIcon(game) {
    for (var i = 0; i < TAG_ICONS.length; i++) {
        for (var j = 0; j < TAG_ICONS[i].tags.length; j++) {
            if (game.tags.indexOf(TAG_ICONS[i].tags[j]) !== -1) {
                return TAG_ICONS[i].icon;
            }
        }
    }
    var map = { action:'⚔️',adventure:'🗺️',puzzle:'🧩',racing:'🏎️',sports:'⚽',arcade:'🕹️',simulation:'✈️',strategy:'🏰',sandbox:'🏗️' };
    return map[game.category] || '🎮';
}

function hslShift(hex, hDeg) {
    // Simple hue rotation on a hex color
    var r = parseInt(hex.slice(1,3), 16);
    var g = parseInt(hex.slice(3,5), 16);
    var b = parseInt(hex.slice(5,7), 16);
    // Convert to HSL-ish, shift hue via simple RGB rotation
    var cosH = Math.cos(hDeg * Math.PI / 180);
    var sinH = Math.sin(hDeg * Math.PI / 180);
    var rr = r * cosH - g * sinH;
    var gg = r * sinH + g * cosH;
    return '#' + [Math.abs(Math.round(rr) % 256), Math.abs(Math.round(gg) % 256), b]
        .map(function(v) { var h = v.toString(16); return h.length === 1 ? '0' + h : h; }).join('');
}

function genCover(game, opts) {
    opts = opts || {};
    var showInfo = opts.showInfo !== false;
    var size = opts.size || 'normal';
    var c = CATEGORY_GRADIENTS[game.category] || CATEGORY_GRADIENTS.action;
    var icon = pickIcon(game);
    var seed = hashStr(game.title);
    var angle = 120 + (seed % 80);
    var iconSize = size === 'large' ? '2.8rem' : '2rem';
    var titleSize = size === 'large' ? '14px' : '12px';

    return '<div class="cover-root" style="' +
        'width:100%;aspect-ratio:16/10;' +
        'background:linear-gradient(' + angle + 'deg,' + c.from + ' 0%,' + c.via + ' 50%,' + c.to + ' 100%);' +
        'display:flex;align-items:center;justify-content:center;' +
        'position:relative;overflow:hidden;border-radius:inherit;">' +

        /* unique glow orb pattern per game */
        '<div style="position:absolute;top:' + (-20 + (seed % 40)) + '%;right:' + (-15 + (seed % 30)) + '%;' +
            'width:' + (50 + (seed % 40)) + '%;height:' + (60 + (seed % 30)) + '%;' +
            'background:radial-gradient(circle,' + c.accent + '25 0%,transparent 70%);"></div>' +

        '<div style="position:absolute;bottom:' + (-10 - (seed % 30)) + '%;left:' + (-5 + (seed % 20)) + '%;' +
            'width:' + (40 + (seed % 50)) + '%;height:' + (50 + (seed % 35)) + '%;' +
            'background:radial-gradient(circle,rgba(255,255,255,0.07) 0%,transparent 60%);"></div>' +

        /* diagonal stripes — angle varies per game */
        '<div style="position:absolute;inset:0;opacity:0.05;' +
            'background:repeating-linear-gradient(' + (30 + (seed % 60)) + 'deg,transparent,transparent ' + (6 + (seed % 10)) + 'px,rgba(255,255,255,1) ' + (6 + (seed % 10)) + 'px,rgba(255,255,255,1) ' + (7 + (seed % 10)) + 'px);"></div>' +

        /* center icon */
        '<span style="position:relative;z-index:1;font-size:' + iconSize + ';' +
            'filter:drop-shadow(0 4px 12px rgba(0,0,0,0.5));">' + icon + '</span>' +

        /* play button */
        '<div class="cover-play-btn" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;' +
            'width:38px;height:38px;border-radius:50%;background:rgba(0,0,0,0.55);' +
            'display:flex;align-items:center;justify-content:center;' +
            'border:2px solid rgba(255,255,255,0.25);opacity:0;transition:all 0.25s ease;">' +
            '<span style="color:white;font-size:15px;margin-left:2px;">▶</span></div>' +

        (showInfo ?
            '<div style="position:absolute;bottom:0;left:0;right:0;z-index:2;' +
                'padding:20px 12px 10px;' +
                'background:linear-gradient(transparent 0%,rgba(0,0,0,0.55) 40%,rgba(0,0,0,0.8) 100%);">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                    '<span style="background:' + c.accent + '30;color:' + c.accent + ';' +
                        'font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;' +
                        'text-transform:uppercase;letter-spacing:0.5px;">' + game.category + '</span>' +
                    '<span style="color:rgba(255,255,255,0.7);font-size:9px;font-weight:600;">' + game.difficulty + '</span>' +
                '</div>' +
                '<div style="color:white;font-size:' + titleSize + ';font-weight:700;' +
                    'text-shadow:0 1px 4px rgba(0,0,0,0.6);line-height:1.2;' +
                    'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + game.title + '</div>' +
                '<div style="color:#fbbf24;font-size:10px;margin-top:2px;">' +
                    '★ '.repeat(Math.floor(game.rating || 4)) +
                    '<span style="color:rgba(255,255,255,0.3);">★</span>'.repeat(5 - Math.floor(game.rating || 4)) +
                '</div>' +
            '</div>'
        : '') +

    '</div>';
}
