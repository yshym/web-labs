import webapp3 as webapp


page_header = """
<!doctype html>
<html>
  <head>
    <!-- Internal game scripts/styles, mostly boring stuff -->
    <script src="https://xss-game.appspot.com/static/game-frame.js"></script>
    <link rel="stylesheet" href="https://xss-game.appspot.com/static/game-frame-styles.css" />
  </head>

  <body id="level1">
    <img src="https://xss-game.appspot.com/static/logos/level1.png">
    <div>
"""

page_footer = """
    </div>
  </body>
</html>
"""

main_page_markup = """
<form action="" method="GET">
  <input id="query" name="query" value="Enter query here..."
    onfocus="this.value=''">
  <input id="button" type="submit" value="Search">
</form>
"""


class MainPage(webapp.RequestHandler):
    def render_string(self, s):
        self.response.out.write(s)

    def get(self):
        # Disable the reflected XSS filter for demonstration purposes
        self.response.headers.add_header("X-XSS-Protection", "0")

        if not self.request.get('query'):
            # Show main search page
            self.render_string(page_header + main_page_markup + page_footer)
        else:
            # query = self.request.get('query', '[empty]')

            # Our search engine broke, we found no results :-(
            # message = "Sorry, no results were found for <b>" + query + "</b>."
            message = "Sorry, no results were found."
            message += " <a href='?'>Try again</a>."

            # Display the results page
            self.render_string(page_header + message + page_footer)


application = webapp.WSGIApplication([('.*', MainPage)], debug=False)


if __name__ == '__main__':
    from paste import httpserver

    httpserver.serve(application, host='127.0.0.1', port='8080')
