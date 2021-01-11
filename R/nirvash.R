#' Nirvash HTML Widget
#'
#' `tb-rl` styled component
#' powered by nehan.js (v5.5.10).
#' The widgets do not support resizing.
#'
#' @param context Text to display on widget.
#' @param split String with that nirvash splits the context into paragraphs.
#' @param serir Logical. If true, sets an additional style onto `.serif` class elements.
#' @param writing_mode Choose one of "tbrl" or "lrtb".
#' @param custom_style User's own defined style that will be attached onto component's wrapper.
#' @param width Width of components.
#' @param height Height of components.
#'
#' @return Object returned from \code{htmlwidgets::createWidget()}.
#'
#' @import htmlwidgets
#' @importFrom dplyr case_when
#' @export
nirvash <- function(context,
                    split = "\n",
                    serif = TRUE,
                    writing_mode = c("tbrl", "lrtb"),
                    custom_style = "",
                    width = "100%",
                    height = "90%") {
  if (!is.character(context)) {
    message("Context must be a character vector.")
    return(invisible(context))
  } else {

    # detect writing-mode (flow)
    mode <- dplyr::case_when(
      writing_mode[1] == "lrtb" ~ "lr-tb",
      TRUE ~ "tb-rl"
    )

    # forward options using x
    x <- list(
      mode = mode,
      context = paste(context, collapse = split),
      split = split,
      selif = serif,
      custom_style = custom_style
    )

    # create widget
    htmlwidgets::createWidget(
      name = "nirvash",
      x,
      width = width,
      height = height,
      package = "nirvash"
    )
  }
}

#' Shiny bindings for nirvash
#'
#' Output and render functions for using nirvash within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId Output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a nirvash
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name nirvash-shiny
#'
#' @export
nirvashOutput <- function(outputId, width = "100%", height = "400px") {
  htmlwidgets::shinyWidgetOutput(outputId, "nirvash", width, height, package = "nirvash")
}

#' @rdname nirvash-shiny
#' @export
renderNirvash <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) {
    expr <- substitute(expr)
  } # force quoted
  htmlwidgets::shinyRenderWidget(expr, nirvashOutput, env, quoted = TRUE)
}
