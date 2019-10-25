import requests
#from lxml import etree
import time
import re
import math


def auto_click(url, num):
    while num:
        req_headers = {
            'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'
        }
        # proxies = {"http": "http://117.90.252.26:9000"}
        # 获取最后一页的链接
        resp = requests.get(url, headers=req_headers)
        if resp.status_code == requests.codes.ok:
            #获取当前页博客数量
            rr = re.compile(r'pageSize = \d\d ;')
            pageSize = str(rr.findall(resp.text)[0])
            pageSize = pageSize.replace('pageSize = ', '')
            pageSize = pageSize.replace(' ;', '')
            #获取总共博客数量
            rr = re.compile(r'var listTotal = \d\d ;')
            listTotal = str(rr.findall(resp.text)[0])
            listTotal = listTotal.replace('var listTotal = ', '')
            listTotal = listTotal.replace(' ;', '')
            # 获取最后一页的页码
            # /topleeyap/article/list/4
            last_page_num = math.ceil(int(listTotal) / int(pageSize))

            # 构建所有页面的链接
            base_page_link = 'https://blog.csdn.net/kxbk100/article/list/'
            for i in range(1, last_page_num + 1):
                real_page_link = base_page_link + str(i)

                # 提取本页所有文章链接
                resp = requests.get(real_page_link, headers=req_headers)
                # 提取网址
                rr = re.compile(
                    r'<a href="https://blog.csdn.net/kxbk100/article/details/.*" target="_blank">'
                )
                links = rr.findall(resp.text)
                for ii in range(len(links)):
                    links[ii] = links[ii].replace(
                        '<a href="https://blog.csdn.net/kxbk100/article/details/',
                        '')
                    links[ii] = links[ii].replace('" target="_blank">', '')
                links = list(set(links))
                temp = 1
                # 访问每一篇文章，模拟点击
                # 访问每一篇文章，模拟点击
                for article_link in links:
                    real_article_link = 'https://blog.csdn.net/kxbk100/article/details/' + article_link
                    requests.get(real_article_link, headers=req_headers)
                    print('正在第%d次点击' % temp)
                    temp = temp + 1
                    #print('正在第 [-{0}] 次点击 {1}'.format(num,real_article_link))
        num -= 1
        time.sleep(30)


if __name__ == '__main__':
    num = 200  # 运行次数,酌情修改
    url = 'https://blog.csdn.net/kxbk100'
    auto_click(url, num)
