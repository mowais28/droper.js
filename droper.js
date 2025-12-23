
window.droper = {
    init: function (e, t = {}) {
        const n = "string" == typeof e ? document.querySelector(e) : e;
        if (!n || "file" !== n.type) return;

        const i = Object.assign(
            {
                maxFiles: 5,
                previewHeight: "160px",
                placeholder: "Click or drag files here to upload",
                existingFiles: []
            },
            t
        );

        const r = document.createElement("div");
        r.className = "droper-container border rounded my-2 bg-light text-center position-relative";
        r.style.cursor = "pointer";
        r.style.padding = "3rem";

        const a = document.createElement("p");
        a.className = "text-muted mb-0";
        a.innerText = i.placeholder;
        r.appendChild(a);

        const o = document.createElement("div");
        o.classList.add("droper-preview", "row", "mt-3");
        r.appendChild(o);

        n.hidden = !0;
        n.parentNode.insertBefore(r, n);
        r.appendChild(n);

        let l = [];
        let d = n.hasAttribute("multiple");

        r.addEventListener("click", () => n.click());

        ["dragenter", "dragover"].forEach(ev =>
            r.addEventListener(ev, e => {
                e.preventDefault();
                r.classList.add("border-primary");
            })
        );

        ["dragleave", "drop"].forEach(ev =>
            r.addEventListener(ev, e => {
                e.preventDefault();
                r.classList.remove("border-primary");
            })
        );

        r.addEventListener("drop", e => {
            e.preventDefault();
            s(e.dataTransfer.files);
        });

        n.addEventListener("change", () => {
            if (!n.files.length) return;
            s(n.files);
        });

        function s(files) {
            d ? Array.from(files).forEach(f => l.push(f)) : (l = [files[0]], i.existingFiles = []);
            c();
        }

        function c() {
            o.innerHTML = "";

            if (l.length === 0 && i.existingFiles.length === 0) {
                a.style.display = "block";
                r.style.padding = "3rem";
            } else {
                a.style.display = "none";
                r.style.padding = "0rem 1rem";
            }

            l.forEach((f, idx) => {
                o.appendChild(u(f, idx, true));
            });

            i.existingFiles.forEach((f, idx) => {
                const fname = f.name || f.url.split("/").pop().split("?")[0].split("#")[0];
                const fileMeta = { name: fname, type: "", url: f.url };
                o.appendChild(u(fileMeta, idx, false));
            });

            if (n.hasAttribute("required")) {
                n.setCustomValidity(
                    l.length === 0 && i.existingFiles.length === 0 ? "Please upload a file." : ""
                );
            }
        }

        function u(file, idx, isNew) {
            const col = document.createElement("div");
            col.className = "col-md-3";

            const wrapper = document.createElement("div");
            wrapper.className = "card position-relative shadow-sm";

            const filename = file.name || "file";
            const ext = filename.split(".").pop().toLowerCase();

            let preview;

            if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
                preview = document.createElement("img");
                preview.src = isNew ? URL.createObjectURL(file) : file.url;
                preview.className = "card-img-top";
                preview.style.height = i.previewHeight;
                preview.style.objectFit = "cover";
            } else if (ext === "pdf") {
                preview = document.createElement("iframe");
                preview.src = isNew ? URL.createObjectURL(file) : file.url;
                preview.className = "card-img-top";
                preview.style.height = i.previewHeight;
            } else if (["mp4", "webm"].includes(ext)) {
                preview = document.createElement("video");
                preview.src = isNew ? URL.createObjectURL(file) : file.url;
                preview.controls = true;
                preview.className = "card-img-top";
                preview.style.height = i.previewHeight;
            } else {
                preview = document.createElement("div");
                preview.className = "d-flex flex-column justify-content-center align-items-center p-3 text-center";

                const icon = document.createElement("div");
                icon.innerHTML = m(ext);
                icon.style.height = i.previewHeight;

                const nameText = document.createElement("small");
                nameText.className = "text-muted text-truncate w-100 d-block mt-2";
                nameText.textContent = filename;

                preview.appendChild(icon);
                preview.appendChild(nameText);
            }

            const removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.className = "btn btn-danger btn-sm position-absolute top-0 end-0 m-1";
            removeBtn.innerHTML = "&times;";
            removeBtn.onclick = e => {
                e.stopPropagation();
                isNew ? l.splice(idx, 1) : i.existingFiles.splice(idx, 1);
                c();
            };

            wrapper.appendChild(preview);
            wrapper.appendChild(removeBtn);
            col.appendChild(wrapper);

            return col;
        }

        function m(ext) {
            const colors = {
                doc: "#2B579A", docx: "#2B579A", xls: "#217346", xlsx: "#217346",
                ppt: "#D24726", pptx: "#D24726", pdf: "#D9381E", txt: "#5E5E5E",
                zip: "#8C8C8C", rar: "#8C8C8C", exe: "#444444", apk: "#25D366",
                default: "#888888"
            };
            const fill = colors[ext] || colors.default;

            return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="${fill}" viewBox="0 0 16 16">
        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.5L9.5 0H4z"/>
        <text x="8" y="12" text-anchor="middle" font-size="6" fill="white" font-family="Arial">${ext.slice(0, 3).toUpperCase()}</text>
      </svg>`;
        }

        n._droperFiles = l;
        c();
    },
    initAll: function (selector = 'input[type="file"].droper', options = {}) {
        document.querySelectorAll(selector).forEach(el => {
            window.droper.init(el, options);
        });
    }

};
