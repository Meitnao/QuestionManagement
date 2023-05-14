import os
import json

floder_path = 'OptiQuiz/static/images/tmImgs'

info = {}

for filename in os.listdir(floder_path):
    ls = filename.split('-')
    test = ls[0]
    page = ls[1]
    idx = ls[2].split('.')[0]
    print(test, page, idx)
    if test not in info:
        info[test] = [[] for i in range(6)]
    info[test][int(page)].append(idx)

json_str = json.dumps(info, ensure_ascii=False)
filename = 'data/imgs.json'
with open(filename, 'w', encoding='utf-8') as jf:
    json.dump(info, jf, ensure_ascii=False, indent=4)