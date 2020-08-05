HTMLWidgets.widget({

  name: "nirvash",
  type: "output",

  factory: function (el, width, height) {

    // Nehan instance
    const instance = new Nehan.Document()
        .setStyle("hr", {
          "border-top": "1px solid #8c8b8b",
          "border-bottom": "1px solid #fff",
        })
        .setStyle("hr:after", {
          content: '',
          display: "block",
          "margin-top": "2px",
          "border-top": "1px solid #8c8b8b",
          "border-bottom": "1px solid #fff",
        });

    /**
     * HTML structure checker
     * @function isValidHTML
     * @param {String} html
     * @return {Boolean} true or false
     */
    function isValidHTML (html) {
      const doc = document.createElement("div");
      doc.innerHTML = html;
      return ( doc.innerHTML === html );
    }

    return {

      // Keep instance
      NehanInstance: instance,

      /**
       * Renderer
       * @function renderValue
       */
      renderValue: function (x) {

        // console.info(this.NehanInstance); // DBEUG use

        const rows = ( x.split === "" )
          ? [x.context]
          : x.context.split(x.split);
        const item = _.reduce(rows, (memo, row) => {
          return memo + this.compile({ row: row });
        }, "");

        if (isValidHTML(item)) {
          this.NehanInstance.setContent(this.wrapper({ item: item, custom_style: x.custom_style }));
        } else {
          this.NehanInstance.setContent(this.wrapper({ item: `<p>Umm, seems something went wrong...</p>`, custom_style: x.custom_style }));
        }
        this.NehanInstance.setStyle("body", {
          display: "inline-block",
          flow: x.mode,
          width: width,
          height: height,
        });
        if (Boolean(x.serif)) {
          this.NehanInstance.setStyle(".serif", {
              "font-family": "'Noto Serif JP', 'Yu Mincho', YuMincho, 'Hiragino Mincho ProN', 'Hiragino Mincho Pro', sans-serif"
          });
        }

        this.NehanInstance.render({
          onPage: (page, ctx) => {
            el.appendChild(page.element);
            el.appendChild(document.createElement("hr"));
          }
        });

      },

      /**
       * Resize the widget when window resized.
       * @function resize
       */
      resize: function (width, height) {
        this.NehanInstance.setStyle("body", {
          width: width,
          height: height,
        });
      },

      /**
       * Wrapper template.
       * @fucntion wrapper
       * @return {String} HTML string
       */
      wrapper: _.template(`<div style="padding: 1.5em; display: flex; justify-content: center; align-items: center; <%= custom_style %>" role="presentation"><%= item %></div>`),
      /**
       * Wrapper template.
       * @function compile
       * @return {String} HTML string
       */
      compile: _.template(`<div class="serif"><%= row %></div>`),

    };
  }

});
