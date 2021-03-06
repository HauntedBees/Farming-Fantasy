const gfx = {
    canvas: [],  ctx: [],
    canvasHeight: 0, canvasWidth: 0,
    tileWidth: 0, tileHeight: 0, scale: 4,
    spritesheets: [],
    loadSpriteSheets: function(source, paths, callback) {
        count = 0; source = source || "img";
        paths.forEach(function(path) {
            const f = function(path, len) {
                const img = new Image();
                img.onload = function() {
                    gfx.spritesheets[path] = this;
                    count += 1;
                    if(count === len) { callback(); }
                };
                img.src = `${source}/${path}.png`;
            };
            f(path, paths.length);
        });
    },
    GetFont: () => player.options.font === 1 ? "OpenDyslexic" : "PressStart2P",
    GetBlack: () => (player.IsMonochrome() ? "#081820" : "#000000"),
    GetWhite: () => (player.IsMonochrome() ? "#E0F8D0" : "#FFFFFF"),
    GetInfoColor: type => {
        if(type === "info") { return gfx.GetLightBlue(); }
        if(type === "FarmInfo") { return player.IsMonochrome() ? "#E0F8D0" : "#B77C00" } // TODO: confirm monochrome color is good
    },
    GetLightBlue: () => (player.IsMonochrome() ? "#E0F8D0" : "#B2B5FF"),
    GetSpeakerBGColor: () => (player.IsMonochrome() ? "#E0F8D0" : "#FEAC68"),

    clearLayer: key => gfx.ctx[key].clearRect(0, 0, gfx.canvasWidth, gfx.canvasHeight),
    clearSome: keys => keys.forEach(e => gfx.clearLayer(e)),
    clearAll: function(includingTutorial) {
        for(const key in gfx.ctx) {
            if(key === "tutorial" && !includingTutorial) { continue; } 
            gfx.clearLayer(key);
        }
    },
    getSaveFileImage: function() {
        const ctx = gfx.ctx["savegen"], w = ctx.canvas.width, h = ctx.canvas.height;
        ctx.clearRect(0, 0, w, h);
        const layersToDraw = ["background", "background2", "characters", "foreground"];
        for(let i = 0; i < layersToDraw.length; i++) {
            ctx.drawImage(gfx.canvas[layersToDraw[i]], 0, 0, w * gfx.scale, h * gfx.scale, 0, 0, w * gfx.scale, h * gfx.scale);
        }
        try { return ctx.canvas.toDataURL("image/png"); } catch(e) { return null; } // toDataURL fails when running locally
    },
    drawSaveFileImage: function(encodedImg) {
        const img = new Image();
        img.src = encodedImg;
        const w = (gfx.tileWidth - 5) * 16 * gfx.scale;
        const h = (gfx.tileHeight - 6) * 16 * gfx.scale;
        img.onload = function() { gfx.ctx["menutext"].drawImage(this, 48, 48, w, h, 256, 288, w, h); };
    },
    drawFOV: function(x, y, dir) {
        let topx, topy, width, height, startx, starty;
        switch(dir) {
            case 0: topx = 48; topy = 0; width = 48; height = 80; startx = x - 1; starty = y - 4.5; break;
            case 1: topx = 0; topy = 140; width = 80; height = 60; startx = x - 4.25; starty = y - 1.75; break;
            case 2: topx = 0; topy = 0; width = 48; height = 80; startx = x - 1; starty = y - 0.25; break;
            case 3: topx = 0; topy = 80; width = 80; height = 60; startx = x + 0.25; starty = y - 1.5; break;
        }
        gfx.drawImage(gfx.ctx["characters"], gfx.spritesheets["fov"], topx, topy, width, height, startx * 16, starty * 16, width, height);
    },
    drawFGCover: function(file, y, yoffset, w, offset) {
        const imgy = y - yoffset;
        if(imgy < 0) { return; }
        gfx.drawImage(gfx.ctx["characters"], gfx.spritesheets[file], 0, imgy * 16, w, 16, (-offset.x * 16), (y - offset.y) * 16, w, 16);
    },
    drawJumbo: function(file, x, y, w, h, ox, oy) {
        gfx.drawImage(gfx.ctx["background2"], gfx.spritesheets[file], x * 16 + (ox || 0), y * 16 + (oy || 0), w, h, 0, 0, w, h);
    },
    DrawTransitionImage: function(spritename, x, y, mult, blackEverythingElse, layerToDraw) {
        layerToDraw = layerToDraw || "tutorial";
        const data = sprites[spritename];
        const size = data[2] === true ? 32 : 16;
        const sheet = gfx.spritesheets[data[2] === true ? "sheetBig" : "sheet"];
        const startX = data[0] * size + data[0] * 2 + 1;
        const startY = data[1] * size + data[1] * 2 + 1;
        const delta = size * mult * 0.5;
        if(blackEverythingElse) {
            const ctx = gfx.ctx[layerToDraw];
            ctx.fillStyle = gfx.GetBlack();
            ctx.fillRect(0, 0, gfx.canvasWidth, gfx.canvasWidth);
            ctx.clearRect((x * size - delta) * gfx.scale + 4, (y * size - delta) * gfx.scale + 4, size * mult * gfx.scale - 4, size * mult * gfx.scale - 4);
        }
        gfx.drawImage(gfx.ctx[layerToDraw], sheet, startX, startY, size, size, x * size - delta, y * size - delta, size * mult, size * mult);
    },
    DrawYMaskedSprite: function(spritename, x, y, layer, bottomY) {
        const data = sprites[spritename];
        const sx = data[0] * 16 + data[0] * 2 + 1;
        const sy = data[1] * 16 + data[1] * 2 + 1;
        const dy = bottomY - y;
        if(dy <= -1) { return; }
        const size = (y <= bottomY ? 16 : 16 - 16 * (y - bottomY));
        gfx.drawImage(gfx.ctx[layer], gfx.spritesheets["sheet"], sx, sy, 16, size, x * 16, y * 16, 16, size);
    },
    drawOption: function(text, y, selected) {
        let xi = 1;
        const tile = selected ? "Ssel" : "sel";
        gfx.drawTile(tile + "M", 0, 2 + y * 16, "menuA");
        let width = gfx.getTextWidth(text);
        while(width > 128) {
            width -= 64;
            gfx.drawTile(tile + "M", 16 * xi++, 2 + y * 16, "menuA");
        }
        gfx.drawTile(tile + "R", 16 * xi, 2 + y * 16, "menuA");
        gfx.drawText(text, 2, 11.5 + y * 16);
        return xi;
    },
    DrawCombatOption: function(text, x, y, selected) {
        const startx = x, suffix = selected ? "A" : "", size = 18;
        gfx.drawTile("BtlSelL" + suffix, 16 * x, 2 + y * 16, "menuA");
        let width = gfx.getTextWidth(text, size), tileWidth = 32;
        while(width > 64) {
            width -= 64;
            gfx.drawTile("BtlSelM" + suffix, 16 * ++x, 2 + y * 16, "menuA");
            tileWidth += 16;
        }
        gfx.drawTile("BtlSelR" + suffix, 16 * ++x, 2 + y * 16, "menuA");
        gfx.drawText(text, 16 * startx + tileWidth / 2, 12 + y * 16, "", size, "", true);
        return x + 1;
    },
    drawRightOption: function(text, y) {
        let xi = 1;
        const tile = "recSel";
        gfx.drawTile(tile + "M", 16 * (gfx.tileWidth - 1), 2 + y * 16, "menuA");
        let width = gfx.getTextWidth(text);
        while(width > 128) {
            width -= 64;
            gfx.drawTile(tile + "M", 16 * (gfx.tileWidth - 1 - xi++), 2 + y * 16, "menuA");
        }
        gfx.drawTile(tile + "L", 16 * (gfx.tileWidth - 1 - xi), 2 + y * 16, "menuA");
        gfx.drawText(text, 16 * (gfx.tileWidth - 1 - xi) + 6, 11.5 + y * 16);
        return xi;
    },
    drawTileToGrid: (spritename, x, y, layer, isHalfTile) => gfx.drawTile(spritename, x * 16, y * 16, layer, isHalfTile),
    drawTile: function(spritename, x, y, layer, isHalfTile) {
        const data = sprites[spritename];
        try {
            const isBig = data.length == 3;
            gfx.DrawSprite(isBig ? "sheetBig" : "sheet", data[0], data[1], x, y, layer, isBig, isHalfTile);
        } catch(e) {
            console.log("couldn't find " + spritename);
        }
    },
    DrawSprite: function(sheetpath, sx, sy, x, y, layer, big, isHalfTile) {
        const sheet = gfx.spritesheets[sheetpath];
        const size = big ? 32 : 16;
        const startX = sx * size + sx * 2 + 1;
        const startY = sy * size + sy * 2 + 1;
        const xmult = (isHalfTile === true ? 0.5 : 1);
        gfx.drawImage(gfx.ctx[layer], sheet, startX, startY, size * xmult, size, x, y, size * xmult, size);
    },
    DrawOnion: function(sx, sy, x, y, layer) {
        const sheet = gfx.spritesheets["calsotte"];
        const w = 48, h = 42;
        const startX = sx * w + sx * 2 + 1;
        const startY = sy * h + sy * 2 + 1;
        const ctx = gfx.ctx[layer || "tutorial"];
        gfx.DrawHueRotated(ctx, player.onion.hueRotate, () => gfx.drawImage(ctx, sheet, startX, startY, w, h, x, y, w, h));
    },
    DrawHueRotated: function(ctx, hue, func) {
        ctx.filter = "hue-rotate(" + hue + "deg)";
        func();
        ctx.filter = "none";
    },
    DrawCombatWhatsit: function(sheet, sx, sy, dims, layer, dx, dy) {
        const pad = sheet === "combatPlayer" || sheet === "sheet" ? 0 : 1;
        const pad2 = pad * 2;
        layer = layer || "characters"; dx = dx || 0; dy = dy || 0;
        const adjustedy = (dims.y + dy) * 16 - dims.h;
        gfx.drawImage(gfx.ctx[layer], gfx.spritesheets[sheet], sx * dims.w + pad, sy * dims.h + pad, dims.w - pad2, dims.h - pad2, (dims.x + dx) * 16 + pad, adjustedy + pad, dims.w - pad2, dims.h - pad2);
    },
    DrawDitheredWhatsit: function(sheet, sx, sy, dims, layer, d, size, gelf) {
        layer = layer || "characters";
        const sw = dims.dw || dims.w;
        const adjustedy = dims.y * 16 - dims.h;
        const ctx = gfx.ctx[layer], img = gfx.spritesheets[sheet];
        let ditherAmounts = [], imax = 32, mod = 32;
        switch(size) {
            case "sm":
                imax = 16;
                ditherAmounts = [d < 3, d < 5, d < 2, d < 4, d < 3, d < 6, false, d < 4, d < 3, d < 5, d < 2, d < 4, d < 3, d < 6, false, d < 4];
                break;
            case "md":
                imax = 24;
                ditherAmounts = [d < 3, d < 5, d < 2, d < 4, d < 3, d < 6, false, d < 4, d < 3, d < 5, d < 2, d < 4, d < 3, d < 6, false, d < 4, d < 3, d < 5, d < 2, d < 4, d < 3, d < 6, false, d < 4];
                break;
            case "lg":
                imax = 32; mod = 16;
                ditherAmounts = [d < 3, d < 5, d < 2, d < 4, d < 3, d < 6, false, d < 4, d < 3, d < 5, d < 2, d < 4, d < 3, d < 6, false, d < 4];
                break;
            case "xl":
                imax = 96; mod = 16;
                ditherAmounts = [d < 3, d < 5, d < 2, d < 4, d < 3, d < 6, false, d < 4, d < 3, d < 5, d < 2, d < 4, d < 3, d < 6, false, d < 4];
                break;
        }
        for(let i = 0; i < imax; i++) {
            if(!ditherAmounts[i % mod]) { continue; }
            gfx.drawImage(ctx, img, sx * sw + i, sy * dims.h, 1, dims.h, dims.x * 16 + i, adjustedy, 1, dims.h);
        }
    },
    DrawMapCharacter: function(sx, sy, pos, offset, sheet, big, layer, other) {
        layer = layer || "characters";
        let w = (big ? 34 : 18), h = (big ? 42 : 22), dy = (big ? 8 : 4);
        if(other !== undefined && other.bigBoy === true) { w = 22; h = 27; dy = 8; }
        let leftx = sx * w, topy = sy * h;
        if(game.glitch) { w += game.glitch.offX; h += game.glitch.offY; leftx += game.glitch.dx; topy += game.glitch.dy; }
        if(other !== undefined) {
            if(other.slightlyWider) {
                gfx.drawImage(gfx.ctx[layer], gfx.spritesheets[sheet], leftx + 1, topy + 1, w + 10, h - 2, (pos.x - offset.x) * 16, (pos.y - offset.y) * 16 - dy, w + 10, h - 2);
                return;
            }
        }
        gfx.drawImage(gfx.ctx[layer], gfx.spritesheets[sheet], leftx + 1, topy + 1, w - 2, h - 2, (pos.x - offset.x) * 16, (pos.y - offset.y) * 16 - dy, w - 2, h - 2);
    },
    DrawCursor: function(x, y, w, h, cursorName, frame, layer) {
        cursorName = cursorName || "cursor";
        gfx.drawTileToGrid(cursorName + frame + "." + "0", x, y, layer);
        gfx.drawTileToGrid(cursorName + frame + "." + "1", x + w, y, layer);
        gfx.drawTileToGrid(cursorName + frame + "." + "2", x, y + h, layer);
        gfx.drawTileToGrid(cursorName + frame + "." + "3", x + w, y + h, layer);
    },
    DrawXCursor: function(x, y, w, h, layer) {
        layer = layer || "menucursorB";
        gfx.drawTileToGrid("xcursor0.0", x, y, layer);
        gfx.drawTileToGrid("xcursor0.1", x + w, y, layer);
        gfx.drawTileToGrid("xcursor0.2", x, y + h, layer);
        gfx.drawTileToGrid("xcursor0.3", x + w, y + h, layer);
    },
    drawInventoryItem: function(itemInfo, x, y, layer) {
        const item = itemInfo[0];
        let spriteName = itemInfo[0];
        if(item[0] !== "_" && item[0] !== "!") {
            const crop = GetCrop(item);
            if(crop.showSeed) { spriteName += "seed"; }
        }
        gfx.drawTileToGrid(spriteName, x, y, layer);
        gfx.drawItemNumber(itemInfo[1], x, y, layer);
    },
    drawStrikeThru: function(x, y, w) {
        if(player.options.font === 1) { y += 4; }
        switch(player.options.fontSize) {
            case 1: y += 3; break;
            case 2: y += 5; break;
        }
        gfx.ctx["menutext"].fillStyle = gfx.GetBlack(); gfx.ctx["menutext"].fillRect(x, y, w, 5);
    },
    drawChoice: function(y, t, selected) {
        const tile = selected ? "SselM" : "selM";
        for(let x = 0; x < 16; x++) { gfx.drawTile(tile, x * 16, y * 16 - 8, "menuA"); }
        gfx.drawText(t, 8, y * 16 + 1);
    },
    GetFontSize: function(size, justNum) {
        size = size || 22;
        switch(player.options.fontSize) {
            case 1: size += 2; break;
            case 2: size += 3; break;
        }
        const isDyslexic = gfx.GetFont() === "OpenDyslexic";
        if(isDyslexic) { size += 1; }
        return justNum === true ? size : ((isDyslexic ? "bold " : "") + size + "px ");
    },
    TileBackground: function(sprite, yMax) {
        yMax = yMax || gfx.tileHeight;
        for(let x = 0; x < gfx.tileWidth; x++) {
            for(let y = 0; y < yMax; y++) {
                gfx.drawTileToGrid(sprite, x, y, "background");
            }
        }
    },

    // Text
    drawInfoText: function(text, x, y, selected, imgLayer, textLayer, sideBtn) {
        imgLayer = imgLayer || "menuOverBlack";
        textLayer = textLayer || "menutextOverBlack";
        let xi = 1;
        let width = gfx.getTextWidth(text) + 20;
        let xiimax = x + Math.ceil(width / 64);
        const prefix = sideBtn ? (selected ? "CornerBtnSel" : "CornerBtn") : (selected ? "recSel" : "sel");
        const dx = sideBtn ? 4 : 0, dy = sideBtn ? -4 : 0;
        while(xiimax > 14) { x -= 1; xiimax = x + Math.ceil(width / 64); }
        gfx.drawTile(prefix + (sideBtn ? "M" : "L"), x * 16, 2 + y * 16 + dy, imgLayer);
        while(width > 128) {
            width -= 64;
            gfx.drawTile(prefix + "M", x * 16 + 16 * xi++, 2 + y * 16 + dy, imgLayer);
        }
        gfx.drawTile(prefix + "R", x * 16 + 16 * xi, 2 + y * 16 + dy, imgLayer);
        gfx.drawText(text, 6 + x * 16 - dx, 11.5 + y * 16, undefined, undefined, textLayer);
        return xi;
    },
    getTextRightAlignedX: (text, size, x) => x - gfx.getTextWidth(text, size),
    getTextFractionX: (text, size, fraction) => gfx.getFractionX(gfx.getTextWidth(text, size), (fraction || 0.5)),
    getFractionX: (width, fraction) => ((gfx.canvasWidth * fraction) - (width / 2)) / 4,
    getTextWidth: function(t, size) {
        gfx.ctx["menutext"].font = gfx.GetFontSize(size) + gfx.GetFont();
        return gfx.ctx["menutext"].measureText(t).width;
    },
    drawText: function(t, x, y, color, size, layer, centered) {
        layer = layer || "menutext";
        gfx.ctx[layer].font = gfx.GetFontSize(size) + gfx.GetFont();
        gfx.ctx[layer].fillStyle = (color || gfx.GetBlack());
        const offset = centered ? (-gfx.ctx[layer].measureText(t).width / 2 + 5) : 0;
        gfx.ctx[layer].fillText(t, x * gfx.scale - gfx.scale + offset, y * gfx.scale);
    },
    getTextLength: function(t, size) {
        gfx.ctx["menutext"].font = gfx.GetFontSize(size) + gfx.GetFont();
        return gfx.ctx["menutext"].measureText(t).width;
    },
    drawFullText: function(t, y, color, overBlack) { return gfx.drawWrappedText(t, 6, 13 + (y || 0), 246, color, (overBlack ? "menutextOverBlack" : undefined)); },
    getWrappedTextInfo: function(t, maxWidth) {
        maxWidth *= gfx.scale;
        const ts = t.split(" ");
        let row = ts[0], numRows = 1, dy = 0;
        const ctx = gfx.ctx["menutext"];
        for(let i = 1; i < ts.length; i++) {
            if(ctx.measureText(row + " " + ts[i]).width > maxWidth || row.indexOf("\n") >= 0) {
                row = ts[i];
                dy += 8;
                numRows++;
            } else {
                row += " " + ts[i];
            }
        }
        return { rows: numRows, height: dy };
    },
    DoesOverflow: function(t, maxWidth, size) {
        const layer = "menutext";
        maxWidth *= gfx.scale;
        const ctx = gfx.ctx[layer];
        size = gfx.GetFontSize(size, true);
        ctx.font = size + "px " + gfx.GetFont();
        const textInfo = ctx.measureText(t);
        return textInfo.width > maxWidth;
    },
    DrawSpeakerBG: function(name, x, y, layer) {
        layer = layer || "menuA";
        const color = gfx.GetSpeakerBGColor(), delta = 0.75;
        gfx.drawWrappedText(name, x, y - delta, 200, color, undefined, layer);
        gfx.drawWrappedText(name, x, y + delta, 200, color, undefined, layer);
        gfx.drawWrappedText(name, x - delta, y, 200, color, undefined, layer);
        gfx.drawWrappedText(name, x + delta, y, 200, color, undefined, layer);
        gfx.drawWrappedText(name, x + delta, y + delta, 200, color, undefined, layer);
        gfx.drawWrappedText(name, x + delta, y - delta, 200, color, undefined, layer);
        gfx.drawWrappedText(name, x - delta, y + delta, 200, color, undefined, layer);
        gfx.drawWrappedText(name, x - delta, y - delta, 200, color, undefined, layer);
    },
    drawWrappedText: function(t, x, y, maxWidth, color, layer, size) {
        layer = layer || "menutext";
        maxWidth *= gfx.scale;
        const ctx = gfx.ctx[layer];
        ctx.fillStyle = (color || gfx.GetBlack());
        size = gfx.GetFontSize(size, true);
        ctx.font = size + "px " + gfx.GetFont();
        const ddy = size / 2.75, ts = t.split(" ");
        let row = ts[0], dy = 0, numRows = 1;
        for(let i = 1; i < ts.length; i++) {
            const textInfo = ctx.measureText(row + " " + ts[i]);
            if(ts[i] === "\n") {
                ctx.fillText(row.trim(" "), x * gfx.scale, (y + dy) * gfx.scale);
                dy += ddy;
                row = "";
                numRows++;
            } else if(textInfo.width > maxWidth || row.indexOf("\n") >= 0) {
                ctx.fillText(row.trim(" "), x * gfx.scale, (y + dy) * gfx.scale);
                dy += ddy;
                row = ts[i];
                numRows++;
            } else {
                row += " " + ts[i];
            }
        }
        ctx.fillText(row.trim(" "), x * gfx.scale, (y + dy) * gfx.scale);
        return numRows;
    },
    drawTextBox: (y, overBlack) => gfx.drawInfobox(17, 4, y || 0, (overBlack ? "menuOverBlack" : undefined), "FarmInfo"),
    drawFullbox: (y, overBlack) => gfx.drawInfobox(17, 4.5, y || 0, (overBlack ? "menuOverBlack" : undefined), "FarmInfo"),
    drawMinibox: function(x, y, w, h, layer, type) {
        layer = layer || "menuA";
        type = type || "info";
        gfx.drawTile(type + "UL", x * 16, y * 16, layer);
        gfx.drawTile(type + "DL", x * 16, (y + h) * 16, layer);
        gfx.drawTile(type + "UR", (x + w) * 16, y * 16, layer);
        gfx.drawTile(type + "DR", (x + w) * 16, (y + h) * 16, layer);
        for(let x2 = x + 1; x2 < x + w; x2++) {
            gfx.drawTile(type + "U", x2 * 16, y * 16, layer);
            gfx.drawTile(type + "D", x2 * 16, (y + h) * 16, layer);
        }
        for(let y2 = y + 1; y2 < y + h; y2++) {
            gfx.drawTile(type + "L", x * 16, y2 * 16, layer);
            gfx.drawTile(type + "R", (x + w) * 16, y2 * 16, layer);
        }
        const ctx = gfx.ctx[layer];
        ctx.fillStyle = gfx.GetInfoColor(type);
        ctx.fillRect((x + 1) * 16 * gfx.scale, (y + 1) * 16 * gfx.scale, (w - 1) * 16 * gfx.scale, (h - 1) * 16 * gfx.scale);
    },
    drawInfobox: function(w, h, y, layer, type) {
        y = (y || 0) * 16;
        layer = layer || "menuA";
        type = type || "info";
        const startx = gfx.tileWidth - w;
        h -= 1;
        gfx.drawTile(type + "UL", startx * 16, y, layer);
        gfx.drawTile(type + "DL", startx * 16, y + h * 16, layer);
        for(let x = startx + 1; x < gfx.tileWidth; x++) {
            gfx.drawTile(type + "U", x * 16, y, layer);
            gfx.drawTile(type + "D", x * 16, y + h * 16, layer);
        }
        for(let y2 = 1; y2 < h; y2++) {
            gfx.drawTile(type + "L", startx * 16, y + y2 * 16, layer);
        }
        const ctx = gfx.ctx[layer];
        ctx.fillStyle = gfx.GetInfoColor(type);
        ctx.fillRect((startx + 1) * 16 * gfx.scale, (y + 16) * gfx.scale, (w - 1) * 16 * gfx.scale, (h - 1) * 16 * gfx.scale);
    },
    drawBigNumber: function(number, x, y, layer, white) {
        if(number > 100 || number < 0) { return; }
        const digits = ("" + number).split(""), xOffset = digits.length === 1 ? 0.125 : 0;
        for(let i = 0; i < digits.length; i++) {
            gfx.drawTileToGrid((white === true ? "bigNumW" : "bigNum") + digits[i], x + xOffset + 0.5 * i, y, layer, true);
        }
    },
    drawItemNumber: function(number, x, y, layer, top) {
        const digits = ("" + number).split("");
        const sheet = gfx.spritesheets["sheet"];
        const startCoords = sprites["numStart"];
        const startX = startCoords[0] * 16 + startCoords[0] * 2 + 1;
        const startY = startCoords[1] * 16 + startCoords[1] * 2 + 1;
        const ctx = gfx.ctx[layer];
        const ix = x * 16 + 7 - (digits.length - 1) * 4;
        const ay = y * 16 + (top ? 0 : 9);
        if(number === "x") {
            gfx.drawImage(ctx, sheet, startX, startY, 5, 7, ix + 4, ay - 2, 5, 7);
            return;
        } else if(number === 0) {
            gfx.drawImage(ctx, sheet, startX, startY + 9, 5, 7, ix + 4, ay - 2, 5, 7);
            return;
        }
        if(!top) { gfx.drawImage(ctx, sheet, startX, startY, 5, 7, ix, ay, 5, 7); }
        for(let i = 0; i < digits.length; i++) {
            const d = gfx.numberDeltas[digits[i]];
            gfx.drawImage(ctx, sheet, startX + d[0] * 6, startY + d[1] * 9, 5, 7, ix + (i + 1) * 4, ay, 5, 7);
        }
    },
    // Bridge
    DrawBlack: function(x, w) {
        const ctx = gfx.ctx["tutorial"];
        ctx.fillStyle = gfx.GetBlack();
        ctx.fillRect(x * gfx.scale, 0, w * gfx.scale, game.tileh * 16 * gfx.scale);
    },
    // HQ3 - The Monster
    DrawChungus: function(x, y, w, h, offset) {
        const ctx = gfx.ctx["foreground"];
        ctx.fillStyle = player.IsMonochrome() ? "#88C070" : "#64A5FF";
        ctx.fillRect((x - offset.x * 16) * gfx.scale, (y - offset.y * 16) * gfx.scale, w * gfx.scale, h * gfx.scale);
    },
    DrawHelp: () => gfx.drawImage(gfx.ctx["foreground"], gfx.spritesheets["ayudame"], 0, 0, 34, 24, 220, 195, 34, 24),
    DrawHorRor: function(intensity) {
        if(intensity < 0) { intensity = 0; }
        gfx.drawImage(gfx.ctx["foreground"], gfx.spritesheets["horRorTop"], 0, 0, 1024, 252, 0, 0 - intensity, 1024, 252);
        gfx.drawImage(gfx.ctx["foreground"], gfx.spritesheets["horRorBottom"], 0, 0, 1024, 252, 0, 160 + intensity, 1024, 252);
    },
    // Combat
    DrawBlackRect: function(x, y, w, h, layer) {
        layer = layer || "tutorial";
        const ctx = gfx.ctx[layer];
        ctx.fillStyle = gfx.GetBlack();
        ctx.fillRect(x * gfx.scale, y * gfx.scale, w * gfx.scale, h * gfx.scale);
    },
    DrawChallengeGrid: function(sheetpath, x, y, layer, dx) {
        const sheet = gfx.spritesheets[sheetpath];
        gfx.drawImage(gfx.ctx[layer], sheet, dx * 50 + 1, 1, 48, 80, x * 16, y * 16, 48, 80);
    },
    // Full Drawsies
    fragmentCache: [],  
    FragmentMap: function(map) {
        gfx.fragmentCache = [];
        const mapImg = gfx.spritesheets["maps/" + map];
        const w = mapImg.width, h = mapImg.height;
        if(w < 2000 && h < 1344) { return; }
        for(let y = 0; y < h; y += 1344) {
            const cacheRow = [];
            for(let x = 0; x < w; x += 2000) {
                const canvas = document.createElement("canvas");
                const cw = Math.min(2000, w - x);
                const ch = Math.min(1344, h - y);
                canvas.width = cw;
                canvas.height = ch;
                canvas.getContext("2d").drawImage(mapImg, x, y, cw, ch, 0, 0, cw, ch);
                cacheRow.push(canvas);
            }
            gfx.fragmentCache.push(cacheRow);
        }
    },
    drawMap: function(map, centerx, centery) {
        const w = collisions[map][0].length;
        const h = collisions[map].length;
        const offset = {
            x: Math.min(w - gfx.tileWidth, Math.max(centerx - (gfx.tileWidth / 2), 0 + 0.5)),
            y: Math.min(h - gfx.tileHeight, Math.max(centery - (gfx.tileHeight / 2), 0))
        };
        if(gfx.fragmentCache.length > 0) {
            const pChunkX = centerx / 31.25, pChunkY = centery / 21;
            const chunkX = Math.floor(pChunkX), chunkY = Math.floor(pChunkY);
            gfx.drawMapChunk(map, chunkX, chunkY, 31.25, 21, offset);
            const dx = pChunkX - chunkX, dy = pChunkY - chunkY;
            const showLeft = dx <= 0.27, showRight = dx >= 0.73, showTop = dy <= 0.546, showBottom = dy >= 0.63;
            if(showLeft) {
                if(showTop) {
                    gfx.drawMapChunk(map, chunkX - 1, chunkY - 1, 31.25, 21, offset);
                } else if(showBottom) {
                    gfx.drawMapChunk(map, chunkX - 1, chunkY + 1, 31.25, 21, offset);
                }
                gfx.drawMapChunk(map, chunkX - 1, chunkY, 31.25, 21, offset);
            } else if(showRight) {
                if(showTop) {
                    gfx.drawMapChunk(map, chunkX + 1, chunkY - 1, 31.25, 21, offset);
                } else if(showBottom) {
                    gfx.drawMapChunk(map, chunkX + 1, chunkY + 1, 31.25, 21, offset);
                }
                gfx.drawMapChunk(map, chunkX + 1, chunkY, 31.25, 21, offset);
            }
            if(showTop) {
                gfx.drawMapChunk(map, chunkX, chunkY - 1, 31.25, 21, offset);
            } else if(showBottom) {
                gfx.drawMapChunk(map, chunkX, chunkY + 1, 31.25, 21, offset);
            }
        } else {
            const mapImg = gfx.spritesheets["maps/" + map];
            gfx.drawImage(gfx.ctx["background"], mapImg, offset.x * 16, offset.y * 16, gfx.canvasWidth, gfx.canvasHeight, 0, 0, gfx.canvasWidth, gfx.canvasHeight);
        }
        return offset;
    },
    drawMapChunk: function(map, x, y, chunkw, chunkh, offset) {
        if(y < 0 || x < 0) { return; }
        if(y >= gfx.fragmentCache.length || x >= gfx.fragmentCache[0].length) { return; }
        const mapImg = gfx.fragmentCache[y][x];
        if(mapImg === undefined) { return; }
        const relativeOffsetX = offset.x - chunkw * x, relativeOffsetY = offset.y - chunkh * y;
        gfx.drawImage(gfx.ctx["background"], mapImg, relativeOffsetX * 16, relativeOffsetY * 16, gfx.canvasWidth, gfx.canvasHeight, 0, 0, gfx.canvasWidth, gfx.canvasHeight);
    },
    drawFullImage: function(img, layer, x, y) {
        layer = layer || "background";
        const imgSheet = gfx.spritesheets[img];
        gfx.drawImage(gfx.ctx[layer], imgSheet, 0, 0, gfx.canvasWidth, gfx.canvasHeight, x || 0, y || 0, gfx.canvasWidth, gfx.canvasHeight);
        return true;
    },
    drawImage: function(ctx, image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
        ctx.drawImage(image, srcX * gfx.scale, srcY * gfx.scale, srcW * gfx.scale, srcH * gfx.scale, dstX * gfx.scale, dstY * gfx.scale, dstW * gfx.scale, dstH * gfx.scale);  
    },
    numberDeltas: { "1": [1, 0], "2": [2, 0], "3": [3, 0], "4": [4, 0], "5": [5, 0], "6": [1, 1], "7": [2, 1], "8": [3, 1], "9": [4, 1], "0": [5, 1] }
};