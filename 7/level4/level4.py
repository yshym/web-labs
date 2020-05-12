import webapp3 as webapp
import os
import jinja2


def render(tpl_path, context={}):
    path, filename = os.path.split(tpl_path)
    return (
        jinja2.Environment(
            loader=jinja2.FileSystemLoader(path or './'), autoescape=True
        )
        .get_template(filename)
        .render(context)
    )


class MainPage(webapp.RequestHandler):
    def get(self):
        # Disable the reflected XSS filter for demonstration purposes
        self.response.headers.add_header("X-XSS-Protection", "0")

        if not self.request.get('timer'):
            # Show main timer page
            self.response.out.write(render('index.html'))
        else:
            # Show the results page
            timer = self.request.get('timer', 0)

            try:
                self.response.out.write(
                    render('timer.html', {'timer': int(timer)})
                )
            except ValueError:
                self.response.out.write('Invalid time value')


application = webapp.WSGIApplication([('.*', MainPage)], debug=False)


if __name__ == '__main__':
    from paste import httpserver

    httpserver.serve(application, host='127.0.0.1', port='8080')
