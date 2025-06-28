# 📁 Droper.js

**Droper.js** is a lightweight, customizable file uploader plugin that supports drag & drop, previews, existing file rendering, and more. Perfect for admin panels or CMS-style forms.

---

## 🚀 Installation

Include the `droper.js` and `droper.css` files in your HTML:

```html
<link rel="stylesheet" href="/path/to/droper.css" />
<script src="/path/to/droper.js"></script>
```

---

## 📦 Usage

### 📌 Basic HTML

```html
<input type="file" class="droper" name="thumbnail" accept="image/*" required />
```

---

## 🧠 Initialization

You can initialize **a single input** or **multiple inputs** with one line.

### ✅ Single Input

```js
droper.init('input[name="thumbnail"]', {
  maxFiles: 1,
  previewHeight: '180px',
  placeholder: 'Upload or drag an image here',
});
```

### ✅ Multiple Inputs (Auto Init)

```js
droper.initAll('.droper', {
  maxFiles: 1,
  previewHeight: '180px',
});
```

---

## ⚙️ Options

| Option         | Type     | Default                 | Description                                                   |
|----------------|----------|-------------------------|---------------------------------------------------------------|
| `maxFiles`     | `Number` | `1`                     | Maximum number of files to allow                             |
| `previewHeight`| `String` | `'150px'`               | Height for the preview container                             |
| `placeholder`  | `String` | `'Upload or drag here'` | Placeholder text shown when no file is selected              |
| `existingFiles`| `Array`  | `[]`                    | Array of existing files to show preview (for edit forms)     |

### Example with `existingFiles`

```js
droper.init('input[name="thumbnail"]', {
  existingFiles: [
    {
      url: 'https://example.com/image.jpg',
    }
  ]
});
```

---

## 📝 Notes

- If your input has `required` attribute, Droper will enforce it.
- Existing files are shown only as preview—they are not re-uploaded.
- Droper does not send AJAX—it enhances `<input type="file">` and relies on regular form submission.

---

## 👨‍💻 Author

Made with 💻 by **Muhammad Owais**  
GitHub: [mowais28](https://github.com/mowais28)

---