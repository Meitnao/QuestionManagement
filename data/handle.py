import re
import json

with open('data\questions.txt', 'r', encoding='utf-8') as f:
    text = f.read()
    # print(text)

# 匹配题目、选项和答案
pattern = r'(\d+)、(.+?)。\s*(?:([A-D])、(.+?)\s*(?=[A-D]|$))+\s*答案：\s*(\w)'

questions = []
# print(text)
for match in re.finditer(pattern, text):
    # 解析题目和答案
    index = match.group(2)
    print(index)
    question = match.group(3, 4, 5)
    answer = match.group(6)
    # print(index, question, answer)
    # 解析选项
    options = {}
    for i in range(3, len(match.groups()), 2):
        letter = match.group(i)
        option = match.group(i+1)
        options[letter] = option

    # 将题目信息存储到字典中
    question_info = {'题号': index, '题目': question, '答案': options}

    # 将字典添加到题目信息列表中
    questions.append(question_info)

# 输出调试信息
print('匹配到的题目数量：', len(questions))
print('题目信息列表：', questions)

# 将题目信息列表输出为 JSON 文件
with open('data\output.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)