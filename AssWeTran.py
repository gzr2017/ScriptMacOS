#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import chardet
import codecs
import re
import ass

# 将 ass 文件转换为 srt 文件

SourceFileName = input('请输入文件地址：')

# 检查文件编码
SourceFile = open(SourceFileName, 'rb')
FileEnco = chardet.detect(SourceFile.read()).get('encoding')
SourceFile.close()
# 按文件编码重新打开文件
SourceFile = codecs.open(SourceFileName, 'rb', FileEnco)
TargetFile = codecs.open(SourceFileName + '.srt', 'w', 'utf-8')

AssFile = ass.parse(SourceFile)
TimeDic = dict()

for event in AssFile.events:
    if not re.match('//', event.text) and not event.text == '':
        StartTime = str(event.start)
        EndTime = str(event.end)
        StartTime = '0' + StartTime
        StartTime = StartTime[:-3]
        StartTime = re.sub(r'\.', ',', StartTime)
        EndTime = '0' + EndTime
        EndTime = EndTime[:-3]
        EndTime = re.sub(r'\.', ',', EndTime)
        Time = StartTime + ' --> ' + EndTime
        SubTitle = re.sub(r'{[^}]*}', '', event.text)
        SubTitle = re.sub(r'\\N', '\n', SubTitle)
        if not Time in TimeDic.keys():
            TimeDic[Time] = SubTitle
        else:
            TimeDic[Time] = TimeDic[Time] + '\n' + SubTitle

i = 1

for key, value in TimeDic.items():
    # if value != '':
    TargetFile.write(str(i))
    TargetFile.write('\n')
    TargetFile.write(key)
    TargetFile.write('\n')
    TargetFile.write(value)
    TargetFile.write('\n')
    TargetFile.write('\n')
    i = i + 1
