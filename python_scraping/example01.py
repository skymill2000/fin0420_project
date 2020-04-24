# -*- coding: utf-8 -*-
from selenium import webdriver
driver = webdriver.Chrome('./chromedriver')
driver.implicitly_wait(3)
driver.get('https://biz.chosun.com/site/data/html_dir/2020/02/07/2020020702037.html')
title = driver.find_element_by_id('news_title_text_id')
print(title.text)
body = driver.find_element_by_xpath('//*[@id="news_body_id"]/div[2]')
#//*[@id="news_body_id"]/div[2]
print(body.text)
