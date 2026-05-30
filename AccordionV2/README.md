# AccordionV2 — PowerApps PCF Component

A fully customizable accordion/FAQ component for Microsoft Power Apps canvas apps. Supports up to 10 collapsible sections with smooth expand/collapse animation, multi-line body content using a `~~` separator, bold headers using `##`, and full styling control.

---

## ✨ Features

- **Up to 10 accordion items** — each with title, subtitle, and body text
- **Smooth animation** — configurable expand/collapse transition duration
- **Multi-line body content** — use `~~` as a line separator in body text
- **Bold section headers** — prefix a line with `##` to render it bold
- **Only one item open at a time** — clicking another auto-closes the current
- **Fully customizable colors** — accent, title, subtitle, body, border, background
- **No PAC CLI, no NPM, no build tools** — just import the `.zip` and use

---

## 📸 Demo

![AccordionV2 Demo](GIF%20-%20PCF.gif)

## 📦 Installation

1. Download `AccordionV2_sln.zip`
2. Go to [make.powerapps.com](https://make.powerapps.com)
3. Navigate to **Solutions** → **Import solution**
4. Upload the `.zip` → **Next** → **Import**
5. Wait for import to complete ✅

> ⚠️ Ensure **Custom code components** is enabled:  
> Power Apps Admin Center → Environments → Settings → Features → **Allow publishing of canvas apps with code components** → ON

---

## 🚀 Quick Setup

### Step 1 — Insert the component

Go to **Insert** → **Code components** → select `AccordionV2`

### Step 2 — Set visible count

```yaml
Visible_Count: =5
```

This controls how many items are shown (1–10).

### Step 3 — Set your content

```yaml
Item1_Title:    ="User Profile"
Item1_Subtitle: ="Update your personal details"
Item1_Body:     ="You can update your name, civil status, and contact information from the My Profile section."
```

---

## 📝 Body Text Formatting

### Multi-line content
Use `~~` to add line breaks inside the body:

```powerfx
Item1_Body: ="Step 1: Go to My Profile~~Step 2: Click Edit~~Step 3: Update your details~~Step 4: Click Save"
```

### Bold section headers
Prefix a line with `##` to render it as a bold header:

```powerfx
Item1_Body: ="## Important Note~~Please ensure all fields are filled before saving.~~Contact HR if you need assistance."
```

### Combined example
```powerfx
Item5_Body: ="Step 1: Set civil status to Single → Save → Refresh app~~Step 2: Change back to Married → Re-enter spouse and employment info~~Step 3: Re-enter in-laws under Family Relations~~Step 4: Retry completing your profile"
```

---

## ⚙️ Properties Reference

### Item content (per item, ×10)

| Property | Default | Description |
|---|---|---|
| `Item1_Title` | `"Personal information"` | Main heading of the accordion item |
| `Item1_Subtitle` | `"Name, date of birth, civil status"` | Subtext shown below the title when collapsed |
| `Item1_Body` | `"Enter content here."` | Body content shown when expanded. Use `~~` for line breaks, `##` for bold headers |

> Repeat for `Item2_` through `Item10_`

### Visible count

| Property | Default | Description |
|---|---|---|
| `Visible_Count` | `3` | How many items to display (1–10). Items beyond this number are hidden |

### Colors

| Property | Default | Description |
|---|---|---|
| `Accent_Color` | `"#ac2bbc"` | Color of the expand/collapse chevron icon and active state |
| `Title_Color` | `"#111827"` | Title text color |
| `Subtitle_Color` | `"#9ca3af"` | Subtitle text color |
| `Body_Text_Color` | `"#6b7280"` | Body content text color |
| `Border_Color` | `"#e5e7eb"` | Border color between items |
| `Bg_Color` | `"#ffffff"` | Background color of the accordion |

### Typography

| Property | Default | Description |
|---|---|---|
| `Title_Font_Size` | `13` | Title font size in px |
| `Body_Font_Size` | `12` | Body text font size in px |

### Layout

| Property | Default | Description |
|---|---|---|
| `Border_Radius` | `12` | Corner radius of the outer accordion in px |
| `Anim_Duration` | `0.28` | Expand/collapse animation duration in seconds |

---

## 💡 Tips

### FAQ / Help sections
Use `Item_Subtitle` as a question and `Item_Body` as the answer:
```yaml
Item1_Title:    ="Getting Started"
Item1_Subtitle: ="How do I update my profile?"
Item1_Body:     ="Navigate to My Profile from the left sidebar, click Edit, update your information, and click Save."
```

### Troubleshooting steps
Use `~~` for step-by-step instructions and `→` for arrows:
```yaml
Item5_Body: ="Step 1: Clear app cache~~Step 2: Log out and log back in~~Step 3: Contact support if issue persists"
```

### Match your brand
```yaml
Accent_Color: ="#your-brand-color"
Bg_Color:     ="#ffffff"
Border_Color: ="#e5e7eb"
```

### Auto-height
Set the PCF `Height` in PowerApps to be tall enough — the accordion expands internally so give it room. A safe default is `400–600px` depending on content.

---

## 📁 File Structure

```
AccordionV2_sln.zip
├── solution.xml
├── customizations.xml
├── [Content_Types].xml
└── Controls/
    └── lng_longnt.AccordionV2/
        ├── ControlManifest.xml
        ├── bundle.js
        └── css/
            └── AccordionV2.css
```

---

## 🔒 Security

- No external API calls
- No data collection or telemetry
- No CDN dependencies
- Runs locally inside PowerApps WebView sandbox
- Publisher namespace: `longnt` | Prefix: `lng`
- Safe for production environments

---

## 🧩 Compatibility

- Power Apps Canvas Apps
- Managed solution — safe to import alongside other solutions
- No PAC CLI or developer tools required
- Tested on PowerApps WebView (Windows, iOS, Android)

---

## 📄 License

MIT — free to use, modify, and distribute.

---

*Built with ❤️ for the PowerApps community.*
