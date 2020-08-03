HTMLWidgets.widget({

  name: "nirvash",
  type: "output",

  factory: function (el, width, height) {

    const instance = new Nehan.Document();

    // Templates
    const wrapper = _.template(`
      <div style="padding: 1.5em; display: flex; justify-content: center; align-items: center; <%= custom_style %>" role="presentation"><%= item %></div>
    `);
    const compile = _.template(`
      <div class="serif"><%= row %></div>
    `);

    // Helper functions
    function isValidHTML (html) {
      const doc = document.createElement("div");
      doc.innerHTML = html;
      return ( doc.innerHTML === html );
    }

    return {

      // Instances
      NehanInstance: instance,

      // Main Renderer
      renderValue: function (x) {

        const rows = ( x.split === "" )
          ? [x.context]
          : x.context.split(x.split);
        const item = _.reduce(rows, (memo, row) => {
          return memo + compile({ row: row });
        }, "");

        if (isValidHTML(item)) {
          instance.setContent(wrapper({ item: item, custom_style: x.custom_style }));
        } else {
          instance.setContent(wrapper({ item: `<p>Umm, something goes wrong...</p>`, custom_style: x.custom_style }));
        }
        instance.setStyle("body", {
          display: "inline-block",
          flow: x.mode,
          width: width,
          height: height
        });
        if (Boolean(x.serif)) {
          instance.setStyle(".serif", {
              "font-family": "'Noto Serif JP', 'Yu Mincho', YuMincho, 'Hiragino Mincho ProN', 'Hiragino Mincho Pro', sans-serif"
          });
        }

        instance.render({
          onPage: (page, ctx) => {
            el.appendChild(page.element);
            el.appendChild(document.createElement("hr"));
          }
        });

      },

      // Resizer
      resize: function (width, height) {
        instance.setStyle("body", {
          width: width,
          height: height,
        });
      },

    };
  }

});
