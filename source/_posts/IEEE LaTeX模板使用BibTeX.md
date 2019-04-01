---
title: IEEE LaTeX模板使用BibTeX
date: 2019-03-12 18:27:12
categories:
typora-root-url: ..
typora-copy-images-to: ../images
---

最近在写IEEE的论文，就为了参考文献不愿意下载那么大的LaxTex，发现了一个在线的LaTeX editor https://www.sharelatex.com/ ， 发现还挺好用的。
在Google Scholar获得的文献引用格式一般是BibTex的，而IEEE Transactions的模板默认用的是BibItem。目前没有什么自动化的BibTeX转BibItem的工具或网站。
# 使用方法
1. 在Google Scholar搜索到的文献结果，点击下面的“Cite”，然后点击“BibTeX”即可得到类似如下的文献信息
```
@article{b1, // b1为正文引用时的名字
  title={Reading behavior in the digital environment: Changes in reading behavior over the past ten years},
  author={Liu, Ziming},
  journal={Journal of documentation},
  volume={61},
  number={6},
  pages={700--712},
  year={2005},
  publisher={Emerald Group Publishing Limited}
}
```
2. 将以上信息添加到侧边栏中的references.bib文件中，文件名随意，与.tex文件在同一目录
3. 在IEEE Transactions模板中，默认的引用文献是这样写的
```
\begin{thebibliography}{00}
\bibitem{b1} G. Eason, B. Noble, and I. N. Sneddon, ``On certain integrals of Lipschitz-Hankel type involving products of Bessel functions,'' Phil. Trans. Roy. Soc. London, vol. A247, pp. 529--551, April 1955.
\bibitem{b2} J. Clerk Maxwell, A Treatise on Electricity and Magnetism, 3rd ed., vol. 2. Oxford: Clarendon, 1892, pp.68--73.
\bibitem{b3} I. S. Jacobs and C. P. Bean, ``Fine particles, thin films and exchange anisotropy,'' in Magnetism, vol. III, G. T. Rado and H. Suhl, Eds. New York: Academic, 1963, pp. 271--350.
\bibitem{b4} K. Elissa, ``Title of paper if known,'' unpublished.
\bibitem{b5} R. Nicole, ``Title of paper with only first word capitalized,'' J. Name Stand. Abbrev., in press.
\bibitem{b6} Y. Yorozu, M. Hirano, K. Oka, and Y. Tagawa, ``Electron spectroscopy studies on magneto-optical media and plastic substrate interface,'' IEEE Transl. J. Magn. Japan, vol. 2, pp. 740--741, August 1987 [Digests 9th Annual Conf. Magnetics Japan, p. 301, 1982].
\bibitem{b7} M. Young, The Technical Writer's Handbook. Mill Valley, CA: University Science, 1989.
\end{thebibliography}
```
4. 将上述部分换成如下代码
```
\bibliographystyle{IEEEtran}
\bibliography{references}{}
```
5. 点击重新编译即可看到效果

# 注意
正文中必须要使用`\cite{b1}`引用后，正文中的参考文献才会显示引用的条目，否则编译无数次也没有效果😢
