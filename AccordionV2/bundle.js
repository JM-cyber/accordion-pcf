var pcf_accordionv2;(()=>{"use strict";
var t={d:(o,i)=>{for(var e in i)t.o(i,e)&&!t.o(o,e)&&Object.defineProperty(o,e,{enumerable:!0,get:i[e]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};
t.r(o),t.d(o,{AccordionV2:()=>i});

class i {
  constructor() {
    this._openIndex = -1;
    this._items = [];
  }

  init(context, notifyOutputChanged, state, container) {
    this._context = context;
    this._notifyOutputChanged = notifyOutputChanged;
    this._container = container;
    this._buildDOM();
    this._buildItems();
  }

  updateView(context) {
    this._context = context;
    this._buildItems();
  }

  getOutputs() { return {}; }
  destroy() {}

  _buildDOM() {
    this._wrapper = document.createElement("div");
    this._wrapper.className = "acc-wrapper";
    this._wrapper.style.cssText = "width:100%;height:100%;overflow-y:auto;box-sizing:border-box;padding:4px 2px;";
    this._list = document.createElement("div");
    this._list.style.cssText = "display:flex;flex-direction:column;gap:8px;";
    this._wrapper.appendChild(this._list);
    this._container.appendChild(this._wrapper);
  }

  _getData() {
    var p = this._context.parameters;
    var count = Math.min(10, Math.max(1, this._num(p.visibleCount, 3)));
    var raw = [
      { title: this._str(p.item1Title,""), subtitle: this._str(p.item1Subtitle,""), body: this._str(p.item1Body,"") },
      { title: this._str(p.item2Title,""), subtitle: this._str(p.item2Subtitle,""), body: this._str(p.item2Body,"") },
      { title: this._str(p.item3Title,""), subtitle: this._str(p.item3Subtitle,""), body: this._str(p.item3Body,"") },
      { title: this._str(p.item4Title,""), subtitle: this._str(p.item4Subtitle,""), body: this._str(p.item4Body,"") },
      { title: this._str(p.item5Title,""), subtitle: this._str(p.item5Subtitle,""), body: this._str(p.item5Body,"") },
      { title: this._str(p.item6Title,""), subtitle: this._str(p.item6Subtitle,""), body: this._str(p.item6Body,"") },
      { title: this._str(p.item7Title,""), subtitle: this._str(p.item7Subtitle,""), body: this._str(p.item7Body,"") },
      { title: this._str(p.item8Title,""), subtitle: this._str(p.item8Subtitle,""), body: this._str(p.item8Body,"") },
      { title: this._str(p.item9Title,""), subtitle: this._str(p.item9Subtitle,""), body: this._str(p.item9Body,"") },
      { title: this._str(p.item10Title,""), subtitle: this._str(p.item10Subtitle,""), body: this._str(p.item10Body,"") }
    ];
    var result = [];
    for (var x = 0; x < count; x++) {
      result.push(raw[x]);
    }
    return result;
  }

  _renderBody(text, bodyCol, titleCol, fontSize) {
    var frag = document.createDocumentFragment();
    if (!text || text.trim() === "") {
      var empty = document.createElement("span");
      empty.style.cssText = "color:" + bodyCol + ";font-size:" + fontSize + "px;";
      empty.textContent = "No content.";
      frag.appendChild(empty);
      return frag;
    }
    var lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
    var buffer = [];
    var self = this;
    var flush = function() {
      if (buffer.length === 0) return;
      var joined = buffer.join(" ").trim();
      if (joined !== "") {
        var p = document.createElement("div");
        p.style.cssText = "color:" + bodyCol + ";font-size:" + fontSize + "px;font-family:Segoe UI,sans-serif;line-height:1.75;margin-bottom:10px;";
        p.textContent = joined;
        frag.appendChild(p);
      }
      buffer = [];
    };
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.startsWith("##")) {
        flush();
        var h = document.createElement("div");
        h.style.cssText = "color:" + titleCol + ";font-size:" + (fontSize + 2) + "px;font-weight:600;font-family:Segoe UI,sans-serif;margin-bottom:6px;margin-top:14px;";
        h.textContent = line.replace(/^##\s*/, "");
        frag.appendChild(h);
      } else if (line.trim() === "") {
        flush();
      } else {
        buffer.push(line.trim());
      }
    }
    flush();
    return frag;
  }

  _buildItems() {
    var p = this._context.parameters;
    var accent      = this._str(p.accentColor, "#ac2bbc");
    var titleCol    = this._str(p.titleColor, "#111827");
    var subtitleCol = this._str(p.subtitleColor, "#9ca3af");
    var bodyCol     = this._str(p.bodyTextColor, "#6b7280");
    var borderCol   = this._str(p.borderColor, "#e5e7eb");
    var bgCol       = this._str(p.bgColor, "#ffffff");
    var radius      = this._num(p.borderRadius, 12);
    var dur         = this._num(p.animDuration, 0.28);
    var titleSize   = this._num(p.titleFontSize, 13);
    var bodySize    = this._num(p.bodyFontSize, 12);
    var data        = this._getData();

    this._list.innerHTML = "";
    this._items = [];
    this._openIndex = -1;

    var self = this;

    data.forEach(function(d, idx) {
      var item = document.createElement("div");
      item.style.cssText = "border-radius:" + radius + "px;overflow:hidden;transition:border-color 0.25s,box-shadow 0.25s;border:0.5px solid " + borderCol + ";background:" + bgCol + ";";

      var header = document.createElement("div");
      header.style.cssText = "display:flex;align-items:center;justify-content:space-between;padding:14px 16px;cursor:pointer;user-select:none;gap:12px;";

      var left = document.createElement("div");
      left.style.cssText = "display:flex;flex-direction:column;gap:3px;flex:1;min-width:0;";

      var titleEl = document.createElement("div");
      titleEl.style.cssText = "font-size:" + titleSize + "px;font-weight:500;font-family:Segoe UI,sans-serif;color:" + titleCol + ";transition:color 0.25s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
      titleEl.textContent = d.title || ("Section " + (idx + 1));

      var subtitleEl = document.createElement("div");
      subtitleEl.style.cssText = "font-size:11px;font-family:Segoe UI,sans-serif;color:" + subtitleCol + ";white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:" + (d.subtitle ? "block" : "none") + ";";
      subtitleEl.textContent = d.subtitle || "";

      left.appendChild(titleEl);
      left.appendChild(subtitleEl);

      var btn = document.createElement("div");
      btn.style.cssText = "width:28px;height:28px;border-radius:8px;border:0.5px solid " + borderCol + ";background:transparent;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.25s,border-color 0.25s;";

      var iconWrap = document.createElement("div");
      iconWrap.style.cssText = "position:relative;width:14px;height:14px;";

      var bar1 = document.createElement("div");
      bar1.style.cssText = "position:absolute;width:10px;height:1.5px;background:" + subtitleCol + ";border-radius:2px;top:50%;left:50%;transform:translate(-50%,-50%);transition:background 0.25s;";

      var bar2 = document.createElement("div");
      bar2.style.cssText = "position:absolute;width:1.5px;height:10px;background:" + subtitleCol + ";border-radius:2px;top:50%;left:50%;transform:translate(-50%,-50%);transition:transform 0.25s,opacity 0.25s,background 0.25s;";

      iconWrap.appendChild(bar1);
      iconWrap.appendChild(bar2);
      btn.appendChild(iconWrap);
      header.appendChild(left);
      header.appendChild(btn);

      var body = document.createElement("div");
      body.style.cssText = "display:grid;grid-template-rows:0fr;transition:grid-template-rows " + dur + "s cubic-bezier(0.4,0,0.2,1);";

      var bodyInner = document.createElement("div");
      bodyInner.style.cssText = "overflow:hidden;";

      var bodyContent = document.createElement("div");
      bodyContent.style.cssText = "padding:16px 20px 20px;border-top:0.5px solid " + borderCol + ";";
      bodyContent.appendChild(self._renderBody(d.body, bodyCol, titleCol, bodySize));

      bodyInner.appendChild(bodyContent);
      body.appendChild(bodyInner);
      item.appendChild(header);
      item.appendChild(body);
      self._list.appendChild(item);

      self._items.push({ item, body, titleEl, btn, bar1, bar2, accent, titleCol, subtitleCol, borderCol });

      header.addEventListener("click", function() { self._toggle(idx); });
    });
  }

  _toggle(idx) {
    var prev = this._openIndex;
    if (prev !== -1 && prev !== idx && prev < this._items.length) {
      this._close(prev);
    }
    if (this._openIndex === idx) {
      this._close(idx);
    } else {
      this._open(idx);
    }
  }

  _open(idx) {
    var el = this._items[idx];
    this._openIndex = idx;
    el.body.style.gridTemplateRows = "1fr";
    el.item.style.borderColor = el.accent;
    el.item.style.boxShadow = "0 0 0 1px " + this._rgba(el.accent, 0.15);
    el.titleEl.style.color = el.accent;
    el.btn.style.background = this._rgba(el.accent, 0.08);
    el.btn.style.borderColor = this._rgba(el.accent, 0.3);
    el.bar1.style.background = el.accent;
    el.bar2.style.background = el.accent;
    el.bar2.style.transform = "translate(-50%,-50%) rotate(90deg)";
    el.bar2.style.opacity = "0";
  }

  _close(idx) {
    var el = this._items[idx];
    if (this._openIndex === idx) this._openIndex = -1;
    el.body.style.gridTemplateRows = "0fr";
    el.item.style.borderColor = el.borderCol;
    el.item.style.boxShadow = "none";
    el.titleEl.style.color = el.titleCol;
    el.btn.style.background = "transparent";
    el.btn.style.borderColor = el.borderCol;
    el.bar1.style.background = el.subtitleCol;
    el.bar2.style.background = el.subtitleCol;
    el.bar2.style.transform = "translate(-50%,-50%)";
    el.bar2.style.opacity = "1";
  }

  _rgba(hex, a) {
    try {
      var r = parseInt(hex.slice(1,3),16);
      var g = parseInt(hex.slice(3,5),16);
      var b = parseInt(hex.slice(5,7),16);
      return "rgba("+r+","+g+","+b+","+a+")";
    } catch(e) { return hex; }
  }

  _str(param, def) {
    return (param && param.raw != null && String(param.raw) !== "") ? String(param.raw) : def;
  }

  _num(param, def) {
    if (!param || param.raw == null || isNaN(Number(param.raw))) return def;
    return Number(param.raw);
  }
}

pcf_accordionv2 = o;
})();

if (window.ComponentFramework && window.ComponentFramework.registerControl) {
  ComponentFramework.registerControl('longnt.AccordionV2', pcf_accordionv2.AccordionV2);
}
