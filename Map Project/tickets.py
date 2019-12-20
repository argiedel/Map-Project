import json
from urllib import request
import ssl


def get_ticket_data(url_string):
    context = ssl._create_unverified_context()
    response = request.urlopen(url_string, context=context)
    content_string = json.loads(response.read().decode())
    big_list = []
    for ticket in content_string:
        try:
            long = float(ticket['longitude'])
            lat = float(ticket['latitude'])
        except ValueError:
            continue
        except KeyError:
            continue
        location = ticket['viodesc']
        big_list.append([lat, long, location])
    return json.dumps(big_list)
