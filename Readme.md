# 针对Domino应用提供扩展

将应用打包成sencha touch .zip格式并修改后缀为aux后即可安装在 sencha arichiect 3 内使用。

## domino.data
负责由于domino平台特点所限制，我们很少会使用agent通过编程方式对domino数据进行输出，已节约优先的agent并发进程数量。但Domino自身输出的数据结果固定，我们有很难对其进行改变，使得Domino开发很多直接使用Extjs、Dojo等前端框架。好在这些前端框架提供了完善的API以及扩展机制，我们可以通过对框架扩展实现对domino平台数据格式的转换，使得domino应用可以方便的使用Extjs等前端框架。

目前实现功能为 domino.data.proxy.iNotes及domino.data.reader.iNamesReader、domino.data.ViewReader
### domino.data.proxy.iNotes

proxy负责利用domino平台机制生成的数据进行查询操作。依赖https://github.com/leoyin/Domino-WorkFlow-TMPL/ Forms8.nsf。
已经实现domino 用户查询、Domino 任意视图查询，执行跨域查询。

### domino.data.proxy.ReaderView
未实现：负责通过readerviewentries  查询数据

### domino.data.proxy.OpenView

未实现：负责通过SearchView 实现对视图进行搜索、可以在XHR LEVEL2 或者IE上降低安全标准的情况下进行跨域（一般企业内系统都有降低信任站点内IE安全实现数据跨域的情形）

### domino.data.reader.iNamesReader

负责对domino.data.proxy.iNotes查询返回数据转换处理

### domino.data.reader.ViewReader

负责domino.data.proxy.ReaderView\domino.data.proxy.iNotes返回的 JSON结果或进行转换处理。

### domino.data.reader.ViewOpen
未实现：负责对domino.data.proxy.OpenView返回的HTML数据进行转换处理
