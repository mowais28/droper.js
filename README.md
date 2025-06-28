
# Droper.js

**Droper.js** is a lightweight, modern file input enhancement tool with drag-and-drop support, live file previews (images, videos, PDFs), and SVG fallback icons for unsupported types — all styled using Bootstrap 5.

> Created by **Muhammad Owais**

---

## 🚀 Features

- 🖱️ Click or drag-and-drop to select files
- 🖼️ Image, video, and PDF live preview
- 🧾 Smart file icons for `.docx`, `.exe`, `.zip`, etc.
- 📦 Support for both single & multiple file selection
- 🧹 Remove files before upload
- 🎨 Uses **Bootstrap 5** styling only — no extra CSS required

---

## 📦 Installation

### 📁 Option 1: Local

Copy `droper.js` to your project folder and include it:

```html
<script src="/js/droper.js"></script>
```

---

## ⚙️ Initialization

Droper provides two ways to initialize file inputs.

---

### 1. `.init(selector)`

Use this to initialize **a single input**.

```html
<script>
document.addEventListener('DOMContentLoaded', function () {
    droper.init('#myUploader'); // Or pass DOM element directly
});
</script>
```

---

### 2. `.initAll(selector)`

Use this to initialize **multiple file inputs** by class or any CSS selector.

```html
<script>
document.addEventListener('DOMContentLoaded', function () {
    droper.initAll('.droper-uploader');
});
</script>
```

---

## 📁 Access Selected Files in JS

You can access selected files anytime via:

```js
const files = document.querySelector('#myUploader')._droperFiles;
console.log(files); // File[] array
```

---

## 🔍 File Type Preview Support

| File Type       | Preview Style            |
|------------------|--------------------------|
| `.jpg`, `.jpeg`, `.png`, `.gif` | Image preview 🖼️   |
| `.mp4`, `.webm`  | Video player 🎞️       |
| `.pdf`           | Inline iframe 📄        |
| Others (`.docx`, `.exe`, `.zip`) | SVG icon fallback 📁 |
