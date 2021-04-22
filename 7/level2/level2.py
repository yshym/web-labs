import webapp3 as webapp
import os
import jinja2


def render(tpl_path, context={}):
    path, filename = os.path.split(tpl_path)
    return (
        jinja2.Environment(loader=jinja2.FileSystemLoader(path or './'))
        .get_template(filename)
        .render(context)
    )


class MainPage(webapp.RequestHandler):
    def get(self):
        self.response.out.write(render('index.html'))


application = webapp.WSGIApplication([('.*', MainPage)], debug=False)


if __name__ == '__main__':
    from paste import httpserver

    httpserver.serve(application, host='127.0.0.1', port='8080')
