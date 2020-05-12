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
        # Disable the reflected XSS filter for demonstration purposes
        self.response.headers.add_header("X-XSS-Protection", "0")

        next_ = self.request.get('next')

        if next_ and 'javascript:' in next_:
            self.response.out.write('Invalid next path')
        else:
            # Route the request to the appropriate template
            if "signup" in self.request.path:
                self.response.out.write(
                    render('signup.html', {'next': next_})
                )
            elif "confirm" in self.request.path:
                self.response.out.write(
                    render(
                        'confirm.html',
                        {'next': next_},
                    )
                )
            else:
                self.response.out.write(render('welcome.html', {}))


application = webapp.WSGIApplication([('.*', MainPage)], debug=False)


if __name__ == '__main__':
    from paste import httpserver

    httpserver.serve(application, host='127.0.0.1', port='8080')
