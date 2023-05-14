import re
import json

with open('data\questions.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'\s[A-D]\s'
q_pattern = r'((\d+)、(.+?)。)'
op_pattern = r'([A-D]、.+)'

res = re.findall(pattern, text)
q_res = re.findall(q_pattern, text)
op_res = re.findall(op_pattern, text)

answers = []
questions = []
options = []

# 由于个别选项很特殊 只能先写入一个临时文件然后手动处理下
# ls = (' '.join(op_res)).split(' ')
# print(ls)
# for i in ls:
#     if i:
#         options.append(i)
# print(len(options))

# with open('data/options.txt', 'w', encoding='utf-8') as opf:
#     opf.write('\n'.join(options))


with open('data/new_options.txt', 'r', encoding='utf-8') as opf:
    all_options = opf.read().split('\n')

for i in range(0, len(all_options), 4):
    option = []
    for j in range(4):
        option.append(all_options[i + j])
    options.append(option)


for q in q_res:
    tmp = q[0]
    s = re.sub(r'\s[A-D]\s', '  ', tmp)
    questions.append(s)


for i in range(0, len(res)):
    # 电工五级有一题是两个空 也就是两个答案 特判一下
    if i == 212: 
        continue
    answers.append(res[i][1])

info = []

for i in range(0, len(answers)):
    question = str(i % 100 + 1) + questions[i][len(str(i + 1)):]
    option = options[i]
    answer = answers[i]
    part = {
        "question": question,
        "options": option,
        "answer": answer,
    }
    info.append(part)
    # if i > 5: break
    if (i + 1) % 100 == 0:
        json_str = json.dumps(info, ensure_ascii=False)
        filename = 'OptiQuiz/conf/D5-test' + str(i + 1)[0] + '.json'
        with open(filename, 'w', encoding='utf-8') as jf:
            json.dump(info, jf, ensure_ascii=False, indent=4)
        jf.close()
        info = []
