---
title: ThinkPHP学习小记
date: 2019-04-01 10:06:59
categories:
typora-root-url: ..
typora-copy-images-to: ../images
---

# ID不从1开始
`truncate table 你的表名`

# 无法访问
可能保存了带`bom`的`utf`编码

# 部署到iis服务器
将`runtime`设定到支持写入的目录

# 数据不为空显示
```html
<!-- 不等于 -->
<if condition="$result[0]['jiyao_id'] neq null">
	<tr>
        <td style="vertical-align: middle;text-align:center;width: 20%">
            <span><b>机要编号</b></span>
        </td>
        <td class="description">{$result[0]['jiyao_id']}</td>
    </tr>
</if>
```

# 1 0转换
```html
<!-- 字符串用'' -->
<if condition="$student.is_searched eq 1">已查询<else/>未查询</if></td>
```
