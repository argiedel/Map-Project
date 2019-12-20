from bottle import run, static_file, route

import tickets


@route('/')
def root():
    return static_file('index.html', root='')


@route('/map.js')
def static():
    return static_file('map.js', root='')


@route('/tickets')
def get_tickets():
    return tickets.get_ticket_data(
        'https://data.buffalony.gov/resource/ux3f-ypyc.json'
    )


run(debug=True, port=8080, host='0.0.0.0')
