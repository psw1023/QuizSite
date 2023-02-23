# 출력양식(예시):      {"일본어": "青い", "후리가나": "あおい", "한국어": ["푸르다", "파랗다"], "품사": "형용사", "등록일자": "20230101"},

import pandas as pd
import numpy as np

data = pd.read_csv('C:/Users/psw/OneDrive - UNIST/coding practice file/quiz web proj/util/jpvoca_230221.csv')
file_output = open('C:/Users/psw/OneDrive - UNIST/coding practice file/quiz web proj/jpvoca_data/jpvoca.txt', 'w', encoding='utf-8')

for i in range(0, len(data)):
    file_output.writelines(["{\"일본어\": \"", str(data["한자"][i]), "\", \"후리가나\": \"", str(data["후리가나"][i]), "\", \"한국어\": [\"", str(data["뜻"][i]), "\"], \"품사\": \"", str(data["품사"][i]), "\", \"등록일자\": \"", str(data["등록일자"][i]), "\"},", "\n"])
    
file_output.close()