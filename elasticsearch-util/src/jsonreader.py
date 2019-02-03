import os
import json
path = "data/"
for index, filename in enumerate(os.listdir(path)):
    system_json = open(path+filename)
    json_object = json.load(system_json)
    with open("esdata/esdata{i}.json".format(sep = os.sep, i=index), "a+") as file:
        for obj in json_object:
            file.write("{\"index\":{}}\n")
            file.write(json.dumps(obj)+'\n')
