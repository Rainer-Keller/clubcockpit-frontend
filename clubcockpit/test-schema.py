#!/usr/bin/env python3.5

import jsonschema
import json

schemafile = "doc/eventdata.schema"
#schemafile = "doc/eventinternal.schema"
#schemafile = "doc/eventsummary.schema"

with open(schemafile) as f:
    schema = json.loads(f.read())

obj = json.loads("{\"version\": 1, \"type\":\"S\",\"title\":\"fefefaefe\",\"location\":{\"name\":\"afefafaefe\",\"address\":\"afsdfs\",\"postcode\":\"asdfsd\",\"city\":\"asdfsadf\",\"country\":\"AT\"},\"dates\":[[\"2018-02-24\",\"2018-02-27\"]],\"leader\": [\"leader1\", \"leader2\"], \"special\":{\"halls\":[1,1,1,1]},\"gemaBackingOtherwise\":false,\"contact\":{\"person\":\"name\",\"email\":\"email\",\"phone\":\"phone\"},\"publish\":{\"url\":\"http://foo\",\"calendar\": true}, \"dancelevels\": [\"MS\", \"PL\"]}")
print(obj)

jsonschema.validate(obj, schema)
